import React from 'react';
import '../css/Error.css';

const Error = (props) => {
  return <div className="error-msg">{props.error}</div>
}

export default Error;