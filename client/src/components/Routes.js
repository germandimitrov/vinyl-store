import React from 'react';
import Login from './users/Login';
import Register from './users/Register';
import { Route,  Redirect } from 'react-router-dom';
import Home from '../components/fragments/Home';
import Records from './records/Records';
import authService from '../services/authService';
import Logout from '../components/users/Logout';
import AddRecord from './records/AddRecord';
import EditRecord from './records/EditRecord';
// temp
import Artist from './forms/ArtistForm';

const Routes = () => {

  let isAuth = authService.isAuth();

  return <React.Fragment>

    <Route exact path='/' component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/logout' component={Logout} />

    <Route exact path='/records' render={() => (
      isAuth ? (
        <Records />
      ) : (
        <Redirect to='/' />
      )
    )} />

    <Route exact path='/create' render={(props) => (
      isAuth ? (
        <AddRecord {...props} />
      ) : (
        <Redirect to='/' />
      )
    )} />

    <Route exact path='/artist/create' render={(props) => (
      isAuth ? (
        <Artist {...props} />
      ) : (
        <Redirect to='/' />
      )
    )} />

    <Route exact path='/records/:id' render={(props) => (
      isAuth ? (
        <EditRecord {...props} />
      ) : (
        <Redirect to='/' />
      )
    )} />

  </React.Fragment>
};

export default Routes;