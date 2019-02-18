import jwtAuth from "./middleware/jwtAuth";
import usersController from "./controller/usersController";
import { validateRegisterInput, validateLoginInput } from './middleware/validators';

export default (app) => {

  app.get('/', usersController.getUsers);
  app.post('/register', validateRegisterInput, usersController.register);
  app.post('/signin', validateLoginInput, usersController.signIn);

};