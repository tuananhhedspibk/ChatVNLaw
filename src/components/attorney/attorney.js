import React, { Component } from 'react';

import Nav from '../../components/homepage/nav' ;
import Content from './content';
import Footer from '../../components/homepage/footer';

import '../../assets/styles/common/attorney.css';

class Attorney extends Component {
  render() {
    return (
      <div>
        <Nav navStyle='inverse'/>
        <div className='attorney'>
          <Content location={this.props.location}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Attorney;
