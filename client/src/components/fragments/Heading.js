import React, { Component } from 'react';

const Heading = ({heading}) => {
  return (
    <>
      <h2 className="text-center text-uppercase text-secondary mb-0">{heading} </h2>
      <hr className="star-dark mb-5" />
    </>
  );
}

export default Heading;