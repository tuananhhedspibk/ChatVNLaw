import React, { Component } from 'react';
import ChatBubble from 'react-chat-bubble';
import { Form } from 'semantic-ui-react';
import $ from 'jquery';

import avaLawyer from '../../assets/images/default-ava-lawyer.png';
import avaUser from '../../assets/images/default-ava-user.png';
import { Input, Button } from 'semantic-ui-react';

import '../../assets/styles/chatwindow.css';
var EJSON = require("ejson");


let translate = require('counterpart');
let FontAwesome = require('react-fontawesome');
let chat = require('../../lib/api/chat');
let im = require('../../lib/api/im');
let sub = require('../../lib/real_time_api/subscriptions');
let user = require('../../lib/api/users');
var roomId = "ELy2Z4zQn5HC9woc3";


class UserChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      current_user_name: ''
    }
  }

  componentWillReceiveProps() {
	  this.setState({messages : []});
	this.setState({current_user_name: this.props.username});
	var component = this;
	roomId = "ELy2Z4zQn5HC9woc3";
	user.infoByUserName(this.props.username, function(response){
		if(response.status === 200){
			console.log(response.data.user._id);
			roomId = roomId + response.data.user._id;
			sub.streamRoomMessages(roomId, function(result){
				result = EJSON.parse(result);
				if(result.msg === 'changed'){
				  var newStateMessages = component.state.messages;
				  var messages = result.fields.args;
				  console.log(messages);
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
				  component.setState({"this.state.messages" : newStateMessages});
				}
			});
			im.history(roomId, function(response){
			  if(response.status === 200){
				var newStateMessages = component.state.messages;
				var messages = response.data.messages;
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
				component.setState({"this.state.messages" : newStateMessages});
			  }
			});
		}
	});
  }

  componentDidMount() {
	
	
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
			<Form className='authen-form' onSubmit={this.handleSubmitTest.bind(this)} method='post'>
			<Button primary type='submit'>
				{translate('app.login.submit')}
				</Button>
			</Form>
        </div>
      </div>
    )
  }
}

export default UserChat;
