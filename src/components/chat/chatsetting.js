import React, { Component } from 'react';

import avaLawyer from '../../assets/images/default-ava-lawyer.png';
import avaBot from '../../assets/images/bot.png';

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentChatUserName !== this.state.current_user_name){
      this.setState({current_user_name: nextProps.currentChatUserName});
      this.setState({current_user_type: nextProps.currentChatUserType});
    }
  }

  renderAva() {
    if(this.state.current_user_type === 'bot') {
      return(
        <img src={avaBot} alt=''/>
      )
    }
    else {
      return(
        <img src={avaLawyer} alt=''/>
      )
    }
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
            <FontAwesome name='cog'/>
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
