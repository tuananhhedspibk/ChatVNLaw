import React, { Component } from 'react';
import Nav from './Nav' ;
import Content from './Content';
import Footer from './Footer';
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
