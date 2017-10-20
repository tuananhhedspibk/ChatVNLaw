import React, { Component } from 'react';
import ChatBubble from 'react-chat-bubble';
import { Form } from 'semantic-ui-react';
import $ from 'jquery';
import ChatSetting from '../chat/chatsetting';
import * as constant from '../constants';
import '../../assets/styles/common/chatwindow.css';
import '../../assets/styles/common/emoji-mart.css';

import * as fileHelper from '../../lib/helper/upfile_helper';
import * as im from '../../lib/helper/messages';
import {Picker} from 'emoji-mart'
import {Emoji} from 'emoji-mart'

let translate = require('counterpart');
let FontAwesome = require('react-fontawesome');
var firebase = require('firebase');
var currentUser;
var targetUser;
var messRef;
var currentRoomId;
var peer;
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      current_room_id: ''
    }
  }

  componentDidMount() {
    var component = this;
    var fileButton = document.getElementById('upfile');
    fileButton.addEventListener('change', function(e){
      e.preventDefault();
      let file = e.target.files[0];
      // store file data on firebase storage and set a reference on firebase realtime database
      let properties = {}
      if(component.state.current_room_id){
        properties["roomId"] = component.state.current_room_id;
        properties["uid"] = currentUser.uid;
        properties["photoURL"] = currentUser.photoURL;
        fileHelper.upfile(properties,file,function(){
        });
      }
    });

    $(document).mouseup(function(e) {
      var container = $('.emoji-section');
      var emojiPicker = $('#emoji-picker')
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        emojiPicker.css('visibility', 'hidden');
      }
    });

    document.getElementsByClassName('chats')[0].addEventListener('scroll',
      function(){
        if(this.scrollTop === 0){
          if(component.state.messages[0]){
            let ts = parseInt(component.state.messages[0].msg_ts) - 1;
            component.loadHistory(''+ts,false);
          }
        }
      }
    );
    $('.' + 'item_' + component.props.targetChatUser.uid).mouseenter(function(e){
      e.preventDefault();
      component.deleteMessUnreadNumber();
    });
    $('.' + 'item_' + component.props.targetChatUser.uid).mousemove(function(e){
      e.preventDefault();
      component.deleteMessUnreadNumber();
    });
  }

  deleteMessUnreadNumber() {
    var component = this;
    if(component.state.current_room_id){
      let ref =firebase.database().ref().child('rooms')
        .child(component.state.current_room_id).child('unread');
      ref.once('value').then(function(data){
        if(data.exists()){
          if(data.val().count > 0 && data.val().lastMess.receiver_uid === currentUser.uid){
            ref.update({
              count: 0
            })
          }
        }
      })
    }
  }
  componentWillReceiveProps(nextProps){
    if(targetUser !== nextProps.targetChatUser){
      targetUser = nextProps.targetChatUser;
      $('.me').attr('src',targetUser.photoURL)
      $('.you').attr('src',currentUser.photoURL);
    }
  }
  componentWillMount() {    
    var component = this;
    currentUser = component.props.currentUser;
    targetUser = component.props.targetChatUser;
    
    peer = component.props.currentPeer;
    if(!(!!peer)){
      window.location = constant.BASE_URL+ '/chat/' + targetUser.username
    }
    component.setState({messages: []})
    
    var roomid = currentUser.uid + targetUser.uid;
    firebase.database().ref(`reference/${roomid}`)
      .once('value').then(function(snapshot){
      if(snapshot.exists()){
        // get real roomId
        snapshot.forEach(function(element){
          component.setState({current_room_id: element.val()});
          component.forceUpdate()
        })
        component.streamingMessages();
        component.loadHistory('' + (new Date()).getTime, true);
      }
      else{
        // create new room chat
        let ref = firebase.database().ref('rooms');
        let newPostRef = ref.push()
        let count = 0;
        if(currentUser.uid === targetUser.uid){
          count = -1;
        }
        newPostRef.set({
          'members':[currentUser.uid, targetUser.uid],
          'messages':[],
          'unread': {
            'count' : count
          }
        })
        component.setState({current_room_id: newPostRef.key});
        component.forceUpdate()
        
        component.streamingMessages();
        component.loadHistory('' + (new Date()).getTime, true)
      }
    });
    // }
  }

  loadHistory(timestamp, autoScroll){
    let properties = {};
    var component = this;
    properties['ts'] = timestamp;
    properties['rid'] = this.state.current_room_id;
    properties['uid'] = currentUser.uid;
    properties['currentUser'] = currentUser;
    properties['targetUser'] = targetUser;
    let currentMessArr = this.state.messages;
    im.history(properties,15,function(item, index){
      if(item["sender_uid"] === currentUser.uid){
        item["type"] = 0;
        item["image"] = currentUser.photoURL;
      }else{
        item["type"] = 1;
        item["image"] = targetUser.photoURL;
      }
      currentMessArr.splice(index, 0, item);
      component.setState({messages: currentMessArr});
      if(autoScroll){
        component.autoScrollBottom();      
      }
    });
  
  }

  streamingMessages(){
    var component = this;
    if ( typeof messRef !== 'undefined' && messRef){
      messRef.off();
    }
    var messArr = component.state.messages;
    let properties = {}
    properties['rid'] = component.state.current_room_id;
    properties['uid'] = currentUser.uid;
    properties['ts'] = '' + (new Date()).getTime();
    im.notifyMessagesComming(properties,function(event, item, ref){
      if(event === 'child_added'){

        if(item["sender_uid"] === currentUser.uid){
          item["type"] = 0;
          item["image"] = currentUser.photoURL;
        }else{
          item["type"] = 1;
          item["image"] = targetUser.photoURL;
        }

        messArr.push(item);
        component.setState({messages: messArr});
        component.autoScrollBottom();
        messRef = ref;
        if ($('.item_' + component.props.targetChatUser.uid).css('display') != 'none') {
          component.deleteMessUnreadNumber();
        }
      }
    })
  }

  autoExpand(elementId) {
    var input = document.getElementById(elementId);
    var chats = document.getElementsByClassName('chats')[0];
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    input.style.height = '45px';
    var contentHeight = document.getElementById(elementId).scrollHeight;
    input.style.height = contentHeight + 'px';

    var textbox = document.getElementById('text-box');
    textbox.style.height = contentHeight + 2 + 'px';
    chats.style.height = vh - 55 - contentHeight + 'px';
    this.autoScrollBottom();
  }

  clearContent(elementId) {
    $('#' + elementId).val($('#' + elementId).val().replace(/\t/g, 'a'));
    $('#' + elementId).val('');
    this.autoExpand(elementId);
  }

  renderEmojiPicker(e){
    if ($('#emoji-picker').css('visibility') == 'hidden') {
      $('#emoji-picker').css('visibility', 'visible');
    }
    else {
      $('#emoji-picker').css('visibility', 'hidden');
    }
  }

  handleInputChange(evt) {
    let textBox = $('#input-mess-box');

    if (evt.which === 13 && evt.shiftKey === false) {
      if(textBox.val().length > 0){
        this.handleSubmit();
        evt.preventDefault();
      }
      this.clearContent('input-mess-box');
    }
    else {
      this.autoExpand('input-mess-box');
    }
  }

  handleSubmit(){
    var component = this;
    var date = new Date();  
    let properties = {}
    properties["rid"] = component.state.current_room_id;
    properties["content"] = document.getElementById('input-mess-box').value;  
    properties["uid"] = currentUser.uid;
    properties["ts"] = '' + date.getTime();
    properties["photoURL"] = currentUser.photoURL ||'';
    im.chat(properties,function(){

    });
  }

  autoScrollBottom() {
    $('.chats').stop().animate({
      scrollTop: $('.chats')[0].scrollHeight}, 1000);
  }

  upfile() {
    console.log($('#upfile:hidden'))
    $('#upfile:hidden').trigger('click');
  }

  onClickEmoji(emoji,event){
    var inputTextArea = $('#input-mess-box');
    inputTextArea.val(inputTextArea.val() + " " + emoji.colons + " ");
  }

  render() {
    return(
      <div className={'chat-window ' + 'item_'+targetUser.uid} id='chat-window' >
        <div className='title'>
          <div className={'user-name'}>
            {currentUser.uid === targetUser.uid ? currentUser.displayName : targetUser.displayName}
          </div>
          <FontAwesome name='video-camera'/>
          <FontAwesome name='phone'/>
        </div>
        <div className='chat-body'>
          <ChatBubble messages={this.state.messages} />
          <div className='text-box' id='text-box'>
            <input type='file' id='upfile'/>
            <textarea id='input-mess-box'
              placeholder={translate('app.chat.input_place_holder')}
              onKeyDown={this.handleInputChange.bind(this)} />
            <div className='addons-field'>
              <div className='emoji-section'>
                <div id='emoji-picker'>
                  <Picker
                    onClick={this.onClickEmoji}
                    emojiSize={24} 
                    perLine={9}    
                    skin={1}       
                    set='messenger'                
                    showPreview={false}
                    autoFocus={true}
                  />
                </div>
                <FontAwesome onClick={this.renderEmojiPicker}
                  name='smile-o' id='btn-show-emoji'/>
              </div>
              <FontAwesome onClick={this.upfile} name='file-image-o'/>
            </div>
          </div>
        </div>
        <ChatSetting 
          currentRoomId={this.state.current_room_id}
          currentUser={currentUser}
          targetChatUser={targetUser}
          currentPeer={peer}/>
      </div>
    )
  }
}

export default Chat;
