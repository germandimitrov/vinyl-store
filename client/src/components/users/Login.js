import React from 'react';
import withFormHandling from '../hoc/withFormHandling';
import '../../index.css';
import Heading from '../fragments/Heading';

const LoginBase = (props) => {

  return (
    <>
      <div className="container">
        <Heading heading='Login'/>
        <form method="POST" onSubmit={props.handleSendFormData}>
        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label htmlFor="exampleInputEmail1">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Username"
                value={props.email}
                onChange={props.handleInputChange}
              />
            <small id="emailHelp" name="email" className="form-text text-muted"></small>
          </div>
        </div>
        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={props.password}
                onChange={props.handleInputChange}
              />
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-primary btn-xl">Submit</button>
        </form>
      </div>
      <br />
    </>
  );

}

const Login = withFormHandling(LoginBase, {password: '', email: ''}, 'login');

export default Login;
