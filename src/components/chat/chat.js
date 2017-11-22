import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChatBubble from 'react-chat-bubble';
import $ from 'jquery';
import {Picker} from 'emoji-mart';
import AlertContainer from 'react-alert';
import firebase from 'firebase';

import ChatSetting from './chatsetting';

import * as RoomInfo from '../../lib/room/getroominfo';
import * as Files from '../../lib/upfile/files';
import * as constant from '../constants';
import * as Messages from '../../lib/messages/messages';
import * as translate from 'counterpart';
import * as videoCall from '../../lib/streaming/videocall';

import '../../assets/styles/common/chatWindow.css';
import '../../assets/styles/common/emoji-mart.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentRoomId: '',
      targetUser: null,
      currentUser: null
    };
    this.peer=null;
  }

  componentWillMount() { 
    this.peer = this.props.peer;
    console.log(this.props.peer);
    this.setState({targetUser: this.props.targetUser,
      currentUser: this.props.currentUser});
  }

  componentWillReceiveProps(nextProps){
    var component = this;
    if(this.state.targetUser !== nextProps.targetUser && !!nextProps.targetUser){
      this.setState({targetUser: nextProps.targetUser})
    }
    if(this.state.currentUser !== nextProps.currentUser && !! nextProps.currentUser){
      this.setState({currentUser: nextProps.currentUser})
    }
  }

  componentWillUpdate(nextProps, nextState){
    if(this.state.currentRoomId !== nextState.currentRoomId){
      let properties = {};
      let component = this;
      properties['roomId'] = nextState.currentRoomId;
      properties['component'] = this;
      properties['ts'] = '' + (new Date()).getTime();
      properties['limit'] = 15;
      properties['peer'] = nextProps.peer;
      Messages.history(properties, function(){
        component.autoScrollBottom();
      });
      Messages.streamingMessage(properties, function(){
        component.autoScrollBottom();        
      })
    
      videoCall.closeRef();
      videoCall.closeStream();
      videoCall.listenFromVideoCall(properties, () =>{})
      var fileButton = document.getElementById('upfile');
      fileButton.addEventListener('change', function(e){
        e.preventDefault();
        let file = e.target.files[0];
        properties["roomId"] = nextState.currentRoomId;
        Files.upfile(properties,file,function(){
        });
      });
      document.getElementsByClassName('chats')[0].addEventListener('scroll',
      function(){
        if(this.scrollTop === 0){
          if(component.state.messages[0]){
            properties['ts'] = parseInt(component.state.messages[0].msgTimeStamp) - 1;            
            Messages.history(properties, function(){
            
            })
          }
        }
      }
    );
    }
  }
  
  componentDidMount() {   
    var component = this;
    this.setState({currentRoomId: this.props.targetUser.rid})

    $(document).mouseup(function(e) {
      var container = $('.emoji-section');
      var emojiPicker = $('#emoji-picker')
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        emojiPicker.css('visibility', 'hidden');
      }
    });

    $('.' + 'item_' + this.state.targetUser.uid).mouseenter(function(e){
      e.preventDefault();
      component.deleteMessUnreadNumber();
    });

    $('.' + 'item_' + this.state.targetUser.uid).mousemove(function(e){
      e.preventDefault();
      component.deleteMessUnreadNumber();
    });
  }

  deleteMessUnreadNumber() {
    var component = this;
    if(component.state.currentRoomId){
      let ref =firebase.database().ref().child('rooms')
        .child(component.state.currentRoomId).child('unread');
      ref.once('value').then(function(data){
        if(data.exists()){
          if(data.val().count > 0 && data.val().lastMess.receiver_uid
            === component.state.currentUser.uid){
              ref.update({
                count: 0
              })
          }
        }
      })
    }
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
  }

  clearContent(elementId) {
    $('#' + elementId).val($('#' + elementId).val().replace(/\t/g, 'a'));
    $('#' + elementId).val('');
    this.autoExpand(elementId);
    this.autoScrollBottom();    
  }

  renderEmojiPicker(e){
    if ($('#emoji-picker').css('visibility') === 'hidden') {
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
    let properties = {}
    var textSubmit = $('#input-mess-box').val();
    if (textSubmit.replace(/\s/g, '').length !== 0) {
      properties["content"] = textSubmit; 
      properties["component"] = component;
      Messages.chat(properties,function(){

      });
    }
  }

  autoScrollBottom() {
    $('.chats').stop().animate({
      scrollTop: $('.chats')[0].scrollHeight}, 1000);
  }

  upfile() {
    $('#upfile:hidden').trigger('click');
  }

  onClickEmoji(emoji,event){
    var inputTextArea = $('#input-mess-box');
    inputTextArea.val(inputTextArea.val() + ' ' + emoji.colons + ' ');
  }

  endCall(){
    // $('.video-call').hide();
    var properties = {}
    properties['rid'] = this.state.currentRoomId;
    videoCall.endCall(properties, ()=>{

    })
  }

  makeCallRequest(){
    let properties = {};
    var component = this;
    properties['rid'] = this.state.currentRoomId;
    properties['uid'] = this.state.currentUser.uid;
    videoCall.checkRequest(properties, function(issuccess){
      if(issuccess){
        alert('already been used');
      }else{
        videoCall.createRequest(properties,function(issuccess){
          if(issuccess){
            component.renderVideo();
          }
        });
      }
    });
  }

  renderVideo() {
    $('.video-call').show();
  }

  renderConfigVideoCall(){
    if(!!this.state.currentUser &&
      !!this.state.targetUser &&
      this.state.currentUser.uid !== this.state.targetUser.uid){
      return (
        <div className='call-section'>
          <i onClick={this.makeCallRequest.bind(this)}
            className='fa fa-video-camera'
            aria-hidden='true'></i>
          <i className='fa fa-phone'
            aria-hidden='true'></i>
        </div>
      )
    }
  } 
  showAlert = (text) => {
    this.msg.show(text, {
      time: 5000,
      type: 'success',
      icon: <img alt='warning' src={constant.warningPic} />
    })
  }
  render() {
    return(
      <div className={'chat-window ' + 'item_'+this.state.targetUser.uid} id='chat-window' >
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS}/>        
        <div className='video-call'>
          <video className='video'
            id='localStream' autoPlay></video>
            <button onClick={this.endCall.bind(this)}
              className='end-call-btn'>
                <i className='fa fa-phone'
                  aria-hidden='true'></i>
            </button>
        </div>
        <div className='title'>
          <div className={'user-name'}>
            {this.state.targetUser.displayName}
          </div>
          {this.renderConfigVideoCall()}
        </div>
        <div className='chat-body'>
          <ChatBubble messages={this.state.messages}
            targetUser={this.state.targetUser}
            currentUser={this.state.currentUser} />
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
                <i className='fa fa-smile-o'
                  aria-hidden='true'
                  onClick={this.renderEmojiPicker}></i>
              </div>
              <i className='fa fa-file-image-o'
                aria-hidden='true'
                onClick={this.upfile}></i>
            </div>
          </div>
        </div>
        <ChatSetting 
          currentRoomId={this.state.currentRoomId}
          currentUser={this.props.currentUser}
          targetUser={this.props.targetUser}/> 
      </div>
    )
  }
}

export default Chat;
