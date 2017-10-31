import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Nav from '../homepage/Nav';

import * as constant from '../constants';

import '../../assets/styles/common/404.css';

let translate = require('counterpart');

class NotFound extends Component {
  render() {
    return (
      <div className='notfound-wrapper'>
        <Nav />
        <div className='container'>
          <div className='row justify-content-md-center'>
            <div className='error-pic'>
              <img src={constant.notFound}/>
            </div>
            <div className='content'>
              <div className='temp-content'>{translate('app.notfound.content.oh')}</div>
              <div className='main-content'>{translate('app.notfound.content.main')}</div>
            </div>
            <Link to='/login' className='back-to-home'>{translate('app.notfound.content.back_home')}</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound;
