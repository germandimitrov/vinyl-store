import React from 'react';
import withFormHandling from '../hoc/withFormHandling';
import RecordForm from '../forms/RecordForm';
import Heading from '../fragments/Heading';

const AddRecordBase = (props) => {
  return (
    <>
      <Heading heading="Add Record" />
      <RecordForm {...props} />
    </>
  );
}

const initialState = {
  artistName: '',
  name: '',
  description: '',
  price: '',
  picture: ''
}

const AddRecord = withFormHandling(AddRecordBase, initialState,'records');

export default AddRecord;