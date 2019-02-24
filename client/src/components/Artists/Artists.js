import React from 'react';

const Artists = ({ artists }) => {

  return (
    <select className="custom-select" multiple>
      <option selected>Select Artist</option>
      { artists.map(a => <option key={a.id} value={a.id}>{a.name}</option> ) }
    </select>
  );
}

export default Artists;