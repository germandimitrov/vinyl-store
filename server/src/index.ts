import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {NextFunction, Request, Response} from "express";
import routes from "./routes";
import * as cors from "cors";
import * as passport from 'passport';
import { User } from './entity/User';
import { Role, Name } from './entity/Role';
import encrypt from './config/encryption';

createConnection().then(async connection => {
  // create express app
  const app = express();
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());

  const port = 5001;

  const corsOptions = {
    origin: `http://localhost:3001`,
    optionsSuccessStatus: 200
  }

  app.use(cors(corsOptions));

  routes(app);

  // start express server
  require('./config/passport')();
  app.listen(port);

  console.log(`Express server has started on port ${port}.`);

  const user = getRepository(User).findOne({ email: 'admin@admin.bg' }).then((user) => {
    // create admin
    if (!user) {
      const user = new User();
      user.username = 'Admin';
      user.email = 'admin@admin.bg';
      user.address = 'mladost';
      user.phone = 112;
      // temp
      user.picture = 'https://secure.gravatar.com/avatar/e4dcf6591693d348343f84c9ab65dfcf?s=100&r=g&d=mm'
      user.salt = encrypt.generateSalt();
      user.password = encrypt.generateHashedPassword(user.salt, 'admin');

      user.save().then((user) => {
        const role = new Role();
        role.name = Name.Admin;
        role.user = user;
        role.save().then(r => console.log('admin created!'))
      });
    }
  });

  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = 'this is from general error!';
    res.status(status).json({
      message: error.message,
      // temp
      from: message
    });
    next();
  })

}).catch(error => console.log(error));
