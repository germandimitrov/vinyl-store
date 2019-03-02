import React from 'react';
import withFormHandling from '../hoc/withFormHandling';
import RecordForm from '../forms/RecordForm';
import Heading from '../fragments/Heading';
import Footer from '../fragments/Footer';

const AddRecordBase = (props) => {
  return (
    <>
    <Heading heading="Add Record" />
      <RecordForm
        handleSendFormData={props.handleSendFormData}
        handleInputChange={props.handleInputChange}
        handleSelectChange={props.handleSelectChange}
        formState={props.formState}
      />
      <Footer />
    </>
  );
}

const AddRecord = withFormHandling(
  AddRecordBase, {
    name: '',
    description: '',
    price: '',
    picture: ''
  },
  'records'
);

export default AddRecord;