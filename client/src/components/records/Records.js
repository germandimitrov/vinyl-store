import React, { Component } from 'react';
import request from '../../services/requestServices';
import Loader from 'react-loader-spinner';
import Record from './Record';

class Records extends Component {

  constructor(props) {
    super(props)
    this.state = {
      records: null
    };
  }

  async componentDidMount() {
    try {
      const records = await request.get('records', {}, {});
      this.setState({
        records
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if ( ! this.state.records) {
      return <Loader type="Puff" color="#000000" height="25" width="25" />
    }

    return (
      <div className="row">
        <Record records={this.state.records} />
      </div>
    );
  };
}

export default Records;
