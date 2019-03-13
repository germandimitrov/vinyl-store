import React, { Component } from 'react';
import authService from '../../services/authService';
import request from '../../services/requestService';
import { toast } from 'react-toastify';

const withFormHandling = (WrappedComponent, initialState, endpoint) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = initialState;
      this.endpoint = endpoint;

      this.errors = [];

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSendFormData = this.handleSendFormData.bind(this);
    }

    handleInputChange(event) {
      let field = event.target.name;
      let value = event.target.value;
      this.setState({
        [field]: value
      });
    }

    async handleSendFormData(event) {
      event.preventDefault();
      try {
        let response = await request.post(this.endpoint, this.state);
        if (response.errors && response.errors.length && response.errors[0].msg) {
          let errors = response.errors.map(e => e.msg);
          this.setState({
            errors: errors
          },() => (this.state.errors.map(e => toast.error(e))));
        }
        else {
          // @TODO needs to be redone
          if (this.endpoint.includes('register') || this.endpoint.includes('login')) {
            let token = response.token;
            let user = response.user;
            authService.authenticate(token, user);
            this.props.history.push('/records');
          }
          else if (this.endpoint.includes('records')) {
            toast.success('New Record Has Been Added!');
            this.props.history.push('/records');
          }
          else {
            this.props.history.push('/');
          }
        }
      } catch (error) {
        toast.error('Oh, Something went horribly wrong!');
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          handleInputChange={this.handleInputChange}
          handleSendFormData={this.handleSendFormData}
        />
      );
    }
  }
}

export default withFormHandling;