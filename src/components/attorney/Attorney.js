import React, { Component } from 'react';
import Nav from '../../components/homepage/Nav' ;
import Content from './Content'
import Footer from '../../components/homepage/Footer';

class Attorney extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default Attorney;
