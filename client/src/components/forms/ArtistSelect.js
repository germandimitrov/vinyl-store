import React from 'react';
import Select from 'react-select';

const ArtistsSelect = (props) => {

  // style the react select
  const customStyles = {
    control: (base, state) => ({
      ...base,
      'font-size': '1.5em',
      'position': 'relative',
      'z-index': 1,
      'padding-right': 0,
      'padding-left': 0,
      'resize': 'none',
      'border': 'none',
      'border-radius': 0,
      'background': 'none',
      'box-shadow': 'none !important',
      'border':'0px',
      'outline':'0px',
      'background-color':'white',
      'background':'none',
      '-webkit-appearance':'none',
      'appearance':'none'
    })
  }



  return <Select
    isMulti
    name="artists"
    styles={customStyles}
    options={props.artists}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={props.handleSelectChange}
    placeholder='Please click and select Artists'
  />
}


export default ArtistsSelect;