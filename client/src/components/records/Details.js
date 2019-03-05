import React, { Component } from 'react';
import Link from 'react';
import request from '../../services/requestServices';
import Heading from '../fragments/Heading';

class Details extends Component {
  constructor(props) {
    super(props);

    this.recordId = this.props.match.params.id;
    this.state = {
      label: 'Show Phone',
      showPhone: false
    }
    this.showPhone = this.showPhone.bind(this);
  }

  async componentDidMount() {
    try {
      const record = await request.get('records/' + this.recordId)
      console.log(record);

      this.setState({
        ...record
      })
    } catch (error) {

    }
  }

  showPhone() {
    this.setState((prevState, props ) => {
      return {
        showPhone: prevState.showPhone ? false : true ,
        label: prevState.label.includes('Show Phone') ? 'Hide Phone' : 'Show Phone',
      }
    });
  }

  render() {

    if (!this.state.name && !this.state.user) {
      return (null);
    }

    return (
      <div className="container">
        <Heading heading="Details" />
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <img className="img-fluid rounded mb-4 mb-lg-0" src={this.state.picture} alt="vinyl" />
          </div>
          <div className="col-lg-5 details">
            <h1 className="font-weight-light">{this.state.artistName} - {this.state.name}</h1>
            <p>{this.state.description}</p>
            <p>Offered by: {this.state.user.username} </p>
            <button
              onClick={this.showPhone}
              className="btn-xs btn-primary"
              to="/"> {this.state.label}
            </button>
            <div className="show-phone" > Contact Details: {this.state.showPhone ? this.state.user.phone : 'xxx'}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Details;
