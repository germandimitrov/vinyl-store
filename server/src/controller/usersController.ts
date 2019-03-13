import {getRepository, getConnection, LessThan} from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { User } from "../entity/User";
import { Role, roleName } from "../entity/Role";
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
    if (user.picture === '' ||
        !user.picture ||
        !user.picture.startsWith('https') ||
        !user.picture.startsWith('http')
    ) {
      // set default avatar
      user.picture = 'https://secure.gravatar.com/avatar/e4dcf6591693d348343f84c9ab65dfcf?s=100&r=g&d=mm';
    }

    user.salt = salt;
    user.password = encrypt.generateHashedPassword(salt, req.body.password);

    try {
      const registeredUser = await getRepository(User).save(user);
      let role = new Role();
      role.name = roleName.User;
      role.user = registeredUser;
      await role.save();

      let token = this.generateSessionJWT(registeredUser);
      if (!token) throw new Error();
      return res.status(200).json({
        message: 'Success',
        token: token,
        user: user
      });

    } catch (error) {
      if (error.errno === 1062) {
        error.message = 'This email already used!';
      }
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
        errors: [{ msg: 'Invalid Username or Password.' }]
      });
    }

    if (!this.validatePassword(user, req.body.password)) {
      return res.status(404).json({
        errors: [{ msg: 'Invalid Username or Password.' }]
      });
    }

    if (!user.active) {
      return res.status(403).json({
        errors: [{ msg: 'Your account has been suspended due to low rating.' }]
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

  async updateUser(req: Request, res: Response, next: NextFunction) {
    if (req.user.id !== Number(req.params.id)) {
      return res.status(403).json({
        errors: [{ msg: 'Unauthorized to edit this profile!' }]
      });
    }

    try {
      let user = await getRepository(User).findOne({ id: Number(req.params.id) });
      user.username = req.body.username;
      user.email = req.body.email;
      user.address = req.body.address;
      user.phone = req.body.phone;
      user.picture = req.body.picture;
      user.save();
      return res.status(202).json(user);
    } catch (error) {
      next(error);
    }
  }

  async rate(req: Request, res: Response, next: NextFunction) {
    const rater = req.body.rater;
    const rated = req.body.rated;

    try {
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
      let isAdmin = req.user.roles.find(e => e.name === 'Admin');
      if ( ! isAdmin) {
        return res.status(403).json({
          errors: [{ msg: 'You dont have permission to rate!' }]
        });
      }

      const user = await getRepository(User).findOne({ id: req.params.id });
      user.active = req.body.activeStatus;
      if (req.body.activeStatus) {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Vote)
          .where("rated = :rated", { rated: req.params.id })
          .execute();
      }

      await user.save();

      return res.status(200).json({ message: 'OK', user, activeStatus: user.active });

    } catch (error) {
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