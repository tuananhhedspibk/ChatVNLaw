import React, { Component } from 'react';
import {
  Dropdown, DropdownMenu,
  DropdownItem, Nav, NavItem,
  NavbarToggler, NavbarBrand,
  DropdownToggle
} from 'reactstrap';
import { Button, Icon } from 'semantic-ui-react';

import $ from 'jquery';
import firebase from 'firebase';
import { logoutRails } from '../../../../lib/user/authentication';

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
    this.setState({currentUser: this.props.currentUser});
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
    if (this.id === 'open-chat-btn') {
      $('#close-chat-btn').fadeIn();
    }
    else if (this.id === 'close-chat-btn') {
      $('#open-chat-btn').fadeIn();
    }
    $('#' + this.id).fadeOut();

    e.preventDefault();
    document.body.classList.toggle('chat-section-hidden');
    if($('.video-call').css('display') !== 'none') {
      $('.video-call').find('.video').toggle();
      $('.video-call').find('.end-call-btn').toggle();
    }
    $('.chat-box-wrapper').toggle();
  }

  handleOnclickProfile(){
    window.open(constant.BASE_URL + constant.LAWYER_PROFILE_URI + '/' + this.props.currentUser.userName)
  }

  handleOnclickEditProfile(){
     window.open(constant.BASE_URL + constant.SETTINGS_URI);
  }

  render() {
    return (
      <header className='app-header navbar'>
        <NavbarToggler className='d-lg-none'
          onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
        <NavbarBrand href='/'>{translate('app.identifier.app_name')}
        </NavbarBrand>
        <NavbarToggler className='d-md-down-none'
          onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className='nav-link dropdown-toggle'>
                <img alt='ava'
                  src={constant.API_BASE_URL + this.state.currentUser.avatar.url}
                  className='img-avatar'/>
                <span className='d-md-down-none'>
                  {this.state.currentUser.displayName}
                </span>
              </DropdownToggle>
              <DropdownMenu right
                className={this.state.dropdownOpen ? 'show' : ''}>
                <DropdownItem onClick={this.handleOnclickProfile.bind(this)}>
                  <i className='fa fa-user'></i>
                  {translate('app.identifier.account')}
                </DropdownItem>
                <DropdownItem onClick={this.handleOnclickEditProfile.bind(this)}>
                  <i className='fa fa-cog'></i>
                  {translate('app.identifier.setting')}
                </DropdownItem>
                <DropdownItem onClick={this.logout.bind(this)}>
                  <i className='fa fa-lock'></i>
                  {translate('app.identifier.logout')}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
        <Button animated onClick={this.chatToggle} id='close-chat-btn'
          className='custom-semantic-btn'>
            <Button.Content hidden>
              {translate('app.dashboard.close_chat')}
            </Button.Content>
            <Button.Content visible>
              <Icon name='right arrow' />
            </Button.Content>
          </Button>
        <Button animated onClick={this.chatToggle} id='open-chat-btn'
          className='custom-semantic-btn'>
            <Button.Content hidden>
              {translate('app.dashboard.open_chat')}
            </Button.Content>
            <Button.Content visible>
              <Icon name='left arrow' />
            </Button.Content>
        </Button>
      </header>
    )
  }
}

export default Header;
