import React from 'react';
import withFormHandling from '../hoc/withFormHandling';
import Heading from '../fragments/Heading';
import Footer from '../fragments/Footer';

const ArtistFormBase = (props) => {

  return (
    <>
    <div className="container">
      <Heading heading='Add Artist'/>
      <form method="POST" onSubmit={props.handleSendFormData}>
        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label htmlFor="artistName">Artist Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="artistName"
              placeholder="Type Artist Name"
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        <br />
      <button type="submit" className="btn btn-primary btn-xl">Submit</button>
    </form>
    {/* { props.formState.errors ? props.formState.errors.map((e, i) => <Error key={i} error={e}/> ) : ''} */}
  </div>
  <Footer />
  </>
  )
}

const ArtistForm = withFormHandling(ArtistFormBase, {}, 'artists');

export default ArtistForm;