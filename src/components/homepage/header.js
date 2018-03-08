import React, { Component } from 'react';

import Nav from './nav';

import * as constant from '../constants';
import * as translate from 'counterpart';

class Header extends Component {
  navigateToAttorney() {
    window.location = constant.ATTORNEY_URI;
  }

  render() {
    return(
      <div className='header'>
        <div className='content'>
          <Nav navStyle='light' />
          <Nav id='-extra-nav'
            navStyle='inverse nav-hidden fixed-top'/>
          <div className='slogan-section'>
            <div className='slogan'>
              {translate('app.home.slogan_1')}
            </div>
            <div className='title'>
              {translate('app.home.find_box.title')}
            </div>
            <div className='slogan'>
              {translate('app.home.slogan_2')}
            </div>
            <button onClick={this.navigateToAttorney}>
              {translate('app.home.find_box.search')}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
