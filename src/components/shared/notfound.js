import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Nav from '../homepage/nav';
import Footer from '../homepage/footer';
import NotFoundContent from './notfoundcontent';

import * as constant from '../constants';
import * as translate from 'counterpart';

import '../../assets/styles/common/404.css';

class NotFound extends Component {
  render() {
    return (
      <div className='notfound-wrapper'>
        <Nav navStyle='inverse'/>
        <NotFoundContent />
        <Footer/>
      </div>
    )
  }
}

export default NotFound;
