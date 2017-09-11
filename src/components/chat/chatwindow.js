import React, { Component } from 'react';
import ChatBubble from 'react-chat-bubble';
import { Form } from 'semantic-ui-react';
import $ from 'jquery';

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
          if(messages[i].u._id === roomId){
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

  autoExpand(elementId) {
    var input = document.getElementById(elementId);
    var fieldParent = input.parentElement;
    var chats = document.getElementsByClassName('chats')[0];
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    input.style.height = '45px';
    var contentHeight = document.getElementById(elementId).scrollHeight;
    input.style.height = contentHeight + 'px';

    var textbox = document.getElementById('text-box');
    textbox.style.height = contentHeight + 15 + 'px';
    fieldParent.style.height = contentHeight + 'px';
    chats.style.height = vh - 50 - contentHeight + 'px';
  }

  clearContent(elementId) {
    $('#' + elementId).val($('#' + elementId).val().replace(/\t/g, 'a'));
    $('#' + elementId).val('');
    this.autoExpand(elementId);
  }

  handleInputChange(evt) {

    console.log(evt.shiftKey);
    console.log(evt.which);
    if (evt.which === 13 && evt.shiftKey === false) {
      //this.handleSubmit();
      evt.preventDefault();
      this.clearContent('input-mess-box');
    }
    else {
      this.autoExpand('input-mess-box');
    }
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
            onKeyDown={this.handleInputChange.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default ChatWindow;
