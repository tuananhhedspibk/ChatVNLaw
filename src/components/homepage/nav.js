import React, { Component } from 'react';
import $ from 'jquery';

import * as constant from '../constants';

import '../../assets/styles/common/nav.css';

const firebase = require('firebase');
const userInfo = require('../../lib/helper/user/get_user_info');

let translate = require('counterpart');
var check = 0;

class Nav extends Component {
  constructor(props){
    super(props);
    this.state ={
      currentUser: null
    }
  }

  componentDidMount() {
    $('.search-link').on('click',function(){
      var input_group = $(this).next();
      $('.input-group:visible').hide();
      $('.input-group:visible').children('input').css('width','10px');
      $('.search-link:hidden').show();

      $(this).hide();
      input_group.css('display','flex');
      input_group.hide();
      input_group.show();
      $(input_group).children('input').css('width','200px');
    });

    $('.remove-btn').on('click',function(){
      var input_group = $(this).parents('.input-group');
      input_group.hide();
      $(input_group).children('input').css('width','10px');
      $(input_group).prev().show(); 
    });
  }

  componentWillMount(){
    var component = this;
    localStorage.setItem('target', 'home');
    firebase.auth().onAuthStateChanged(function(user){
      component.setState({currentUser: user});      
    })
  }

  checkLogin() {
    localStorage.setItem('target', 'chat')
    if(!firebase.apps.length){
      firebase.initializeApp(constant.APP_CONFIG);  
    }
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        userInfo.getUserName(user, function(result){
          window.location = constant.BASE_URL+ '/chat/' + result;                 
        })
      } else {
        window.location = constant.BASE_URL + constant.SIGN_IN_URI;
      }
    });
  }

  logout() {
    firebase.auth().signOut().then(function() {
      window.location = constant.BASE_URL + constant.HOME_URI;
    }).catch(function(error) {});
  }

  renderDropdown() {
    if(!firebase.apps.length){
      firebase.initializeApp(constant.APP_CONFIG);  
    }
    if(this.state.currentUser){
        return(
          <div className='dropdown'>
            <button className='btn dropdown-toggle'
              type='button' id='dropdownMenu1'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='true'>
              {this.state.currentUser.displayName}
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenu1'>
              <li><a href={constant.BASE_URL+constant.PROFILE_URI}>{translate('app.nav.setting')}</a></li>
              <li>
                <a className='headerNavListLink'
                  onClick={this.logout}>{translate('app.nav.sign_out')}
                </a>
              </li>
            </ul>
          </div>
        )
      }
      else {
        return(
          <li className='nav-item headerNavListItem'>
            <a className='headerNavListLink' href={constant.SIGN_IN_URI}>
              {translate('app.identifier.login')}
            </a>
          </li>
        )
      }
  }

  renderView(){ 
    return(
      <div className={'container-fluid nav-' + this.props.navStyle}>
        <nav className='navbar navbar-expand navbar-default'>
          <div className='navbar-header'>
            <button className='navbar-toggler' data-toggle='collapse'
              data-target='#navbarToggleExternalContent'
              aria-controls='navbarToggleExternalContent'
              aria-expanded='false' aria-label='Toggle navigation'>
                <i className='fa fa-bars' aria-hidden='true'></i>
            </button>
          </div>
          <div className='navbar-collapse collapse' id='navbarToggleExternalContent'>
            <a className='navbar-brand' href='/home'>
              VNLaw
            </a>
            <ul className='navbar-nav ml-auto headerNavList'>
              <li className='nav-item headerNavListItem search-inputgroup'>
                <a className='search-link' role='button'>
                  {translate('app.nav.brow_law')}
                </a>
                <div className='input-group'>
                  <input type='text' className='form-control' />
                  <div className='input-group-btn'>
                    <button className='btn btn-blue' type='submit'>
                      <i className='fa fa-search' aria-hidden='true'></i>
                    </button>
                    <button className='btn btn-blue remove-btn'>
                      <i className='fa fa-times' aria-hidden='true'></i>
                    </button>
                  </div>
                </div>
              </li>
              <li className='nav-item headerNavListItem search-inputgroup'>
                <a className='search-link' role='button'>
                  {translate('app.nav.brow_lawyers')}
                </a>
                <div className='input-group'>
                  <input type='text' className='form-control' />
                  <div className='input-group-btn'>
                    <button className='btn btn-blue' type='submit'>
                      <i className='fa fa-search' aria-hidden='true'></i>
                    </button>
                    <button className='btn btn-blue remove-btn'>
                      <i className='fa fa-times' aria-hidden='true'></i>
                    </button>
                  </div>
                </div>
              </li>
              <li className='nav-item headerNavListItem'>
                <a target='_blank'
                  className='headerNavListLink' href='#'>
                  {translate('app.nav.support')}
                </a>
              </li>
              <li className='nav-item headerNavListItem'>
                <a className='headerNavListLink' onClick={this.checkLogin}>Chat</a>
              </li>
              {this.renderDropdown()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }

  render() {
    return (
      <div className='header-nav'>
        {this.renderView()}
      </div>
    );
  }
}

export default Nav;
