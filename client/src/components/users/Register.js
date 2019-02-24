import React from 'react';
import Error from '../Error';
import withFormHandling from '../hoc/withFormHandling';

const RegisterBase = (props) => {

  return (
    <div>
      <form method="POST" onSubmit={props.handleSendFormData}>
        <div className="form-group">
          <label htmlFor="exampleInputfirstName1">First Name</label>
          <input type="text" name="firstName" className="form-control" value={props.formState.firstName} onChange={props.handleInputChange} id="exampleInputfirstName1" placeholder="First Name"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputlastName1">Last Name</label>
          <input type="text" name="lastName" className="form-control" value={props.formState.lastName} onChange={props.handleInputChange} id="exampleInputlastName1" placeholder="Last Name" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" name="email" className="form-control" value={props.formState.email} onChange={props.handleInputChange} id="exampleInputEmail1" placeholder="Enter email" />
          <small id="emailHelp" name="email" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" name="password" className="form-control" value={props.formState.password} onChange={props.handleInputChange} id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Confirm Password</label>
          <input type="password" name="confirmPassword" className="form-control" value={props.formState.confirmPassword} onChange={props.handleInputChange} id="exampleInputPassword2" placeholder="Repeat Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      { props.formState.errors ? props.formState.errors.map((e, i) => <Error key={i} error={e}/> ) : ''}
    </div>
  );

}

const Register = withFormHandling(RegisterBase, {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: null
}, 'register');

export default Register;
