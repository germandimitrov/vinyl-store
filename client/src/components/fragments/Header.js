import React, { Component } from 'react';
import Navigation from './Navigation';

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <div> This is the header </div>
        <Navigation />
      </React.Fragment>
    );
  };
}

export default Header;