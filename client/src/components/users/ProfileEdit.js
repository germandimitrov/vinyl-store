import React from 'react';
import withFormHandlingEdit from '../hoc/withFormHandingEdit';
import RegisterForm from '../forms/RegisterForm';
import Heading from '../fragments/Heading';

const initialState = {
  username: '',
  picture: '',
  address: '',
  phone: '',
  email: ''
};

const ProfileEditBase = (props) => {
  return (
    <>
      <Heading heading="Edit User" />
      <RegisterForm {...props}/>
    </>
  );
}

const ProfileEdit = withFormHandlingEdit(
  ProfileEditBase,
  initialState,
  'users',
  'user'
);

export default ProfileEdit;