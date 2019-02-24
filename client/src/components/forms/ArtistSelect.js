import React from 'react';
import Select from 'react-select';

const ArtistsSelect = (props) => {
  // console.log(props);

  let artists = props.artists;
  return <Select
    isMulti
    name="artists"
    options={artists}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={props.handleSelectChange}
    placeholder='Please select Artists'
  />
}


export default ArtistsSelect;