import React, { Component } from 'react';
import request from '../../services/requestServices';
import Loader from 'react-loader-spinner';
import ArtistsSelect from '../forms/ArtistSelect';

class RecordForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      loaded: false
    }
  }

  render() {
    if (!this.state.loaded) {
      return <Loader type="Puff" color="#000000" height="25" width="25" />
    }

    return (
      <div className="container">
        {/* <ArtistsSelect artists={this.state.artists} handleSelectChange={this.props.handleSelectChange} /> */}
        <form method="POST" onSubmit={this.props.handleSendFormData}>
        <div className="control-group">
            <div className="form-group floating-label-form-group controls mb-0 pb-2">
              <label htmlFor="artistNameId">Artists Name</label>
              <input
                type="text"
                name="artistName"
                className="form-control"
                id="artistNameId"
                onChange={this.props.handleInputChange}
                placeholder="Artists Name"
                value={this.props.artistName}
              />
            </div>
          </div>
          <div className="control-group">
            <div className="form-group floating-label-form-group controls mb-0 pb-2">
              <label htmlFor="recordNameId">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="recordNameId"
                onChange={this.props.handleInputChange}
                placeholder="Record Name"
                value={this.props.name}
              />
            </div>
          </div>
          <div className="control-group">
            <div className="form-group floating-label-form-group controls mb-0 pb-2">
              <label htmlFor="pictureId">Image Url</label>
              <input
                type="text"
                name="picture"
                className="form-control"
                id="pictureId"
                onChange={this.props.handleInputChange}
                placeholder="Url"
                value={this.props.picture}
              />
            </div>
          </div>
          <div className="control-group">
            <div className="form-group floating-label-form-group controls mb-0 pb-2">
              <label htmlFor="priceId">Price</label>
              <input
                type="text"
                name="price"
                className="form-control"
                id="priceId"
                onChange={this.props.handleInputChange}
                placeholder="Price"
                value={this.props.price}
              />
            </div>
          </div>
          <div className="control-group">
            <div className="form-group floating-label-form-group controls mb-0 pb-2">
              <label htmlFor="descriptionId">Description</label>
              <textarea
                name="description"
                className="form-control"
                id="descriptionId"
                placeholder="Description"
                onChange={this.props.handleInputChange}
                value={this.props.description}
                rows="2"></textarea>
            </div>
          </div>
          <br />
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-xl">Submit</button>
          </div>
        </form>
        {/* {this.props.formState.errors ? this.props.formState.errors.map((e, i) => <Error key={i} error={e} />) : '' } */}
      </div>
    );
  }

  async componentDidMount() {

    try {
      const response = await request.get('artists');
      let artists = response.map(a => ({
        label: a.name,
        value: a.id
      }));

      this.setState({
        artists,
        loaded: true
      });
    } catch (error) {
    }
  }

}

export default RecordForm;