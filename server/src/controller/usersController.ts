import {getRepository, getConnection} from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { User } from "../entity/User";
import {sign, TokenExpiredError} from 'jsonwebtoken';
import { settings } from '../config/settings';
import encrypt from '../config/encryption';
import { validationResult } from 'express-validator/check';

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
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
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
      .where({ email: req.body.email })
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

  generateSessionJWT(user: User) {
    return sign({ user: user }, settings.secretKey, {
      expiresIn: '1m'
    });
  }

  validatePassword(user: User, password: string) {
    return encrypt.generateHashedPassword(user.salt, password) === user.password;
  }

}

export default new usersController();