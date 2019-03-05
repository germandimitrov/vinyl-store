import React from 'react';
import withFormHandling from '../hoc/withFormHandling';
import RecordForm from '../forms/RecordForm';
import Heading from '../fragments/Heading';
import ArtistForm from '../forms/ArtistForm';

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