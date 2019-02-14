import React, { Component } from 'react';
import Login from '../components/users/Login';
import Register from '../components/users/Register';
import { Route, Link } from 'react-router-dom';
import Home from '../components/fragments/Home';

const Routes = () => (
  <React.Fragment>
    <Route exact path='/' component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
  </React.Fragment>
);

export default Routes;