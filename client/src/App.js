import React, { Component } from 'react';
import Header from './components/fragments/Header';
import Footer from './components/fragments/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './components/Routes';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer autoClose={2000} closeButton={false} />
        <Header />
          <Routes />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
