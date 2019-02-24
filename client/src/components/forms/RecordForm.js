import React, { Component } from 'react';
import Error from '../Error';
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
      <div>
        <ArtistsSelect artists={this.state.artists} handleSelectChange={this.props.handleSelectChange} />

        <form method="POST" onSubmit={this.props.handleSendFormData}>
          <div className="form-group">
            <label htmlFor="recordNameId">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="recordNameId"
              onChange={this.props.handleInputChange}
              placeholder="Name"
              value={this.props.name}
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="descriptionId">Description</label>
            <textarea
              name="description"
              className="form-control"
              id="descriptionId"
              onChange={this.props.handleInputChange}
              value={this.props.description}
              rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {this.props.formState.errors ? this.props.formState.errors.map((e, i) => <Error key={i} error={e} />) : '' }
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