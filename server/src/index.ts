import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import routes from "./routes";
import * as cors from "cors";

createConnection().then(async connection => {
  // create express app
  const app = express();
  app.use(bodyParser.json());

  const port = 5001;

  const corsOptions = {
    origin: `http://localhost:3001`,
    optionsSuccessStatus: 200
  }

  app.use(cors(corsOptions));

  routes(app);

  // start express server
  app.listen(port);

  console.log(`Express server has started on port ${port}.`);

  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = 'this is from general error!';
    res.status(status).json({ message: message });
    next();
  })

}).catch(error => console.log(error));