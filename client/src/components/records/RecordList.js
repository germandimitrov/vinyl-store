import React, { Component } from 'react';
import request from '../../services/requestServices';
import Loader from 'react-loader-spinner';
import Record from './Record';

class RecordsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      records: this.props.records || [],
    };
  }

  async componentDidMount() {
    if (this.props.loadRecords) {
      try {
        const records = await request.get('records', {}, {});
        this.setState({
          records
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    if ( ! this.state.records) {
      return <Loader type="Puff" color="#000000" height="25" width="25" />
    }

    return (
      <div className="container">
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
            />
          })}
        </div>
      </div>
    );
  };
}

export default RecordsList;
