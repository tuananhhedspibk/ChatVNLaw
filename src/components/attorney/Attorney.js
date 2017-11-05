import React, { Component } from 'react';
import Nav from '../../components/homepage/nav' ;
import Content from './Content'
import Footer from '../../components/homepage/footer';

class Attorney extends Component {
  render() {
    return (
      <div>
        <Nav navStyle='inverse' />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default Attorney;
