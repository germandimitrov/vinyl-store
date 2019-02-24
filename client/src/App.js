import React, { Component } from 'react';
import Header from './components/fragments/Header';
import Footer from './components/fragments/Footer';

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
