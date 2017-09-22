import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

import '../../assets/styles/common/chatsetting.css';

import * as constant from '../constants';

let authen = require('../../lib/api/authentication.js');
let FontAwesome = require('react-fontawesome');
let translate = require('counterpart');

class ChatSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user_name: '',
      current_user_type: ''
    }
  }

  logout() {
    authen.logout(function(response){
      if(response.status === 200) {
        window.location = constant.BASE_URL + constant.SIGN_IN_URI;
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentChatUserName !== this.state.current_user_name){
      this.setState({current_user_name: nextProps.currentChatUserName});
      this.setState({current_user_type: nextProps.currentChatUserType});
    }
  }

  renderAva() {
    if(this.state.current_user_type === 'bot') {
      return(
        <img src={constant.avaBot} alt='ava-bot'/>
      )
    }
    else {
      return(
        <img src={constant.avaLawyer} alt='ava-lawyer'/>
      )
    }
  }

  renderConfig() {
    if(this.state.current_user_name ===
      JSON.parse(localStorage.rocket_chat_user).user_name) {
      return(
        <Dropdown icon='setting'>
          <Dropdown.Menu>
            <Dropdown.Item text={translate('app.identifier.logout')}
              onClick={this.logout.bind(this)}/>
          </Dropdown.Menu>
        </Dropdown>
      )
    }
    return null;
  }

  render() {
    return(
      <div className='chat-setting'>
        <div className='header'>
          <div className='ava'>
            {this.renderAva()}
          </div>
          <div className='info'>
            <div className='user-name'>{this.state.current_user_name}</div>
          </div>
          <div className='config'>
            {this.renderConfig()}
          </div>
        </div>
        <div className='content'>
          <div className='shared shared-files'>
            <div className='content-title'>{translate('app.chat.shared_files')}</div>
          </div>
          <div className='shared shared-images'>
            <div className='content-title'>{translate('app.chat.shared_images')}</div>
          </div>
        </div>
      </div> 
    )
  }
}

export default ChatSetting;
