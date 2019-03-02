import React from 'react';
import withFormHandling from '../hoc/withFormHandling';
import Error from '../Error';
import Heading from '../fragments/Heading';
import Footer from '../fragments/Footer';

const RegisterBase = (props) => {

  return (
    <>
    <div className="container">
      <Heading heading='Register'/>
      <form method="POST" onSubmit={props.handleSendFormData}>
        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label htmlFor="exampleInputuserName1">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={props.formState.username}
              onChange={props.handleInputChange}
              id="exampleInputuserName1"
              placeholder="Username"
            />
          </div>
        </div>
        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label htmlFor="exampleInputProfilePicUrl">Profile Picture Url</label>
            <input
              type="text"
              name="picture"
              className="form-control"
              value={props.formState.picture}
              onChange={props.handleInputChange}
              id="exampleInputProfilePicUrl"
              placeholder="Profile Picture Url"
            />
          </div>
        </div>
        {/* <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label htmlFor="exampleInputfirstName1">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={props.formState.firstName}
              onChange={props.handleInputChange}
              id="exampleInputfirstName1"
              placeholder="First Name"
            />
          </div>
        </div> */}
        {/* <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label htmlFor="exampleInputlastName1">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={props.formState.lastName}
              onChange={props.handleInputChange}
              id="exampleInputlastName1"
              placeholder="Last Name"
            />
          </div>
        </div> */}
        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label htmlFor="exampleAddressName">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={props.formState.address}
              onChange={props.handleInputChange}
              id="exampleAddressName"
              placeholder="Address"
            />
          </div>
        </div>
        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label htmlFor="examplePhone">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={props.formState.phone}
              onChange={props.handleInputChange}
              id="examplePhone"
              placeholder="Phone"
            />
          </div>
        </div>
        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={props.formState.email}
              onChange={props.handleInputChange}
              id="exampleInputEmail1"
              placeholder="Enter email"
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
              value={props.formState.password}
              onChange={props.handleInputChange}
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label htmlFor="exampleInputPassword2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={props.formState.confirmPassword}
              onChange={props.handleInputChange}
              id="exampleInputPassword2"
              placeholder="Repeat Password"
            />
          </div>
        </div>
        <br />
      <button type="submit" className="btn btn-primary btn-xl">Submit</button>
      </form>
      <br />
      {/* { props.formState.errors ? props.formState.errors.map((e, i) => <Error key={i} error={e}/> ) : ''} */}
    </div>
    <Footer />
    </>
  );

}

const Register = withFormHandling(RegisterBase, {
  username: '',
  // firstName: '',
  // lastName: '',
  address: '',
  phone: '',
  picture: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: null
}, 'register');

export default Register;
