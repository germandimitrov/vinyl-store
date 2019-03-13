import React from 'react';
import RecordForm from '../forms/RecordForm';
import Heading from '../fragments/Heading';
import withFormHandlingEdit from '../hoc/withFormHandingEdit';

const initialState = {
  name: '',
  artistName: '',
  description: '',
  picture: '',
  price: ''
}

const EditRecordBase = (props) => {
  return (
    <>
      <Heading heading="Edit Record"/>
      <RecordForm {...props} />
    </>
  )
}

const EditRecord = withFormHandlingEdit(EditRecordBase, initialState, 'records', 'records');

export default EditRecord;