import React, { Component } from 'react';
import authService from '../../services/authService';
import request from '../../services/requestServices';
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
      this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(selectionArray) {
      this.setState({
        artists: selectionArray
      })
    }

    handleInputChange(event) {
      let field = event.target.name;
      let value = event.target.value;
      this.setState({
        [field]: value
      });
      // console.log(this.state);
    }

    async handleSendFormData(event) {
      event.preventDefault();
      let response = await request.post(this.endpoint, {}, this.state);

      if (response.errors) {
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
          this.props.history.push('/');
        }
        else {
          this.props.history.push('/');
        }
      }
    }

    render() {
      return <WrappedComponent
        formState={this.state}
        handleInputChange={this.handleInputChange}
        handleSendFormData={this.handleSendFormData}
        handleSelectChange={this.handleSelectChange}
      />;
    }
  }
}

export default withFormHandling;