import React, { Component } from 'react';
import request from '../../services/requestServices';

class Home extends Component {

  async componentDidMount() {
    let data = await request.get();
    // console.log(data);
  }

  render() {
    return <div>This the home component</div>
  }
}

export default Home;