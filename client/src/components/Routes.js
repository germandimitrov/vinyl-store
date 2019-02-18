import React, { Component } from 'react';
import Login from '../components/users/Login';
import Register from '../components/users/Register';
import { Route, Link, Redirect } from 'react-router-dom';
import Home from '../components/fragments/Home';
import Records from '../components/Records';
import authService from '../services/authService';


const isAuth = authService.isAuth();

const Routes = () => (

  <React.Fragment>
    <Route exact path='/' component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/records' render={() => (
      isAuth ? (
        <Records />
      ) : (
        <Redirect to='/' />
      )
    )}/>
  </React.Fragment>
);

export default Routes;