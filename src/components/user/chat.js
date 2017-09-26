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

    if (nextProps.currentChatUserName !== this.state.current_user_name){
      this.setState({messages : []});
      this.setState({current_user_name: nextProps.currentChatUserName});
      this.setState({current_user_type: nextProps.currentChatUserType});
      if(subscribeId !== 0){
        ddp.unsubscribe(subscribeId, function(){
          component.handleLoadMessage(nextProps.currentChatUserName);
        });   
      } else{
        ddp.connect(function(){
          ddp.login(function(){
            component.handleLoadMessage(nextProps.currentChatUserName)
          });
        }); 
      }
    }
  }
  
  handleIncomingMess(result){
    var component = this;   
    result = EJSON.parse(result);
    var newStateMessages = component.state.messages;
    if(result.msg === 'changed'){
      var messages = result.fields.args;
      var item;

      if (messages[0].u._id !== JSON.parse(localStorage.rocket_chat_user).user_id){
        item = item_helper.newItem(1, constant.avaLawyer,messages[0]);
      } else{
        item = item_helper.newItem(0, constant.avaUser,messages[0]);
      }
      if(newStateMessages[newStateMessages.length - 1]._id !== item._id){
        newStateMessages.push(item);
        component.setState({messages : newStateMessages});        
      }
      this.autoScrollBottom();
    }
  }

  fetchMsg(msgArr, reverse){
    var component = this;  
    
    // msgArr =  EJSON.parse(msgArr);
    var newStateMessages = component.state.messages;
    if(reverse){
      newStateMessages = newStateMessages.reverse();
    }
    var messages = msgArr.messages;
    for( var i in messages){
      var item;
      if(messages[i].u._id === JSON.parse(localStorage.rocket_chat_user).user_id){
        if(reverse){
          item = item_helper.newItemWithRestApi(0, constant.avaUser, messages[i]);
        } else{
          item = item_helper.newItem(0, constant.avaUser, messages[i]);          
        }
      } else{
        if(reverse){
          item = item_helper.newItemWithRestApi(1,constant.avaLawyer,messages[i]);          
        } else{
          item = item_helper.newItem(1,constant.avaLawyer,messages[i]);
        }
      }
      newStateMessages.push(item);
    }
    newStateMessages.reverse();
    component.setState({messages : newStateMessages});
    if (!reverse){
      this.autoScrollBottom();
      
    }
  }

  handleLoadMessage(currentUserName){
    var component = this;
    user.infoByUserName(currentUserName, function(response){
      if(response.status === 200){
        var target_id = response.data.user._id;
        component.setState({current_user_id: target_id});
        
        if( target_id !== JSON.parse(localStorage.rocket_chat_user).user_id){
          roomId = target_id + JSON.parse(localStorage.rocket_chat_user).user_id;
          ddp.loadHistory(roomId,function( issuccess, result){
            if(issuccess){
              component.fetchMsg(result,false);
              ddp.streamRoomMessages(roomId, function(id,msg){
                subscribeId = id;
                component.handleIncomingMess(msg);
              });
            }else{
              roomId = JSON.parse(localStorage.rocket_chat_user).user_id + target_id;
              ddp.loadHistory(roomId,function( issuccess, result){
                if(issuccess){
                  component.fetchMsg(result,false);      
                  ddp.streamRoomMessages(roomId, function(id,msg){
                    subscribeId = id;
                    component.handleIncomingMess(msg);
                  });      
                }else{
                  im.create(currentUserName, function(response){
                    if(response.status === 200){
                      roomId = response.data.room._id;
                      ddp.streamRoomMessages(roomId, function(id,msg){
                        subscribeId = id;
                        component.handleIncomingMess(msg);
                      });
                    }
                  })                
                }
              });
            }
          });
        }
        else{
          group.info(null, JSON.parse(localStorage.rocket_chat_user).user_id,function(response){
            roomId = response.data.group._id;
            ddp.loadHistory(roomId,function( issuccess, result){
              if(issuccess){
                component.fetchMsg(result,false);
                ddp.streamRoomMessages(roomId, function(id,msg){
                  subscribeId = id;
                  component.handleIncomingMess(msg);
                });
              }
            })
          })
        }
      }
    }); 
  }

  componentWillUnmount() {
    ddp.close();
  }

  componentDidMount() {

    var component = this;
    var fileButton = document.getElementById('fileButton');

    fileButton.addEventListener('change', function(e){
      e.preventDefault();
      var file = e.target.files[0];
      // store file data on firebase storage and set a reference on firebase realtime database

      var storageRef = firebase.storage().ref('room_files/'+roomId+'/'+component.state.current_user_id+'/'+ file.name);

      var task =  storageRef.put(file);

      task.on('state_changed', 
        function(snapshot){
       
        }
        , function(error) {

        }, function() {     
        let downloadURL = task.snapshot.downloadURL;
        let content = "<title>" + file.name + "</title>" + "<link>" + downloadURL + "</link>";
        ddp.sendMessage(roomId, content, function(){
          
        });
        var metadata = task.snapshot.metadata;
        var name = metadata.name;
        var size = metadata.size;
        var ts = metadata.generation;
        var refUri = "";

        if(metadata.contentType.includes("image")){
          refUri = firebase.database().ref().child('room_images').child(roomId);
          // 'room_images/' + roomId+'/'+ts;
        }else{
          refUri = firebase.database().ref().child('room_files').child(roomId);
          
          // refUri = 'room_files/' + roomId + '/' + ts;
        }
        refUri.push().set({
          name: name,
          downloadURL: downloadURL,
          size: size,
          ts: ts
        });
        // firebase.database().ref('room_files/'+roomId).set({

        // })
      });
    })
    
    document.getElementsByClassName('chats')[0].addEventListener('scroll',
      function(){
        if(this.scrollTop === 0){
          if(component.state.messages[0]){
            if(component.state.current_user_id === JSON.parse(localStorage.rocket_chat_user).user_id ){
              group.history(roomId,component.state.messages[0].ts_ISO,15,function(response){
                component.fetchMsg(response.data,true);
              });
            } else{
              im.history(roomId,component.state.messages[0].ts_ISO,15,function(response){
                component.fetchMsg(response.data,true);
              });
            }   
          }
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

    ddp.sendMessage(roomId, content, function(){

    });
    // ddp.uploadRequest('photo.png',15664,'image/png', roomId, function(){});
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
        <ChatSetting currentChatUserName={this.state.current_user_name}
          currentChatUserType={this.state.current_user_type}
          currentRoomId={roomId}/>
      </div>
    )
  }
}

export default Chat;
