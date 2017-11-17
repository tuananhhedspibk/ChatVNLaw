import React, {Component} from 'react';
import ChatBubble from 'react-chat-bubble';
import $ from 'jquery';
import {Picker} from 'emoji-mart';
import firebase from 'firebase';

import * as RoomInfo from '../../../../lib/room/getroominfo';
import * as Messages from '../../../../lib/messages/messages';
import * as translate from 'counterpart';
import * as videoCall from '../../../../lib/streaming/videocall';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentRoomId: null,
      currentUser: null,
      targetUser: null
    };
  }  
  componentWillMount(){
    var component = this;
    this.setState({currentUser: this.props.currentUser, targetUser: this.props.targetUser});
    this.props.emitter.addListener('ReSendData',function(callback){
      return callback(component.state.currentUser, component.state.targetUser, component.state.currentRoomId);
    });
    this.props.emitter.addListener('AddNewTag', function(mess){
      component.updateTag(mess);
    })
    this.props.emitter.addListener('RemoveTag', function(mess){
      component.updateTag(mess);
    })
  }
  updateTag(mess){
    let properties = {}
    properties.component = this;
    properties.mess = mess;
    Messages.updateTag(properties);
  }

  componentDidMount() {
    $(document).mouseup(function(e) {
      var container = $('.emoji-section');
      var emojiPicker = $('#emoji-picker')
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        emojiPicker.css('visibility', 'hidden');
      }
    });
  }
  
  componentWillReceiveProps(nextProps){
    var component = this;
    if(this.state.targetUser !== nextProps.targetUser && !!nextProps.targetUser){
      this.setState({targetUser: nextProps.targetUser,currentRoomId: nextProps.targetUser.rid});
      if(!!this.state.targetUser){
        if(this.state.targetUser.rid !== nextProps.targetUser.rid){
          this.setState({messages: []})
        }
      }
    }
    if(this.state.currentUser !== nextProps.currentUser && !!nextProps.currentUser){
      this.setState({currentUser: nextProps.currentUser});
    }
    
    // if(!!nextProps.targetUser && ((!this.state.targetUser) || (this.state.targetUser.uid !== nextProps.targetUser.uid))){
    //   let properties = {}
    //   this.setState({messages :[]})
    //   properties['roomId'] = nextProps.currentUser.uid + nextProps.targetUser.uid;
    //   properties['component'] = component;
    //   properties['currentUser'] = nextProps.currentUser;
    //   properties['targetUser'] = nextProps.targetUser;
    //   RoomInfo.getRoomId(properties, roomId =>{
    //     component.props.emitter.emit('RoomChatHasChanged',nextProps.currentUser, nextProps.targetUser, roomId);   
    //     component.setState({currentRoomId: roomId});             
    //   })
    // }
  }

  componentWillUpdate(nextProps, nextState){
    var component = this;
    if(this.state.currentRoomId !== nextState.currentRoomId){
      let properties = {}
      properties['roomId'] = nextState.currentRoomId;
      component.props.emitter.emit('RoomChatHasChanged',nextProps.currentUser, nextProps.targetUser, nextState.currentRoomId);         
      properties['component'] = component;
      properties['ts'] = '' + (new Date()).getTime();
      properties['limit'] = 15;

      Messages.closeStreamRef();
      Messages.history(properties, function(){
        component.autoScrollBottom();        
      });
      Messages.streamingMessage(properties,function(){
        component.autoScrollBottom();        
      })
      
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

  autoExpand(elementId) {
    var input = document.getElementById(elementId);
    var chats = document.getElementsByClassName('chats')[0];
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    input.style.height = '60px';
    var contentHeight = document.getElementById(elementId).scrollHeight;
    input.style.height = contentHeight - 8 + 'px';

    var textbox = document.getElementById('text-box');
    textbox.style.height = contentHeight - 5 + 'px';
    chats.style.height = vh - 101 - contentHeight + 'px';
  }

  autoScrollBottom() {
    $('.chats').stop().animate({
      scrollTop: $('.chats')[0].scrollHeight}, 1000);
  }

  clearContent(elementId) {
    $('#' + elementId).val($('#' + elementId).val().replace(/\t/g, 'a'));
    $('#' + elementId).val('');
    this.autoExpand(elementId);
    this.autoScrollBottom();    
  }

  handleSubmit(){
    if(!this.state.currentRoomId){
      return;
    }
    var component = this;
    let properties = {};
    var textSubmit = $('#input-mess-box').val();
    if (textSubmit.replace(/\s/g, '').length !== 0) {
      properties['content'] = textSubmit; 
      properties['component'] = component;
      Messages.chat(properties);
    }
  }

  endCall(){
    $('.video-call').hide();
    let ref = firebase.database()
      .ref(`rooms/${this.state.currentRoomId}/video_call/end`).push()
    ref.set({
      end: true
    })
    ref.remove();
  }

  makeCallRequest(){
    this.renderVideo();
    let properties = {};
    properties['rid'] = this.state.currentRoomId;
    properties['uid'] = this.state.currentUser.uid;
    videoCall.checkRequest(properties, function(issuccess){
      if(issuccess){
        alert('already been used');
      }else{
        videoCall.createRequest(properties,function(issuccess){
          
        });
      }
    });
  }

  upfile() {
    $('#upfile:hidden').trigger('click');
  }

  renderEmojiPicker(e){
    if ($('#emoji-picker').css('visibility') === 'hidden') {
      $('#emoji-picker').css('visibility', 'visible');
    }
    else {
      $('#emoji-picker').css('visibility', 'hidden');
    }
  }

  renderVideo() {
    $('.video-call').show();
    if($('.video-call').find('.video').css('display') == 'none') {
      $('.video-call').find('.video').show();
      $('.video-call').find('.end-call-btn').show();
    }
  }

  render() {
    if(this.state.currentRoomId){
      return(
        <div>
          <div className='video-call'>
            <video className='video'
              id='localStream' autoPlay></video>
              <button onClick={this.endCall.bind(this)}
                className='end-call-btn'>
                  <i className='fa fa-phone'
                    aria-hidden='true'></i>
              </button>
          </div>
          <div className='header'>
            {this.state.targetUser ?
              translate('app.dashboard.chat_title') + ' '
                + this.state.targetUser.displayName :
                translate('app.dashboard.chat_title')}
            <i onClick={this.makeCallRequest.bind(this)}
              className='fa fa-video-camera'
              aria-hidden='true'></i>
            <i className='fa fa-phone'
              aria-hidden='true'></i>
          </div>
          <div className='chat-box'>
            <ChatBubble messages={this.state.messages} 
              emitter={this.props.emitter}
              renderHastag={true}
              currentUser={this.state.currentUser}
              targetUser={this.state.targetUser}/>
            <div className='input-section text-box' id='text-box'>  
              <textarea id='input-mess-box'
                placeholder={translate('app.chat.input_place_holder')}
                onKeyDown={this.handleInputChange.bind(this)} />
              <input type='file' id='upfile'/>
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
                  <i className='fa fa-file-image-o'
                    aria-hidden='true'
                    onClick={this.upfile}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      return(
        <div className='chat-box'>
        </div>
      )
    }
    
  }
}

export default ChatBox;
