import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../Routes';

class Navigation extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
              <li className="nav-link"><Link to="/"> Home </Link></li>
              <li className="nav-link"><Link to="/login"> Login </Link></li>
              <li className="nav-link"><Link to="/register"> Register </Link></li>
              <li className="nav-link"><Link to="/records"> Records </Link></li>
              <li className="nav-link"><Link to="/logout"> Logout </Link></li>
            </ul>
          </nav>
        </div>
        <Routes />
      </React.Fragment>
    );
  };
}

export default Navigation;