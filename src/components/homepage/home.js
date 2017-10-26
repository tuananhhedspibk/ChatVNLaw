import React, { Component } from 'react';
import Nav from './nav' ;
import Content from './content';
import Footer from './footer';
import '../../assets/styles/homepage/homepage.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
