import React, { Component } from 'react';
import request from '../../services/requestServices';
import Error from '../Error';
import authService from '../../services/authService';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: ''
    };
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
    let response = await request.post('/signin', {}, this.state);

    if (response.errors) {
      let errors = response.errors.map(e => e.msg);
      this.setState({
        errors: errors
      });
    } else {
      let token = response.token;
      let user = response.user;
      authService.authenticate(token, user)
    }
  }

  render() {
    return (
      <div>
        <form method="POST" onSubmit={this.handleSendFormData}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" className="form-control" id="exampleInputEmail1" value={this.state.email} onChange={this.handleInputChange} />
            <small id="emailHelp" name="email" className="form-text text-muted"></small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={this.state.password} onChange={this.handleInputChange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        { this.state.errors ? this.state.errors.map((e, i) => <Error key={i} error={e}/> ) : ''}
      </div>
    );
  }

}

export default Login;
