import React from 'react';
import withFormHandling from '../hoc/withFormHandling';
import RecordForm from '../forms/RecordForm';

const AddRecordBase = (props) => {
  return (
    <RecordForm
      handleSendFormData={props.handleSendFormData}
      handleInputChange={props.handleInputChange}
      handleSelectChange={props.handleSelectChange}
      formState={props.formState}
    />
  );
}

const AddRecord = withFormHandling(AddRecordBase, {
  name: '',
  description: '',
  price: '',
  picture: ''
}, 'records')

export default AddRecord;