import React from 'react';
import Error from '../Error';
import withFormHandling from '../hoc/withFormHandling';
import '../../index.css';
import Heading from '../fragments/Heading';
import Footer from '../fragments/Footer';

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
              value={props.formState.email}
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
              value={props.formState.password}
              onChange={props.handleInputChange}
            />
        </div>
      </div>
      <br />
      <button type="submit" className="btn btn-primary btn-xl">Submit</button>
      </form>
      {/* { props.formState.errors ? props.formState.errors.map((e, i) => <Error key={i} error={e}/> ) : ''} */}
    </div>
    <br />
    <Footer />
    </>
  );

}

const Login = withFormHandling(LoginBase, {
  password: '',
  email: '',
  errors: null
}, 'login');

export default Login;
