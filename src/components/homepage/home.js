import React, { Component } from 'react';

import Header from './header';
import Nav from './nav' ;
import Content from './content';
import Footer from './footer';

import '../../assets/styles/common/home.css';

class App extends Component {
  render() {
    return (
      <div className='home-page'>
        <Header/>
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
