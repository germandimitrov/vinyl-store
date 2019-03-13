import React from 'react';

const RecordForm = (props) => {
  return (
    <div className="container">
      <form method="POST" onSubmit={props.handleSendFormData}>
      <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label htmlFor="artistNameId">Artists Name</label>
            <input
              type="text"
              name="artistName"
              className="form-control"
              id="artistNameId"
              onChange={props.handleInputChange}
              placeholder="Artists Name"
              value={props.artistName}
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
              onChange={props.handleInputChange}
              placeholder="Record Name"
              value={props.name}
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
              onChange={props.handleInputChange}
              placeholder="Url"
              value={props.picture}
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
              onChange={props.handleInputChange}
              placeholder="Price"
              value={props.price}
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
              onChange={props.handleInputChange}
              value={props.description}
              rows="2"></textarea>
          </div>
        </div>
        <br />
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-xl">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default RecordForm;