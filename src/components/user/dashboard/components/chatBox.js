import React, {Component} from 'react';
import ChatBubble from 'react-chat-bubble';
import * as Translate from 'counterpart';
import $ from 'jquery';

import * as RoomInfo from '../../../../lib/helper/room/get_room_info';
import * as Messages from '../../../../lib/helper/messages/messages';
class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.currentUser = '';
    this.targetUser = '';
    this.currentRoomId = '';
  }  
  componentWillMount(){
    var component = this;
    this.targetUser = this.props.targetUser;
    this.currentUser = this.props.currentUser;
    this.props.emitter.addListener('ReSendData',function(callback){
      return callback(component.currentUser, component.targetUser, component.currentRoomId);
    });
  }
  componentWillReceiveProps(nextProps){
    var component = this;
    if(component.targetUser !== nextProps.targetUser && nextProps.targetUser){
      component.targetUser = nextProps.targetUser;
      component.currentUser = nextProps.currentUser;
      let properties = {};
      properties['currentUser'] = component.currentUser;
      properties['targetUser'] = component.targetUser;
      properties['roomId'] = component.currentUser.uid + component.targetUser.uid;
      properties['component'] = component;
      properties['ts'] = '' + (new Date()).getTime();
      properties['limit'] = 15;
      component.setState({messages: []})
      Messages.closeStreamRef();
      RoomInfo.getRoomId(properties, roomId =>{
        component.props.emitter.emit('RoomChatHasChanged',component.currentUser, component.targetUser, roomId);        
        properties['roomId'] = roomId;
        component.currentRoomId = roomId;
        Messages.history(properties, function(){

        })
        Messages.streamingMessage(properties, function(){

        })
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
      // this.autoExpand('input-mess-box');
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
    this.autoScrollBottom();
  }

  autoScrollBottom() {
    $('.chats').stop().animate({
      scrollTop: $('.chats')[0].scrollHeight}, 1000);
  }

  clearContent(elementId) {
    $('#' + elementId).val($('#' + elementId).val().replace(/\t/g, 'a'));
    $('#' + elementId).val('');
    // this.autoExpand(elementId);
  }

  handleSubmit(){
    if(!this.currentRoomId){
      return;
    }
    var component = this;
    let properties = {};
    var textSubmit = $('#input-mess-box').val();
    if (textSubmit.replace(/\s/g, '').length !== 0) {
      properties["content"] = textSubmit; 
      properties["component"] = component;
      Messages.chat(properties);
    }
  }

  render() {
    return(
      <div className='chat-box'>
        <ChatBubble messages={this.state.messages} />
        <div className='input-section'>
          <textarea id='input-mess-box'
                placeholder={Translate('app.chat.input_place_holder')}
                onKeyDown={this.handleInputChange.bind(this)} />
        </div>
      </div>
    )
  }
}

export default ChatBox;
