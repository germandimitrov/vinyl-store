import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import request from '../../services/requestService';
import Heading from '../fragments/Heading';

class Details extends Component {
  constructor(props) {
    super(props);

    this.recordId = this.props.match.params.id;
    this.state = {
      showPhone: false
    }
    this.showPhone = this.showPhone.bind(this);
  }

  async componentDidMount() {
    try {
      const record = await request.get('records/' + this.recordId);
      this.setState({
        ...record
      });
    } catch (error) {
      console.log(error);
    }
  }

  showPhone() {
    this.setState( {
      showPhone: ! this.state.showPhone,
    });
  }

  render() {

    if (!this.state.name && !this.state.user) {
      return (null);
    }

    let phoneLen = this.state.user.phone.toString().length;

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
            <p> Offered by: <Link to={'/user/' + this.state.user.id }> {this.state.user.username} </Link> </p>
            <button
              onClick={this.showPhone}
              className="btn-xs btn-primary"
              > {this.state.showPhone ? 'Hide Phone' : 'Show Phone'}
            </button>
            <div className="show-phone"> Contact Details: {this.state.showPhone ? this.state.user.phone : 'X'.repeat(phoneLen) }</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Details;
