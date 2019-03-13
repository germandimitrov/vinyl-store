import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col text-center loading">
          <Loader type="Puff" color="#2C3E50" height="200" width="200" />
          <h2 className="text-center text-uppercase text-secondary mb-0 loading-text">Loading...</h2>
        </div>
      </div>
    </div>
  );
}

export default Loading;
