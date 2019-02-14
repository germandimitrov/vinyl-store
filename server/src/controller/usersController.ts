import {getRepository, getConnection} from 'typeorm';
import {Next, Request, Response} from "express";
import { User } from "../entity/User";
import {sign, TokenExpiredError} from 'jsonwebtoken';
import { config }  from '../config';

class usersController {

  async register(req, res) {

    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.email = req.body.email;
    user.password = req.body.password;

    await getRepository(User).save(user);
  }

  async signIn(req: Request, res: Response ) {
    const user: User = await getRepository(User).findOne({
      email: req.body.email
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    let token = sign({
      user: user
    }, config.secretKey, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Success',
      token: token,
      userId: user.id
    });
  }

}

export default new usersController();