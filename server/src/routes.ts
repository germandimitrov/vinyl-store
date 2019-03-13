import jwtAuth from "./middleware/jwtAuth";
import usersController from "./controller/usersController";
import recordsController from "./controller/recordsController";
import artistsController from "./controller/artistsController";
import validationCheck from './middleware/validationCheck';
import validate from './middleware/validate';

export default (app: any) => {

  // user
  app.get('/',
    jwtAuth,
    usersController.getUsers
  );

  app.post('/register',
    validationCheck.register,
    validate,
    usersController.register
  );

  app.get('/users/:id',
    jwtAuth,
    usersController.getProfile
  );

  app.post('/login',
    validationCheck.login,
    validate,
    usersController.login
  );

  app.post('/users/rate',
    jwtAuth,
    validationCheck.rate,
    validate,
    usersController.rate
  );

  app.put('/users/:id',
    jwtAuth,
    validationCheck.updateUser,
    validate,
    usersController.updateUser
  );

  app.get('/users/vote/:raterId/:ratedId',
    jwtAuth,
    usersController.getVote
  );

  app.get('/users',
    jwtAuth,
    usersController.getActiveUsers
  );

  app.put('/users/:id/changestatus',
    jwtAuth,
    usersController.changeUserStatus
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

  app.delete('/records/:id',
    jwtAuth,
    recordsController.deleteRecord
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