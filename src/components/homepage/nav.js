import React, { Component } from 'react';
import $ from 'jquery';
import firebase from 'firebase';
import {isLawyer} from '../../lib/user/lawyers';
import {getUserByUid} from '../../lib/user/getuserinfo';

import * as constant from '../constants';
import * as translate from 'counterpart';

import '../../assets/styles/common/nav.css';

class Nav extends Component {
  constructor(props){
    super(props);
    this.state ={
      currentUser: null,
      islawyer: false
    }
  }

  componentWillMount(){
    var component = this;
    localStorage.setItem('target', 'home');
    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        getUserByUid(user.uid, (event,data) =>{
          switch(event){
            case 'value':
              var item = {
                username: data.val().username,
                displayName: data.val().displayName,
                uid : data.key,
                status: data.val().status,
                photoURL: data.val().photoURL
              }
              var bool = data.val().role === 'lawyer' ? true : false 
              component.setState({currentUser: item, islawyer: bool});
              break;
            case 'child_changed':
              var bool = data.val().role === 'lawyer' ? true : false 
              component.setState({islawyer: bool})
              break;
          }
        })
      }     
    })
  }

  checkLogin() {
    localStorage.setItem('target', 'chat')
    if(!firebase.apps.length){
      firebase.initializeApp(constant.APP_CONFIG);  
    }
    if(!this.state.islawyer){
      window.location = constant.BASE_URL + constant.SIGN_IN_URI;            
    }else{
      window.location = constant.BASE_URL + '/dashboard';                
    }
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
    if(!!this.state.currentUser){
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
            <li>
              {
                isLawyer ?
                (
                  <a className='headerNavListLink'
                    href={constant.BASE_URL + constant.LAWYER_PROFILE_URI
                      + '/' + this.state.currentUser.username}>
                      {translate('app.identifier.profile')}
                  </a>
                )
                :
                (
                  <a className='headerNavListLink'
                    href={constant.BASE_URL + constant.CUSTOMER_PROFILE_URI
                      + '/' + this.state.currentUser.username}>
                      {translate('app.identifier.profile')}
                  </a>
                )
              }
            </li>
            <li>
              {
                isLawyer ?
                (
                  <a className='headerNavListLink'
                    href={constant.BASE_URL + constant.SETTINGS_URI
                      + constant.LAWYER_PROFILE_URI
                      + '/' + this.state.currentUser.username}>
                      {translate('app.nav.setting')}
                  </a>
                )
                :
                (
                  <a className='headerNavListLink'
                    href={constant.BASE_URL + constant.SETTINGS_URI
                      + constant.CUSTOMER_PROFILE_URI
                      + '/' + this.state.currentUser.username}>
                      {translate('app.nav.setting')}
                  </a>
                )
              }
            </li>
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
        <nav className='navbar navbar-expand-lg'>
          <a className='navbar-brand' href={constant.HOME_URI}>
            {translate('app.identifier.app_name')}
          </a>
          <button className='navbar-toggler' data-toggle='collapse'
            data-target={'#navbarToggleExternalContent' + this.props.id}
            aria-controls='navbarToggleExternalContent'
            aria-expanded='false' aria-label='Toggle navigation'>
              <i className='fa fa-bars' aria-hidden='true'></i>
          </button>
          <div className='collapse navbar-collapse'
            id={'navbarToggleExternalContent' + this.props.id}>
            <ul className='navbar-nav ml-auto headerNavList'>
              <li className='nav-item headerNavListItem search-inputgroup'>
                <a className='headerNavListLink' role='button'>
                  {translate('app.nav.brow_law')}
                </a>
              </li>
              <li className='nav-item headerNavListItem search-inputgroup'>
                <a className='headerNavListLink' role='button'>
                  {translate('app.nav.brow_lawyers')}
                </a>
              </li>
              <li className='nav-item headerNavListItem'>
                <a target='_blank'
                  className='headerNavListLink' href=''>
                  {translate('app.nav.support')}
                </a>
              </li>
              <li className='nav-item headerNavListItem'>
                <a className='headerNavListLink'
                  onClick={this.checkLogin.bind(this)}>
                  {this.state.islawyer === true ? 'DashBoard' : 'Chat'}
                </a>
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
