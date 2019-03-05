import React from 'react';
import Login from './users/Login';
import Register from './users/Register';
import { Route,  Redirect, Switch } from 'react-router-dom';
import Home from '../components/fragments/Home';
import RecordList from './records/RecordList';
import authService from '../services/authService';
import Logout from '../components/users/Logout';
import AddRecord from './records/AddRecord';
import EditRecord from './records/EditRecord';
import Profile from '../components/users/Profile';
import AdminList from '../components/admin/AdminList';
import Details from '../components/records/Details';

const Routes = () => {

  let isAuth = authService.isAuth();
  let isAdmin = authService.isAdmin();
  let path = '/login';

  return <React.Fragment>
    <Switch>
      {/* Public Routes */}
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/logout' component={Logout} />

      {/* Private Routes */}
      <Route exact path='/records' render={(props) =>
        isAuth ? <RecordList {...props} loadRecords={true} /> : <Redirect to={path} />
      }/>

      <Route path='/user/:id?' render={(props) =>
        isAuth ? <Profile {...props} /> : <Redirect to={path} />
      }/>

      <Route exact path='/create' render={(props) =>
        isAuth ? <AddRecord {...props} /> : <Redirect to={path} />
      }/>


      <Route exact path='/records/:id' render={(props) =>
        isAuth ? <EditRecord {...props} /> : <Redirect to={path} />
      }/>

      <Route exact path='/records/:id/details' render={(props) =>
        isAuth ? <Details {...props} /> : <Redirect to={path} />
      }/>

      {/* Admin */}
      <Route exact path='/users' render={() =>
        isAdmin ? <AdminList /> : <Redirect to='/' />
      }/>

      <Route component={() => (<div> Page not found </div>)} />
    </Switch>
  </React.Fragment>
};

export default Routes;