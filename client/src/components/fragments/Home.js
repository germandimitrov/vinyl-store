import React, { Component } from 'react';
import request from '../../helpers/apiRequest';

class Home extends Component {

  componentDidMount() {
    request.get();
  }

  render() {
    return <div>This the home component</div>
  }
}

export default Home;