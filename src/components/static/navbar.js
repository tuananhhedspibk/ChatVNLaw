import React, {Component} from 'react';

import { Menu } from 'semantic-ui-react';

import '../../assets/styles/navbar.css';

import * as constant from '../constants';
let translate = require('counterpart');

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ''
    }
  }

  componentDidMount() {
    console.log(window.location.href);
    if(window.location.href === constant.BASE_URL + '/' || window.location.href === constant.BASE_URL + constant.HOME_URI) {
      this.setState({activeItem: 'home'});
    }
    else if(window.location.href === constant.BASE_URL + constant.SIGN_IN_URI) {
      this.setState({activeItem: 'login'});
    }
  }

  render() {
    return( 
      <Menu>
        <Menu.Item active={this.state.activeItem === 'home'}>
          <a href={constant.BASE_URL}>
            {translate("app.identifier.home")}
          </a>
        </Menu.Item>
        <Menu.Item active={this.state.activeItem === 'login'}>
          <a href={constant.BASE_URL + constant.SIGN_IN_URI}>
            {translate("app.identifier.login")}
          </a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default NavBar;
