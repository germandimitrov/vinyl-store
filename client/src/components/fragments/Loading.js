import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="outer-content container">
        <div className="inner-content">
          <Loader type="Puff" color="#2C3E50" height="200" width="200" />
          <h2 className="text-center text-uppercase text-secondary mb-0 loading-text">Loading...</h2>
        </div>
    </div>
  );
}

export default Loading;
