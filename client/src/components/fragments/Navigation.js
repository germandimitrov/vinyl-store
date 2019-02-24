import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../Routes';
import authService from '../../services/authService';

class Navigation extends Component {
  render() {
    const isAuth = authService.isAuth();
    return (
      <React.Fragment>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
              <li className="nav-link"><Link to="/"> Home </Link></li>
              <li className="nav-link"><Link to="/records"> Records </Link></li>
              {isAuth ? '' : <li className="nav-link"><Link to="/login"> Login </Link></li>}
              {isAuth ? '' : <li className="nav-link"><Link to="/register"> Register </Link></li>}

              {/* Auth only */}
              {isAuth ? <li className="nav-link"><Link to="/create"> Add Record </Link></li> : ''}
              {isAuth ? <li className="nav-link"><Link to="/artist/create"> Add Artist </Link></li> : ''}
              {isAuth ? <li className="nav-link"><Link to="/logout"> Logout </Link></li> : '' }
            </ul>
          </nav>
        </div>
        <Routes />
      </React.Fragment>
    );
  };
}

export default Navigation;