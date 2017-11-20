import React, {Component} from 'react';
import {
  Badge, Dropdown, DropdownMenu,
  DropdownItem, Nav, NavItem,
  NavLink, NavbarToggler, NavbarBrand,
  DropdownToggle
} from 'reactstrap';
import $ from 'jquery';
import firebase from 'firebase';

import * as constant from '../../../constants';
import * as translate from 'counterpart';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      currentUser: ''
    };
  }

  componentWillMount() {
    var component = this;

    if(!firebase.apps.length){
      firebase.initializeApp(constant.APP_CONFIG);
    }
    firebase.auth().onAuthStateChanged(user => {
      component.state.currentUser = user;
      component.setState(component.state);
    });
  }

  logout() {
    firebase.auth().signOut().then(function() {
      window.location = constant.BASE_URL + constant.HOME_URI;
    }).catch(function(error) {});
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  chatToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('chat-section-hidden');
    if($('.video-call').css('display') !== 'none') {
      $('.video-call').find('.video').toggle();
      $('.video-call').find('.end-call-btn').toggle();
    }
  }

  render() {
    return (
      <header className='app-header navbar'>
        <NavbarToggler className='d-lg-none' onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
        <NavbarBrand href='/'>{translate('app.identifier.app_name')}</NavbarBrand>
        <NavbarToggler className='d-md-down-none' onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
        <Nav className='ml-auto' navbar>
          <NavItem className='d-md-down-none'>
            <NavLink href='#'><i className='icon-bell'></i><Badge pill color='danger'>5</Badge></NavLink>
          </NavItem>
          <NavItem className='d-md-down-none'>
            <NavLink href='#'><i className='icon-list'></i></NavLink>
          </NavItem>
          <NavItem className='d-md-down-none'>
            <NavLink href='#'><i className='icon-location-pin'></i></NavLink>
          </NavItem>
          <NavItem>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className='nav-link dropdown-toggle'>
                <img src={this.state.currentUser.photoURL}
                  className='img-avatar'/>
                <span className='d-md-down-none'>{this.state.currentUser.displayName}</span>
              </DropdownToggle>
              <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                <DropdownItem header tag='div'>
                  <strong>{translate('app.identifier.account')}</strong>
                </DropdownItem>
                <DropdownItem header tag='div'>
                  <strong>{translate('app.identifier.setting')}</strong>
                </DropdownItem>
                <DropdownItem onClick={this.logout.bind(this)}>
                  <i className='fa fa-lock'></i>
                  {translate('app.identifier.logout')}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
        <NavbarToggler className='d-md-down-none' type='button' onClick={this.chatToggle}>&#9776;</NavbarToggler>
      </header>
    )
  }
}

export default Header;
