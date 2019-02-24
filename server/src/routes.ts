import jwtAuth from "./middleware/jwtAuth";
import usersController from "./controller/usersController";
import recordsController from "./controller/recordsController";
import artistsController from "./controller/artistsController";
import validationCheck from './middleware/validationCheck';
import validate from './middleware/validate';

export default (app: any) => {

  // user
  app.get('/', usersController.getUsers);

  app.post('/register',
    validationCheck.register,
    validate,
    usersController.register
  );

  app.post('/login',
    validationCheck.login,
    validate,
    usersController.login
  );

  // records
  app.get('/records',
    jwtAuth,
    recordsController.getRecords
  );

  app.get('/records/:id',
    jwtAuth,
    recordsController.getSingleRecord
  );

  app.post('/records/',
    jwtAuth,
    validationCheck.record,
    validate,
    recordsController.create
  );

  app.put('/records/:id',
    jwtAuth,
    validationCheck.record,
    validate,
    recordsController.updateRecord
  );

  // artists
  app.get('/artists',
    jwtAuth,
    artistsController.get
  );

  app.post('/artists',
    jwtAuth,
    validationCheck.artist,
    validate,
    artistsController.create
  );
};