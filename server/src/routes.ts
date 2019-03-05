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

  app.get('/user/:id',
    usersController.getProfile
  );

  app.post('/login',
    validationCheck.login,
    validate,
    usersController.login
  );

  app.post('/user/rate',
    jwtAuth,
    validationCheck.rate,
    validate,
    usersController.rate
  );

  app.get('/user/vote/:raterId/:ratedId',
    jwtAuth,
    usersController.getVote
  );

  app.get('/users',
    jwtAuth,
    usersController.getActiveUsers
  );

  app.get('/user/:id/changestatus',
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