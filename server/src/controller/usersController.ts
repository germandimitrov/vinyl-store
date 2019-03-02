import {getRepository, getConnection, LessThan} from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { User } from "../entity/User";
import {sign, TokenExpiredError} from 'jsonwebtoken';
import { settings } from '../config/settings';
import encrypt from '../config/encryption';
import { Vote } from '../entity/Vote';

class usersController {

  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.generateSessionJWT = this.generateSessionJWT.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  async getUsers(req: Request, res: Response) {
    return res.json(
      await getRepository(User).find()
    );
  }

  async register(req: Request, res: Response, next: NextFunction) {
    let user = new User();
    let salt = encrypt.generateSalt();
    user = req.body;
    user.rating = 3;
    user.active = true;
    if (user.picture === '' || !user.picture) {
      // set default avatar
      user.picture = 'https://secure.gravatar.com/avatar/e4dcf6591693d348343f84c9ab65dfcf?s=100&r=g&d=mm';
    }

    user.salt = salt;
    user.password = encrypt.generateHashedPassword(salt, req.body.password);

    try {
      const registeredUser = await getRepository(User).save(user);

      let token = this.generateSessionJWT(registeredUser);
      if (!token) throw new Error();
      return res.status(200).json({
        message: 'Success',
        token: token,
        user: user
      });

    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const user: User = await getRepository(User)
      .createQueryBuilder('users')
      .addSelect([
        'users.password', 'users.salt'
      ])
      .leftJoinAndSelect('users.roles', 'roles')
      .where('users.email = :email', { email: req.body.email })
      .getOne();

    if (!user) {
      return res.status(404).json({
        errors: [{ msg: 'User Not Found.' }]
      });
    }

    if (!this.validatePassword(user, req.body.password)) {
      return res.status(404).json({
        errors: [{ msg: 'Invalid Password.' }]
      });
    }

    try {
      let token = this.generateSessionJWT(user);
      if (!token) throw new Error();

      return res.status(200).json({
        message: 'Success',
        token: token,
        user: {
          ...user,
          password: undefined,
          salt: undefined
        }
      });

    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      let user = await getRepository(User).findOne({
        where: { id: req.params.id },
        relations: ['records']
      });
      return res.status(200).json(user)
    } catch (error) {
      next(error);
    }
  }

  async rate(req: Request, res: Response, next: NextFunction) {
    const rater = req.body.rater;
    const rated = req.body.rated;

    try {
      // let loggedUserHasRated = await Vote.findOne({
      //   where: {rater: rater, rated: rated}
      // });

      // if (loggedUserHasRated) {
      //   return res.status(403).json({
      //     errors: [{ msg: 'You cannot rate the same user twice!' }]
      //   });
      // }

      const vote = new Vote();
      vote.rater = rater;
      vote.rated = rated;
      await vote.save();

      let user = await getRepository(User).findOne({ id: rated });
      user.rating = req.body.rating;

      await user.save();

      return res.status(201).json(user);

    } catch (error) {
      next(error);
    }
  }

  async getVote(req: Request, res: Response, next: NextFunction) {

    const rater = req.params.raterId;
    const rated = req.params.ratedId;

    try {
      let loggedUserHasRated = await Vote.findOne({
        where: { rater: rater, rated: rated }
      });

      if (loggedUserHasRated) {
        return res.status(403).json({
          errors: [{ msg: 'You cannot rate the same user twice!' }]
        });
      }
      return res.status(200).json({message: 'OK'});

    }
    catch (error) {
      next(error);
    }
  }

  async getActiveUsers(req: Request, res: Response, next: NextFunction) {
    try {
      let users = await getRepository(User).find();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async changeUserStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await getRepository(User).findOne({ id: req.params.id });
      if (user.active) {
        user.active = false;
      } else {
        user.active = true;
      }

      await user.save();
      return res.status(200).json({ message: 'OK' });

    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  generateSessionJWT(user: User) {
    return sign({ user: user }, settings.secretKey, {
      expiresIn: '1h'
    });
  }

  validatePassword(user: User, password: string) {
    return encrypt.generateHashedPassword(user.salt, password) === user.password;
  }

}

export default new usersController();