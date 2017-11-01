import React, { Component } from 'react';
import $ from 'jquery';

import * as constant from '../constants';

import 'bootstrap/dist/css/bootstrap.css'
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
      $('.input-group:visible').children('input').css('width','10px');
      $('.input-group:visible').hide();
      $('.search-link:hidden').show();
      $(this).css('display','none');
      input_group.fadeIn(600);
      input_group.css('display','flex');
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
            <button className="btn dropdown-toggle"
              type="button" id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true">
              {this.state.currentUser.displayName}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li><a href="#">{translate('app.nav.setting')}</a></li>
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
          <a className='headerNavListLink' href={constant.SIGN_IN_URI}>
            {translate('app.identifier.login')}
          </a>
        )
      }
  }

  renderView(){ 
    return(
      <nav className='navbar navbar-default'>
        <div className='navbar-header'>
        </div>
        <ul className='nav navbar-nav navbar-left headerNavList'>
          <li className='headerNavListItem search-inputgroup'>
            <a className='search-link' role='button'>
              {translate('app.nav.brow_law')}
            </a>
            <div className='input-group'>
              <input type='text' className='form-control' />
              <div className='input-group-btn'>
                <button className='btn btn-primary' type='submit'>
                  <span className='glyphicon glyphicon-search'></span>
                </button>
                <button className='btn btn-primary remove-btn'>
                  <span className='glyphicon glyphicon-remove'></span>
                </button>
              </div>
            </div>
          </li>
          <li className='headerNavListItem search-inputgroup'>
            <a className='search-link' role='button'>
              {translate('app.nav.brow_lawyers')}
            </a>
            <div className='input-group'>
              <input type='text' className='form-control' />
              <div className='input-group-btn'>
                <button className='btn btn-primary' type='submit'>
                  <span className='glyphicon glyphicon-search'></span>
                </button>
                <button className='btn btn-primary remove-btn'>
                  <span className='glyphicon glyphicon-remove'></span>
                </button>
              </div>
            </div>
          </li>
          <li className='headerNavListItem'>
            <a target='_blank'
              className='headerNavListLink' href='#'>
              {translate('app.nav.support')}
            </a>
          </li>
          <li className='headerNavListItem'>
            <a className='headerNavListLink' onClick={this.checkLogin}>Chat</a>
          </li>
        </ul>
        <ul className='nav navbar-nav navbar-right headerNavList'>
          {this.renderDropdown()}
        </ul>
      </nav>
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
