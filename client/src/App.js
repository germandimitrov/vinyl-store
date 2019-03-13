import React, { Component } from 'react';
import Header from './components/fragments/Header';
import Footer from './components/fragments/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './components/Routes';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ErrorBoundary>
          <ToastContainer autoClose={2000} closeButton={false} />
          <Header />
            <Routes />
          <Footer />
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

export default App;
