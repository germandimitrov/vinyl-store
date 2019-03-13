import React, { Component } from 'react';
import request from '../../services/requestService';
import { toast } from 'react-toastify';
import authService from '../../services/authService';

const withFormHandlingEdit = (WrappedComponent, initialState, endpoint, redirect) => {
  return class extends Component {

    constructor(props) {
      super(props);
      this.endpoint = endpoint + '/' + this.props.match.params.id;
      this.state = initialState;

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSendFormData = this.handleSendFormData.bind(this);
    }

    async componentDidMount() {
      try {
        let formData = await request.get(this.endpoint);
        this.setState({
          ...formData
        });
      } catch (error) {
        console.log(error);
      }
    }

    async handleSendFormData(event) {
      event.preventDefault();

      let response = await request.put(this.endpoint, this.state);

      if (response.errors && response.errors.length && response.errors[0].msg) {
        let errors = response.errors.map(e => e.msg);
        this.setState({
          errors: errors
        }, () => {
          return this.state.errors.map(e => (e) ? toast.error(e) : '');
        });
      } else {
        toast.success('Entry has been updated!');
        if (this.endpoint.includes('users')) {
          let user = response;
          authService.setUser(user);
        }
        this.props.history.push('/' + redirect);
      }
    }

    handleInputChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    render() {
      return <WrappedComponent
        {...this.state}
        handleSendFormData={this.handleSendFormData}
        handleInputChange={this.handleInputChange}
        hidePasswordFields={true}
      />;
    }

  }
}

export default withFormHandlingEdit;