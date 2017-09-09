import React, { Component } from 'react';
import ChatBubble from 'react-chat-bubble';
import { Input, Form } from 'semantic-ui-react';

import avaLawyer from '../../assets/images/default-ava-lawyer.png';
import avaUser from '../../assets/images/default-ava-user.png';

import '../../assets/styles/chatwindow.css';

let translate = require('counterpart');
let FontAwesome = require('react-fontawesome');
let chat = require('../../lib/api/chat');
let im = require('../../lib/api/im');

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    var roomId = "saYeHsbZKwk55G9xw";
    var component = this;
    im.history(roomId, function(response){
      if(response.status === 200){
        var newStateMessages = component.state.messages;
        var messages = response.data.messages;
        for( var i in messages){
          var item;
          if(messages[i].u._id == roomId){
            item = {
              "type": 0,
              "image": avaLawyer,
              "text": messages[i].msg
            }
          } else{
            item = {
              "type": 1,
              "image": avaUser,
              "text": messages[i].msg
            }
          }
          newStateMessages.push(item);
        }
        newStateMessages.reverse();
        component.setState({"this.state.messages" : newStateMessages});
      }
    });
  }

  handleInputChange(evt) {
    if (evt.which == 13) {
      this.handleSubmit();
    }

    var input = document.getElementById('input-mess-box');
    input.style.height = '45px';
    input.style.height = input.scrollHeight + 'px';

    var textbox = document.getElementById('text-box');
    textbox.style.height = input.scrollHeight + 'px';
  }

  handleSubmit() {
    var content = document.getElementById('input-mess-box').value;
    var newStateMessages = this.state.messages;
    var item = {
      "type": 1,
      "image": avaUser,
      "text": content
    }
    var component = this;
    chat.postMessage("saYeHsbZKwk55G9xw","",content,"","","",[], function(response){
      if(response.status === 200){
        newStateMessages.push(item);
        component.setState({"this.state.messages" : newStateMessages});
      }
    });
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
            onKeyPress={this.handleInputChange.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default ChatWindow;
