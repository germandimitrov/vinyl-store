import React, { Component } from 'react';
import request from '../../services/requestService';
import Loader from 'react-loader-spinner';
import RecordCard from './RecordCard';
import Heading from '../fragments/Heading';
import { toast } from 'react-toastify';

class RecordsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      records: [],
    };
    this.isDeleted = this.isDeleted.bind(this);
  }

  async componentDidMount() {
    try {
      const records = await request.get('records');
      this.setState({
        records
      });
    } catch (error) {
      console.log(error);
    }
  }

  async isDeleted(isDeleted) {
    if (isDeleted) {
      const records = await request.get('records');
      this.setState({
        records: records
      }, () => toast.success('Record Has Been Deleted!'))
    }
  }

  render() {
    if ( ! this.state.records) {
      return <Loader type="Puff" color="#000000" height="25" width="25" />
    }
    return (
      <>
        <div className="container">
        <Heading heading='Records'/>
        <div className="row">
          {this.state.records.map((record) => {
            return <RecordCard
              {...record}
              userId={record.user.id}
              username={record.user.username}
              key={record.id}
              isDeleted={this.isDeleted}
              recordCardFooter={true}
            />
          })}
          </div>
        </div>
      </>
    );
  };
}

export default RecordsList;
