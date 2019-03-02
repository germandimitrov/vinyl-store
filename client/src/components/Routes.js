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
import AdminList from '../components/users/AdminList';
// temp
import Artist from './forms/ArtistForm';
import Heading from './fragments/Heading';
import Footer from './fragments/Footer';

const Routes = () => {

  let isAuth = authService.isAuth();
  let isAdmin = authService.isAdmin();

  return <React.Fragment>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/logout' component={Logout} />

      <Route exact path='/records' render={() => (
        isAuth ? (
          <>
            <Heading heading={'Records'}/>
            <RecordList loadRecords={true} />
            <Footer />
          </>
        ) : (
          <Redirect to='/' />
        )
      )} />

      <Route exact path='/users' render={() => (
        isAdmin ? (
          <AdminList />
        ) : (
          <Redirect to='/' />
        )
      )} />

      <Route  path='/user/:id?' render={(props) => (
        isAuth ? (
          <Profile {...props} />
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

      <Route component=
          {() => (<div> Page not found </div>)} />
    </Switch>
  </React.Fragment>
};

export default Routes;