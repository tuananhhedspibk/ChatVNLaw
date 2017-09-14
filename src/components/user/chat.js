import React, { Component } from 'react';
import ChatBubble from 'react-chat-bubble';
import { Form } from 'semantic-ui-react';
import $ from 'jquery';

import avaLawyer from '../../assets/images/default-ava-lawyer.png';
import avaUser from '../../assets/images/default-ava-user.png';

import '../../assets/styles/chatwindow.css';
var EJSON = require("ejson");

let translate = require('counterpart');
let FontAwesome = require('react-fontawesome');
let chat = require('../../lib/api/chat');
let im = require('../../lib/api/im');
let user = require('../../lib/api/users');
let ddp = require('../../lib/real_time_api/ddp_connection');

var subscribeId = 0;
var roomId = ''
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      current_user_name: '',
      current_user_id: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    var component = this;  
    
    if (nextProps.username !== this.state.current_user_name){
      this.setState({messages : []});
      this.setState({current_user_name: nextProps.username});
      if(subscribeId !== 0){
        ddp.unsubscribe(subscribeId, function(){
          component.handleLoadMessage(nextProps.username);
        });   
      } else{
        ddp.connect(function(){
          ddp.login(function(){
            component.handleLoadMessage(nextProps.username)
          });
        }); 
      }
    }
  }

  handleIncomingMess(result){
    var component = this;   
    result = EJSON.parse(result);
    if(result.msg === 'changed'){
      var newStateMessages = component.state.messages;
      var messages = result.fields.args;
      var item;
      if (messages[0].u._id === JSON.parse(localStorage.rocket_chat_user).user_id){
        item = {
          "type": 1,
          "image": avaUser,
          "text": messages[0].msg
        }
      } else{
        item = {
          "type": 0,
          "image": avaLawyer,
          "text": messages[0].msg
        }
      }
      newStateMessages.push(item);
      component.setState({messages : newStateMessages});
    }
  }
  fletchMsg(msgArr){
    var component = this;  
    
    // msgArr =  EJSON.parse(msgArr);
    var newStateMessages = [];
    var messages = msgArr.messages;
    for( var i in messages){
      var item;
      if(messages[i].u._id !== JSON.parse(localStorage.rocket_chat_user).user_id){
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
    component.setState({messages : newStateMessages});
  }
  handleLoadMessage(username){
    var component = this;
    user.infoByUserName(username, function(response){
      if(response.status === 200){
        roomId = response.data.user._id + JSON.parse(localStorage.rocket_chat_user).user_id;
        ddp.loadHistory(roomId, function( issuccess, result){
          if(issuccess){
            component.fletchMsg(result);
            ddp.streamRoomMessages(roomId, function(id,msg){
              subscribeId = id;
              component.handleIncomingMess(msg);
            });
          }else{
            roomId = JSON.parse(localStorage.rocket_chat_user).user_id + response.data.user._id;
            ddp.loadHistory(roomId, function( issuccess, result){
              if(issuccess){
                component.fletchMsg(result);      
                ddp.streamRoomMessages(roomId, function(id,msg){
                  subscribeId = id;
                  component.handleIncomingMess(msg);
                });      
              }else{
                ddp.openRoom(roomId);
                ddp.streamRoomMessages(roomId, function(id,msg){
                  subscribeId = id;
                  component.handleIncomingMess(msg);
                });
              }
            });
          }
        });
      }
    });
    
  }
  componentWillUnmount(){
    ddp.close();
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

  handleSubmit() {
    var content = document.getElementById('input-mess-box').value;
      chat.postMessage(roomId,"",content,"","","",[], function(response){
    });
  }

  componentWillMount() {
  }

  handleSubmitTest(){
	  
  }
  render() {
    return(
		
      <div className='chat-window'>
        <div className='title'>
          <div className='user-name'>
            {translate('app.chat.title')}
          </div>
          {this.state.current_user_name}
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

export default Chat;
