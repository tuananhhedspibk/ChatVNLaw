import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import Attorney from '../attorney/attorney';

import * as constant from '../constants';
import * as translate from 'counterpart';

class Find extends Component {
  stringForm(input){
    input = input.replace(/\s\s+/g, ' ');
    input = input.replace(/\b[a-z]/g, function() {
      if(arguments[1] !== 0){
        if(arguments[2][arguments[1] -1] === ' '){
          return  arguments[0].toUpperCase()          
        }
        return arguments[0].toLowerCase()
      }
      return  arguments[0].toUpperCase()
    })
    return input;
  }

  navigateToAttorney() {
    window.location = '/attorney';
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
