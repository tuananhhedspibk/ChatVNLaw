import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import * as constant from '../constants';
import $ from 'jquery';
let translate = require('counterpart');

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
  onClick(){
    var lawyerNameInputBox = $('#search-by-lawyer-name');
    if(!!lawyerNameInputBox.val()){
      var lawyerNameInput = lawyerNameInputBox.val();      
      window.location = constant.BASE_URL + '/attorney?name=' + this.stringForm(lawyerNameInput);
    }
    else {
      window.location = constant.BASE_URL + constant.ATTORNEY_URI;
    }
  }
  render() {
    return (
      <div className='find'>
        <div className='title'>
          {translate('app.home.find_box.title')}
        </div>
        <div className='search-box'>
          <input className='search-input' id='search-by-lawyer-name'
            placeholder={translate('app.home.find_box.lawyer_name')}/>
          <input className='search-input'
            placeholder={translate('app.home.find_box.lawyer_field')}/>
          <button className='search-button' onClick={this.onClick.bind(this)}>
            <i className='fa fa-search'
              aria-hidden='true'></i>
          </button>
        </div>
        {
          this.props.sloganStyle === 'none' ? (
            <div></div>
          ): (
            <div className='slogan'>
              {translate('app.home.slogan')}
            </div>
          )
        }
      </div>
    );
  }
}

export default Find;
