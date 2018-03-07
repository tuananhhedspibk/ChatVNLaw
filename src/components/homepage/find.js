import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import Attorney from '../attorney/attorney';

import * as constant from '../constants';
import * as translate from 'counterpart';

class Find extends Component {
  navigateToAttorney() {
    window.location = constant.ATTORNEY_URI;
  }

  render() {
    return (
      <div className='find'>
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
    );
  }
}

export default Find;
