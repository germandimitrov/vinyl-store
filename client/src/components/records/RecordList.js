import React, { Component } from 'react';
import request from '../../services/requestService';
import RecordCard from './RecordCard';
import Heading from '../fragments/Heading';
import { toast } from 'react-toastify';
import Loading from '../fragments/Loading';

class RecordsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      records: [],
      loaded: false,
    };
    this.isDeleted = this.isDeleted.bind(this);
  }

  async componentDidMount() {
    try {
      const records = await request.get('records');
        this.setState({
          records,
          loaded: true
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
    if (!this.state.loaded) {
      return <Loading />
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
