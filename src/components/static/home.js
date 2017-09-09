import React, {Component} from 'react';
import { Input, Form, Button } from 'semantic-ui-react';

import * as constant from '../constants';
import ChatWindow from '../chat/chatwindow';
import UsersIndex from '../user/index';

import '../../assets/styles/chatui.css';

let translate = require('counterpart');
// let user      = require('../../lib/api/users');
let chat = require('../../lib/api/chat');
class Home extends Component {
  renderView() {
    if (localStorage.rocket_chat_user == null) {
      window.location = constant.BASE_URL + constant.SIGN_IN_URI; 
    }
    else{
      return(
        <div className='chat-ui'>
          <UsersIndex/>
          <ChatWindow/>
        </div>
      )
    }
  }
  handleSubmit(evt) {
    evt.preventDefault();
    
  }
  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    )
  }
}

export default Home;
