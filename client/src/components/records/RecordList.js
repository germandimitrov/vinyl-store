import React, { Component } from 'react';
import request from '../../services/requestServices';
import Loader from 'react-loader-spinner';
import Record from './Record';
import Heading from '../fragments/Heading';
import ErrorBoundary from '../fragments/ErrorBoundary';

class RecordsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      records: this.props.records || [],
    };
    this.isDeleted = this.isDeleted.bind(this);
  }

  async componentDidMount() {
    if (this.props.loadRecords) {
      try {
        const records = await request.get('records');
        this.setState({
          records
        })
      } catch (error) {
      }
    }
  }

  async isDeleted(isDeleted) {
    if (isDeleted) {
      const records = await request.get('records');
      this.setState({
        records: records
      })
    }
  }

  render() {
    if ( ! this.state.records) {
      // return <Loader type="Puff" color="#000000" height="25" width="25" />
      throw new Error('You cannot enter more than five characters!');

    }
    return (
      <>
        <ErrorBoundary>
        <div className="container">
        <Heading heading={'Records'}/>
        <div className="row">
          {this.state.records.map((record) => {
            return <Record
              name={record.name}
              picture={record.picture}
              username={record.user ? record.user.username : null}
              description={record.description}
              price={record.price}
              userId={record.user ? record.user.id : null}
              key={record.id}
              id={record.id}
              isDeleted={this.isDeleted}
            />
          })}
          </div>
        </div>
        </ErrorBoundary>
      </>
    );
  };
}

export default RecordsList;
