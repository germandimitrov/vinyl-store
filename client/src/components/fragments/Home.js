import React, { Component } from 'react';
import RecordsList from '../records/RecordList';

const Home = () => {
    return (
      <>
        <header className="masthead bg-primary text-white text-center push-up-home content" >
          <div className="container">
            <img className="img-fluid mb-5 d-block mx-auto push-img-up" src="images/1.png" alt="" />
            <span> </span>
            <h1 className="text-uppercase mb-0">Vinyl Store</h1>
            <hr className="star-light" />
            <h2 className="font-weight-light mb-0">Buy And Sell Your Precious Vinyl</h2>
          </div>
        </header>
      </>
    );
}

export default Home;