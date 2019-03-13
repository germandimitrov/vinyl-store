import React from 'react';
import withFormHandling from '../hoc/withFormHandling';
import Heading from '../fragments/Heading';
import RegisterForm from '../forms/RegisterForm';

const RegisterBase = (props) => {

  return (
    <>
      <Heading heading="Register"/>
      <RegisterForm {...props}/>
    </>
  );
}

const initialState = {
  username: '',
  address: '',
  phone: '',
  picture: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Register = withFormHandling(RegisterBase, initialState,'register');

export default Register;
