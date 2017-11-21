import React, { Component } from 'react';
import $ from 'jquery';

import * as constant from '../constants';
import * as translate from 'counterpart';

import '../../assets/styles/common/footer.css';

class Footer extends Component {
  render() {
    return(
      <footer className='footer-distributed'>
        <div className='footer-right'>
          <a href='google.com'><i className='fa fa-facebook'></i></a>
          <a href='google.com'><i className='fa fa-twitter'></i></a>
          <a href='google.com'><i className='fa fa-linkedin'></i></a>
        </div>
        <div className='footer-left'>
          <p className='footer-links'>
            <a href={constant.HOME_URI}>{translate('app.identifier.home')}</a>
            <p className='delimiter'>·</p>
            <a href={constant.SEARCH_LAW_URI}>{translate('app.identifier.search')}</a>
          </p>
          <p>{translate('app.home.footer.content')}</p>
        </div>
      </footer>
    )
  }
}

export default Footer;