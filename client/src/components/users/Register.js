import React, { Component } from 'react';
import request from '../../services/requestServices';
import Error from '../Error';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSendFormData = this.handleSendFormData.bind(this);
  }

  handleInputChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({
      [field]: value
    })
  }

  async handleSendFormData(event) {
    event.preventDefault();
    let response = await request.post('/register', {}, this.state);
    if (response.errors) {
      let errors = response.errors.map(e => e.msg);
      this.setState({
        errors: errors
      })
    }

  }

  render() {
    return (
      <div>
        <form method="POST" onSubmit={this.handleSendFormData}>
          <div className="form-group">
            <label htmlFor="exampleInputfirstName1">First Name</label>
            <input type="text" name="firstName" className="form-control" value={this.state.firstName} onChange={this.handleInputChange} id="exampleInputfirstName1" placeholder="First Name"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputlastName1">Last Name</label>
            <input type="text" name="lastName" className="form-control" value={this.state.lastName} onChange={this.handleInputChange} id="exampleInputlastName1" placeholder="Last Name" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleInputChange} id="exampleInputEmail1" placeholder="Enter email" />
            <small id="emailHelp" name="email" className="form-text text-muted"></small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleInputChange} id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword2">Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-control" value={this.state.confirmPassword} onChange={this.handleInputChange} id="exampleInputPassword2" placeholder="Repeat Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        { this.state.errors ? this.state.errors.map((e, i) => <Error key={i} error={e}/> ) : ''}
      </div>
    );
  }

}

export default Register;
