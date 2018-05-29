import React, { Component } from 'react';
import ChatBubble from 'react-chat-bubble';
import $ from 'jquery';
import { Picker } from 'emoji-mart';
import firebase from 'firebase';
import { Scrollbars } from 'react-custom-scrollbars';

import VideoCall from './videocall'
import ChatSetting from './chatsetting';

import * as constant from '../constants';
import * as Messages from '../../lib/messages/messages';
import * as translate from 'counterpart';
import { upFile, updateRoom } from '../../lib/room/rooms';

import '../../assets/styles/common/chatWindow.css';
import '../../assets/styles/common/emoji-mart.css';

class ChatContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentRoomId: null,
      targetUser: null,
      currentUser: null,
      showDialog: false,
      chatContentHeight: 0,
      chatSettingHeight: 0,
      talking: true
    };
    this.peer = null;
  }   

  componentWillMount() { 
    this.peer = this.props.peer;
    this.setState({targetUser: this.props.targetUser,
      currentUser: this.props.currentUser});
  }

  componentWillReceiveProps(nextProps){
    if(this.state.targetUser !== nextProps.targetUser && !!nextProps.targetUser){
      this.setState({targetUser: nextProps.targetUser})
    }
    if(this.state.currentUser !== nextProps.currentUser && !!nextProps.currentUser){
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
      Messages.history(properties, function(){
        var mess_ct = component.state.messages.length;
        if (component.state.messages[mess_ct - 1].contentType === 'close_room') {
          component.setState({talking: false});
        }
        component.refs.scrollbars.scrollToBottom();
      });
      Messages.streamingMessage(properties, () => {
      });
    
      var fileButton = document.getElementById('upfile');
      fileButton.addEventListener('change', function(e){
        e.preventDefault();
        upFile(component, nextState.currentRoomId, e, Messages.chat);
      });
    }
  }
  
  componentDidMount() {   
    var component = this;
    this.setState({
      currentRoomId: this.props.currentRoomId
    });

    $(document).mouseup(function(e) {
      var container = $('.emoji-section');
      var emojiPicker = $('#emoji-picker')
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        emojiPicker.css('visibility', 'hidden');
      }
    });

    $('.' + 'item_' + this.state.targetUser.id).mouseenter(function(e){
      e.preventDefault();
      component.deleteMessUnreadNumber();
    });

    $('.' + 'item_' + this.state.targetUser.id).mousemove(function(e){
      e.preventDefault();
      component.deleteMessUnreadNumber();
    });

    this.setHeight(this);
    $(window).resize(function() {
      component.setHeight(component);
    });
    this.props.emitter.addListener('close_room', () => {
      var propertiesRoom = {
        opening: false,
        roomId: component.state.currentRoomId
      };
      updateRoom(propertiesRoom, (success, response) => {
        if (success) {
          component.setState({talking: false});
          component.toastCloseRoom(component);
        }
        else {
          component.toastError(component);
        }
      });
    });
    this.props.emitter.addListener('open_room', () => {
      component.setState({talking: true});
    });
  }

  toastCloseRoom(component) {
    component.props.emitter.emit('AddNewSuccessToast',
    '', translate('app.system_notice.success.text.end_talking'),
    5000, ()=>{});
  }

  toastError(component) {
    component.props.emitter.emit('AddNewErrorToast',
    translate('app.system_notice.error.title'),
    translate('app.system_notice.error.text.some_thing_not_work'),
    5000, ()=>{});
  }

  setHeight(component) {
    var vh = Math.max(document.documentElement.clientHeight,
      window.innerHeight || 0);
    var chatContentHeight = vh - 55 - $('#text-box').height();
    component.setState({chatContentHeight: chatContentHeight});
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
    var vh = Math.max(document.documentElement.clientHeight,
      window.innerHeight || 0);

    input.style.height = '45px';
    var contentHeight = document.getElementById(elementId).scrollHeight;
    input.style.height = contentHeight + 'px';

    var textbox = document.getElementById('text-box');
    textbox.style.height = contentHeight + 2 + 'px';
    this.setState({chatContentHeight: vh - 55 - contentHeight});
  }

  clearContent(elementId) {
    $('#' + elementId).val($('#' + elementId).val().replace(/\t/g, 'a'));
    $('#' + elementId).val('');
    this.autoExpand(elementId);
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
      this.refs.scrollbars.scrollToBottom();
    }
  }

  handleSubmit(){
    var component = this;
    let properties = {}
    var textSubmit = $('#input-mess-box').val();
    if (textSubmit.replace(/\s/g, '').length !== 0) {
      properties['content'] = textSubmit; 
      properties['component'] = component;
      Messages.chat(properties, function(){
      });
    }
  }

  upfile() {
    $('#upfile:hidden').trigger('click');
  }

  onClickEmoji(emoji,event){
    var inputTextArea = $('#input-mess-box');
    inputTextArea.val(inputTextArea.val() + ' ' + emoji.colons + ' ');
  }

  handleScroll(event) {
    if(this.refs.scrollbars.getScrollTop() === 0) {
      let properties = {};
      if(this.state.messages[0]){
        properties['roomId'] = this.state.currentRoomId;
        properties['component'] = this;
        properties['limit'] = 15;
        properties['ts'] = '' + (parseInt(
          this.state.messages[0].msgTimeStamp) - 1);          
        Messages.history(properties, function(){
        });
      }
    }
  }

  finishSession() {
    var mess_properties = {
      contentType: 'close_room',
      component: this
    }
    Messages.chat(mess_properties, () => {

    });
  }

  render() {
    return(  
      <div className={'chat-window ' + 'item_' +
        this.state.targetUser.id} id='chat-window' >
        <VideoCall
          talking={this.state.talking}
          finishSession={this.finishSession.bind(this)}
          currentUser={this.props.currentUser}
          targetUser={this.props.targetUser}
          currentRoomId={this.state.currentRoomId}
          emitter={this.props.emitter}/>
        <div className='chat-body'>
          <Scrollbars style={{
            height: this.state.chatContentHeight}}
            autoHide={true}
            autoHideTimeout={1500}
            hideTracksWhenNotNeeded={true}
            ref='scrollbars'
            thumbSize={100}
            onScroll={this.handleScroll.bind(this)}
            renderView={
              props =>
              <div {...props} className='custom-content'/>
            }>
              <ChatBubble messages={this.state.messages}
                targetUser={this.state.targetUser}
                currentUser={this.state.currentUser}
                base_url={constant.API_BASE_URL} />
          </Scrollbars>
          {
            this.state.talking ?
            (
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
            )
            :
            (
              ''
            )
          }
        </div>
        <ChatSetting
          currentRoomId={this.props.currentRoomId}
          currentUser={this.props.currentUser}
          targetUser={this.props.targetUser}
          emitter={this.props.emitter}/> 
      </div>
    )
  }
}

export default ChatContent;
