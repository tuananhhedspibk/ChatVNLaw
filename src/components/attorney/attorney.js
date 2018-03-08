import React, { Component } from 'react';
import * as translate from 'counterpart';

import Nav from '../../components/homepage/nav' ;
import Content from './content';
import Footer from '../../components/homepage/footer';
import ReadMore from '../shared/readmore';

import * as constant from '../constants';

import '../../assets/styles/common/attorney.css';

class Attorney extends Component {
  constructor(props){
    super(props);
  }

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
