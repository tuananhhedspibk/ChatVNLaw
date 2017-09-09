import React, { Component } from 'react';
import ChatBubble from 'react-chat-bubble';
import { Input, Form } from 'semantic-ui-react';

import avaLawyer from '../../assets/images/default-ava-lawyer.png';
import avaUser from '../../assets/images/default-ava-user.png';

import '../../assets/styles/chatwindow.css';

let translate = require('counterpart');
let FontAwesome = require('react-fontawesome');

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          "type" : 0,
          "image": avaLawyer,
          "text": "Hello! Good Morning!"
        },
        {
          "type": 1,
          "image": avaUser,
          "text": "Hello! Good Afternoon!"
        },
        {
          "type" : 0,
          "image": avaLawyer,
          "text": "Hello! Good Morning!"
        },
        {
          "type": 1,
          "image": avaUser,
          "text": "Hello! Good Afternoon!"
        },
        {
          "type" : 0,
          "image": avaLawyer,
          "text": "Hello! Good Morning!"
        },
        {
          "type": 1,
          "image": avaUser,
          "text": "Hello! Good Afternoon!"
        },
        {
          "type" : 0,
          "image": avaLawyer,
          "text": "Hello! Good Morning!"
        },
        {
          "type": 1,
          "image": avaUser,
          "text": "Hello! Good Afternoon!"
        },
        {
          "type" : 0,
          "image": avaLawyer,
          "text": "Hello! Good Morning!"
        },
        {
          "type": 1,
          "image": avaUser,
          "text": "Hello! Good Afternoon!"
        },
        {
          "type" : 0,
          "image": avaLawyer,
          "text": "Hello! Good Morning!"
        },
        {
          "type": 1,
          "image": avaUser,
          "text": "Hello! Good Afternoon!"
        },{
          "type" : 0,
          "image": avaLawyer,
          "text": "Hello! Good Morning!"
        },
        {
          "type": 1,
          "image": avaUser,
          "text": "Hello! Good Afternoon!"
        },
        {
          "type" : 0,
          "image": avaLawyer,
          "text": "Hello! Good Morning!"
        },
        {
          "type": 1,
          "image": avaUser,
          "text": "Hello! Good Afternoon!"
        },
        {
          "type" : 0,
          "image": avaLawyer,
          "text": "Hello! Good Morning!"
        },
        {
          "type": 1,
          "image": avaUser,
          "text": "Hello! Good Afternoon!"
        },
        {
          "type" : 0,
          "image": avaLawyer,
          "text": "Hello! Good Morning!"
        },
        {
          "type": 1,
          "image": avaUser,
          "text": "Hello! Good Afternoon!"
        },
        {
          "type" : 0,
          "image": avaLawyer,
          "text": "Hello! Good Morning!"
        },
        {
          "type": 1,
          "image": avaUser,
          "text": "Hello! Good Afternoon!"
        },
        {
          "type" : 0,
          "image": avaLawyer,
          "text": "Hello! Good Morning!"
        },
        {
          "type": 1,
          "image": avaUser,
          "text": "Hello! Good Afternoon!"
        }
      ]
    }
  }

  handleInputChange() {
    var input = document.getElementById('input-mess-box');
    input.style.height = '45px';
    input.style.height = input.scrollHeight + 'px';

    var textbox = document.getElementById('text-box');
    textbox.style.height = input.scrollHeight + 'px';
  }

  render() {
    return(
      <div className='chat-window'>
        <div className='title'>
          <div className='user-name'>
            {translate('app.chat.title')}
          </div>
          <FontAwesome name='video-camera'/>
          <FontAwesome name='phone'/>
        </div>
        <ChatBubble messages = {this.state.messages} />
        <div className='text-box' id='text-box'>
          <Form.TextArea id='input-mess-box'
            placeholder={translate('app.chat.input_place_holder')}
            onChange={this.handleInputChange.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default ChatWindow;
