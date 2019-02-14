import jwtAuth from "./middleware/jwtAuth";
import  usersController  from "./controller/usersController";

export default (app) => {

  app.get('/', jwtAuth, (req, res) => {
    console.log(req.user);

    // throw new Error('ha');
    return res.json({ test: 'test'});
  });

  app.post('/register', usersController.register);

  app.post('/signin', usersController.signIn);

};