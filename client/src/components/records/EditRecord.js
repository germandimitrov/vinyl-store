import React, { Component } from 'react';
import RecordForm from '../forms/RecordForm';
import request from '../../services/requestServices';

class EditRecord extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      picture: '',
      price: ''
    }

    this.recordId = this.props.match.params.id;
    this.endpoint = `records/${this.recordId}`;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSendFormData = this.handleSendFormData.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  async componentDidMount() {

    let record = await request.get(this.endpoint);

    for (const key in record) {
      if (record[key] === null) {
        record[key] = '';
      }
    }

    this.setState({
      ...record,
    });
  }

  async handleSendFormData(event) {
    event.preventDefault();
    let response = await request.put(this.endpoint, {}, this.state);

    if (response.errors) {
      let errors = response.errors.map(e => e.msg);
      this.setState({
        errors: errors
      });
    }
  }

  handleSelectChange(selectionArray) {

    this.setState({
      artists: selectionArray
    })
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return <RecordForm
      handleSendFormData={this.handleSendFormData}
      handleInputChange={this.handleInputChange}
      handleSelectChange={this.handleSelectChange}
      formState={this.state}
      {...this.state}
    />
  }
}


export default EditRecord;