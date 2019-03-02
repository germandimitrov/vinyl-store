import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Routes from '../Routes';
import authService from '../../services/authService';

class Navigation extends Component {
  render() {
    const isAuth = authService.isAuth();
    const isAdmin = authService.isAdmin();
    const username = authService.getUsername();

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg bg-secondary push-down text-uppercase" id="mainNav">
            <div className="container">
              <Link className="navbar-brand js-scroll-trigger" to="/">Vinyl Store</Link>
              <button className="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i className="fas fa-bars"></i>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  { ! isAuth ? (
                      <>
                        <li className="nav-item mx-0 mx-lg-1">
                          <NavLink className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/login"> Login </NavLink>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                          <NavLink className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/register"> Register </NavLink>
                        </li>
                      </>
                    )
                    :
                      <>
                      { isAdmin ? (
                        <li className="nav-item mx-0 mx-lg-1">
                          <NavLink className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/users">Users</NavLink>
                        </li>
                        ) : '' }
                        <li className="nav-item mx-0 mx-lg-1">
                          <NavLink className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/create">Add Record</NavLink>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                          <NavLink className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/user">Profile</NavLink>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                          <NavLink className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/records">Records</NavLink>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                          <NavLink className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/artist/create">Add Artist</NavLink>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                          <NavLink className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/logout">{username} Logout</NavLink>
                        </li>
                      </>
                  }
                </ul>
              </div>
            </div>
          </nav>
        <Routes />
      </React.Fragment>
    );
  };
}

export default Navigation;