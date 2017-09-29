import React, { Component } from 'react';
import ChatBubble from 'react-chat-bubble';
import { Form } from 'semantic-ui-react';
import $ from 'jquery';

import ChatSetting from '../chat/chatsetting';

import * as constant from '../constants';

import '../../assets/styles/common/chatwindow.css';

let translate = require('counterpart');
let FontAwesome = require('react-fontawesome');
var firebase = require('firebase');
var currentUser;
var messRef;
class Chat extends Component {
constructor(props) {
  super(props);
  this.state = {
    messages: [],
    chat_target_uname: '',
    chat_target_uid: '',
    chat_target_type: '',
    current_room_id: ''
  }
}
componentDidMount(){
  var component = this;
  var fileButton = document.getElementById('fileButton');
  fileButton.addEventListener('change', function(e){
    e.preventDefault();
    var file = e.target.files[0];
    // store file data on firebase storage and set a reference on firebase realtime database

    var storageRef = firebase.storage().ref('room_files/'+component.state.current_room_id+'/'+currentUser.uid+'/'+ file.name);

    var task =  storageRef.put(file);

    task.on('state_changed', 
      function(snapshot){
      
      }
      , function(error) {

      }, function() {     
      let downloadURL = task.snapshot.downloadURL;
      // let content = "<title>" + file.name + "</title>" + "<link>" + downloadURL + "</link>";
      var metadata = task.snapshot.metadata;
      var name = metadata.name;
      var size = metadata.size;
      var ts = metadata.generation;
      var refUri = "";

      if(metadata.contentType.includes("image")){
        refUri = firebase.database().ref().child('rooms').child(component.state.current_room_id).child('room_images');
        // 'room_images/' + roomId+'/'+ts;
      }else{
        refUri = firebase.database().ref().child('rooms').child(component.state.current_room_id).child('room_files');
        
        // refUri = 'room_files/' + roomId + '/' + ts;
      }
      refUri.push().set({
        name: name,
        downloadURL: downloadURL,
        size: size,
        ts: ts,
        sender_uid: currentUser.uid
      });
      // firebase.database().ref('room_files/'+roomId).set({

      // })
    });
  })
  
}
componentWillReceiveProps(nextProps) {
  var component = this;  
  if(component.state.chat_target_uname !== nextProps.currentChatUserName && component.state.chat_target_uid !== nextProps.currentChatUserId){
    component.setState({chat_target_uname: nextProps.currentChatUserName});
    component.setState({chat_target_uid: nextProps.currentChatUserId});
    currentUser = firebase.auth().currentUser;
    var roomid = currentUser.uid + nextProps.currentChatUserId;
    firebase.database().ref().child('reference').child(roomid).once('value').then(function(snapshot){
      if(snapshot.exists()){
        // get real roomId
        snapshot.forEach(function(element){
          component.setState({current_room_id: element.val()});
        })
        component.loadHistory();
      }else{
        // create new room chat
        let ref = firebase.database().ref().child('rooms');
        let newPostRef = ref.push()
        newPostRef.set({
          "members":[currentUser.uid,nextProps.currentChatUserId,currentUser.uid+'_'+nextProps.currentChatUserId],
          "messages":[]
        })
        ref.child(newPostRef.key).on('child_added',function(data){   
          if(data.exists()){
            let roomId = newPostRef.key;
            component.setState({current_room_id: roomId});
            firebase.database().ref().child('reference').child(currentUser.uid + nextProps.currentChatUserId).set({
              roomId
            }).then(function(){
              
            }).catch(function(error){
              
            });
            firebase.database().ref().child('reference').child(nextProps.currentChatUserId+currentUser.uid).set({
              roomId
            }).then(function(){
              
            }).catch(function(error){
              
            });
            component.loadHistory();
          }             
        })
        

      }
    });
    // ref.on('child_added',function(data){
    //   console.log(data);
    // })
  }
}

loadHistory(){
  var component = this;
  if ( typeof messRef !== 'undefined' && messRef){
    console.log("off");
    messRef.off();
  }
  var messArr = []
  component.setState({messages: []})
  messRef = firebase.database().ref().child('rooms').child(component.state.current_room_id).child('messages');
  messRef.on('child_added',function(snapshot){
    if(snapshot.exists()){
      console.log(snapshot);
      let item = {};
      snapshot.forEach(function(element){
        let key = element.key;
        let value = element.val();
        item[key] = value;
      })
      if(item["sender_uid"] === currentUser.uid){
        item["type"] = 0;
        item["image"] = constant.avaUser;
      }else{
        item["type"] = 1;
        item["image"] = constant.avaLawyer;
      }
      messArr.push(item);
      component.setState({messages: messArr})
      component.autoScrollBottom();
    }
  })
  messRef.on('child_changed', function(snapshot){
    console.log("child_changed");
    if(snapshot.exists()){
      console.log(snapshot);
    }
  })
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
handleSubmit(){
  var component = this;
  var content = document.getElementById('input-mess-box').value;  
  var date = new Date();  
  var ts  = ""+date.getTime();
  firebase.database().ref().child('rooms').child(component.state.current_room_id).child('messages').push().set({
    "text": content,
    "sender_uid": currentUser.uid,
    "msg_ts": ts
  });
}
autoScrollBottom() {
  $('.chats').stop().animate({
    scrollTop: $('.chats')[0].scrollHeight}, 1000);
}

render() {
  return(
    <div className='chat-window' id='chat-window'>
      <div className='title'>
        <div className='user-name'>
          {this.state.chat_target_uname}
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
      <ChatSetting targetChatUserName={this.state.chat_target_uname}
        targetChatUserType={this.state.chat_target_type}
        currentRoomId={this.state.current_room_id}
        targetChatUserId={this.state.chat_target_uid}/>
    </div>
  )
}
}

export default Chat;
