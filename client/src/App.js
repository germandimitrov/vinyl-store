import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Login from './components/users/Login';
import Header from './components/fragments/Header';
import Footer from './components/fragments/Footer';
import Home from './components/fragments/Home';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
