import React from 'react';
import withFormHandling from '../hoc/withFormHandling';

const ArtistFormBase = (props) => {

  return (
    <div>
    <form method="POST" onSubmit={props.handleSendFormData}>
      <div className="form-group">
        <label htmlFor="artistName">Artist Name</label>
        <input type="text" name="name" className="form-control" id="artistName"  onChange={props.handleInputChange} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    {/* { props.formState.errors ? props.formState.errors.map((e, i) => <Error key={i} error={e}/> ) : ''} */}
  </div>
  )
}

const ArtistForm = withFormHandling(ArtistFormBase, {}, 'artists');

export default ArtistForm;