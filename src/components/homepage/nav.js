import React, { Component } from 'react';
import $ from 'jquery';
import firebase from 'firebase';
import { EventEmitter } from 'fbemitter';

import { logoutRails } from '../../lib/user/authentication';

import * as constant from '../constants';
import * as translate from 'counterpart';

import '../../assets/styles/common/nav.css';

class Nav extends Component {
  constructor(props){
    super(props);
    this.state ={
      currentUser: null,
      isLawyer: false
    }
    this.emitter = new EventEmitter();
  }

  componentWillMount(){
    var component = this;
    localStorage.setItem('target', 'home');
    firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        if (localStorage.chat_vnlaw_user) {
          var ls_u = JSON.parse(localStorage.chat_vnlaw_user);
          component.setState({currentUser: ls_u});
          if (ls_u.role == 'Lawyer') {
            component.setState({isLawyer: true});
          }
        }
      }
      else {
        component.setState({currentUser: null});
      }
    });
  }

  checkLogin() {
    if(!this.state.isLawyer){
      if (this.state.currentUser) {
        window.location = constant.BASE_URL + constant.CHAT_URI;
      }            
      else {
        localStorage.setItem('redirect_uri', constant.CHAT_URI);
        window.location = constant.BASE_URL + constant.SIGN_IN_URI;
      }
    }else{
      window.location = constant.BASE_URL + constant.DASHBOARD_URI;                
    }
  }

  logout() {
    var component = this;

    firebase.auth().signOut().then(function() {
      logoutRails((success, data) => {
        if(success) {
          localStorage.removeItem(constant.STORAGE_ITEM);
          window.location = constant.BASE_URL + constant.HOME_URI;
        }
        else {
          component.emitter.emit('AddNewErrorToast', '',
          data.message, 5000, ()=>{})                         
          return;
        }
      })
    }).catch(function(error) {
      component.emitter.emit('AddNewErrorToast', '',
        error, 5000, ()=>{})                         
      return;
    });
  }

  redirectToLoginPage() {
    localStorage.setItem('redirect_uri', window.location.pathname);
    window.location = constant.BASE_URL + constant.SIGN_IN_URI;
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
            <div className='user-name'>
              {this.state.currentUser.displayName}
            </div>
          </button>
          <ul className='dropdown-menu' aria-labelledby='dropdownMenu1'>
            <li>
              {
                this.state.isLawyer ?
                (
                  <a className='headerNavListLink'
                    href={constant.BASE_URL + constant.LAWYER_PROFILE_URI
                      + '/' + this.state.currentUser.userName}>
                      {translate('app.identifier.profile')}
                  </a>
                )
                :
                (
                  <a className='headerNavListLink'
                    href={constant.BASE_URL + constant.CUSTOMER_PROFILE_URI
                      + '/' + this.state.currentUser.userName}>
                      {translate('app.identifier.profile')}
                  </a>
                )
              }
            </li>
            <li>
                <a className='headerNavListLink'
                  href={constant.BASE_URL + constant.SETTINGS_URI}>
                    {translate('app.nav.setting')}
                </a>
            </li>
            <li>
              <a className='headerNavListLink'
                onClick={this.logout.bind(this)}>{translate('app.nav.sign_out')}
              </a>
            </li>
          </ul>
        </div>
      )
    }
    else {
      return(
        <li className='nav-item'>
          <a className='nav-link' onClick={this.redirectToLoginPage.bind(this)}>
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
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <a className='nav-link' href={constant.LDA_LINK} target='_blank'>
                  {translate('app.nav.modeling_law')}
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href={constant.SEARCH_LAW_URI}
                  role='button'>
                    {translate('app.nav.brow_law')}
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href={constant.ATTORNEY_URI}
                  role='button'>
                    {translate('app.nav.brow_lawyers')}
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link'
                  onClick={this.checkLogin.bind(this)}>
                  {this.state.isLawyer === true ? 'DashBoard' : 'Chat'}
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href={constant.NOTIFI_URI}>
                  {translate('app.nav.notification')}
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
