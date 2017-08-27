import React, {Component} from 'react';
import {Navbar, Nav, MenuItem, NavDropdown} from 'react-bootstrap';
import axios from 'axios';

import * as constant from '../constants';

let translate = require('counterpart');

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      user_id: '',
      auth_token: '',
      is_signed: false
    }
  }

  homeClick() {
    window.location = constant.BASE_URL;
  }

 /*axios.post(constant.API_BASE_URL + constant.API_SIGN_OUT,
      querystring.stringify({
        'X-Auth-Token':JSON.parse(localStorage.rocket_chat_user).auth_token,
        'X-User-Id':JSON.parse(localStorage.rocket_chat_user).user_id,
      })) */

  signOut(evt) {
    evt.preventDefault();
    axios.get(constant.API_BASE_URL + constant.API_SIGN_OUT, constant.headers)
    .then((response) => {
      localStorage.removeItem('rocket_chat_user');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentWillMount() {
    if(localStorage.rocket_chat_user != null) {
      let rocket_chat_user = JSON.parse(localStorage.rocket_chat_user);
      this.setState({
        is_signed: true,
        user_id: rocket_chat_user.user_id,
        auth_token: rocket_chat_user.auth_token
      });
    }
    else {
      this.setState({
        is_signed: false
      });
    }
  }

  render() {
    return(
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={this.homeClick.bind(this)}>{translate('app.identifier.app_name')}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav pullRight>
            <NavDropdown eventKey={3} title={translate('app.identifier.language')}
              id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>{translate('app.identifier.vi')}</MenuItem>
              <MenuItem eventKey={3.2}>{translate('app.identifier.en')}</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            {this.state.is_signed &&
              <NavDropdown eventKey={3} title={this.state.user_id} id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>{translate('app.identifier.setting')}</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.2} onClick={this.signOut.bind(this)}>
                  {translate('app.identifier.logout')}
                </MenuItem>
              </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar;
