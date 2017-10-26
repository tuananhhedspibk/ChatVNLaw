import React, { Component } from 'react';
import $ from 'jquery';

import '../../assets/styles/homepage/footer.css';

let translate = require('counterpart');

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
            <a href='/'>{translate('app.identifier.home')}</a>
            <p className='delimiter'>·</p>
            <a href='#'>{translate('app.identifier.search')}</a>
          </p>
          <p>Company Name &copy; 2017</p>
        </div>
      </footer>
    )
  }
}

export default Footer;