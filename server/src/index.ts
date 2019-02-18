import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {NextFunction, Request, Response} from "express";
import routes from "./routes";
import * as cors from "cors";
import * as passport from 'passport';

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

  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = 'this is from general error!';
    res.status(status).json({ message: message });
    next();
  })

}).catch(error => console.log(error));
