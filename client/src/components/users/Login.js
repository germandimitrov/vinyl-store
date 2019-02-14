import React, { Component } from 'react';
import request from '../../helpers/apiRequest';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {};
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

  handleSendFormData(event) {
    event.preventDefault();

    fetch('http://localhost:5001/signin', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <form method="POST" onChange={this.handleInputChange} onSubmit={this.handleSendFormData}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" name="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
          <small id="emailHelp" name="email" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default Login;
