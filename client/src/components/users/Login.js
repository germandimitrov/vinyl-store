import React from 'react';
import Error from '../Error';
import withFormHandling from '../hoc/withFormHandling';

const LoginBase = (props) => {

  return (
    <div>
      <form method="POST" onSubmit={props.handleSendFormData}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email Address</label>
          <input type="email" name="email" className="form-control" id="exampleInputEmail1" value={props.formState.email} onChange={props.handleInputChange} />
          <small id="emailHelp" name="email" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={props.formState.password} onChange={props.handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      { props.formState.errors ? props.formState.errors.map((e, i) => <Error key={i} error={e}/> ) : ''}
    </div>
  );

}

const Login = withFormHandling(LoginBase, {
  password: '',
  email: '',
  errors: null
}, 'login');

export default Login;
