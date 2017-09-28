import React, { Component } from 'react';
import ChatBubble from 'react-chat-bubble';
import { Form } from 'semantic-ui-react';
import $ from 'jquery';

import ChatSetting from '../chat/chatsetting';

import * as constant from '../constants';

import '../../assets/styles/common/chatwindow.css';

var EJSON = require("ejson");

let translate = require('counterpart');
let FontAwesome = require('react-fontawesome');
let chat = require('../../lib/api/chat');
let im = require('../../lib/api/im');
let user = require('../../lib/api/users');
let ddp = require('../../lib/real_time_api/ddp_connection');
let item_helper = require('../../lib/helper/item_chat_helper');
let group = require('../../lib/api/group');
var firebase = require('firebase');
var subscribeId = 0;
var roomId = ''

var upfile = require('../../lib/helper/upfile_helper');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      current_user_name: '',
      current_user_id: '',
      current_user_type: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    var component = this;  
    if(component.state.current_user_name !== nextProps.currentChatUserName && component.state.current_user_id !== nextProps.currentChatUserId){
      component.setState({current_user_name: nextProps.currentChatUserName});
      component.setState({current_user_id: nextProps.currentChatUserId});
      var currentUser = firebase.auth().currentUser;
      var roomid = currentUser.uid + nextProps.currentChatUserId;
      let ref = firebase.database().ref().child('reference').child(roomid);
      // ref.on('child_added',function(data){
      //   console.log(data);
      // })
    }
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
    if (evt.which === 13 && evt.shiftKey === false) {
      this.handleSubmit();
      evt.preventDefault();
      this.clearContent('input-mess-box');
    }
    else {
      this.autoExpand('input-mess-box');
    }
  }

  autoScrollBottom() {
    $('.chats').stop().animate({
      scrollTop: $('.chats')[0].scrollHeight}, 1000);
  }

  handleSubmit() {
    var content = document.getElementById('input-mess-box').value;

  }


  render() {
    return(
      <div className='chat-window' id='chat-window'>
        <div className='title'>
          <div className='user-name'>
            {this.state.current_user_name}
          </div>
          <FontAwesome name='video-camera'/>
          <FontAwesome name='phone'/>
        </div>
        <ChatBubble messages={this.state.messages} />
        <div className='text-box' id='text-box'>
        <input type="file" id="fileButton" />
          <Form.TextArea id='input-mess-box'
            placeholder={translate('app.chat.input_place_holder')}
            onKeyDown={this.handleInputChange.bind(this)}/>
        </div>
        {/* <ChatSetting currentChatUserName={this.state.current_user_name}
          currentChatUserType={this.state.current_user_type}
          currentRoomId={roomId}/> */}
      </div>
    )
  }
}

export default Chat;
