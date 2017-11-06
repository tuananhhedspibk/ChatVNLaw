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
  componentWillReceiveProps(nextProps){
    var component = this;
    if(this.state.targetUser !== nextProps.targetUser && !!nextProps.targetUser){
      this.setState({targetUser: nextProps.targetUser});
    }
    if(this.state.currentUser !== nextProps.currentUser && !!nextProps.currentUser){
      this.setState({currentUser: nextProps.currentUser});
    }
    
    if(!!nextProps.targetUser && ((!this.state.targetUser) || (this.state.targetUser.uid !== nextProps.targetUser.uid))){
      let properties = {}
      this.setState({messages :[]})
      properties['roomId'] = nextProps.currentUser.uid + nextProps.targetUser.uid;
      properties['component'] = component;
      properties['currentUser'] = nextProps.currentUser;
      properties['targetUser'] = nextProps.targetUser;
      RoomInfo.getRoomId(properties, roomId =>{
        component.props.emitter.emit('RoomChatHasChanged',nextProps.currentUser, nextProps.targetUser, roomId);   
        component.setState({currentRoomId: roomId});             
      })
    }
  }   
  componentWillUpdate(nextProps, nextState){
    var component = this;
    if(this.state.currentRoomId !== nextState.currentRoomId){
      let properties = {}
      properties['roomId'] = nextState.currentRoomId;
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

    input.style.height = '45px';
    var contentHeight = document.getElementById(elementId).scrollHeight;
    input.style.height = contentHeight + 'px';

    var textbox = document.getElementById('text-box');
    textbox.style.height = contentHeight + 2 + 'px';
    chats.style.height = vh - 55 - contentHeight + 'px';
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
      properties["content"] = textSubmit; 
      properties["component"] = component;
      Messages.chat(properties);
    }
  }

  render() {
    if(this.state.currentRoomId){
      return(
        <div className='chat-box'>
          <ChatBubble messages={this.state.messages} 
            emitter={this.props.emitter}
            renderHastag={true}
            currentUser={this.state.currentUser}
            targetUser={this.state.targetUser}/>
          <div className='input-section text-box' id='text-box'>  
            <textarea id='input-mess-box'
              placeholder={Translate('app.chat.input_place_holder')}
              onKeyDown={this.handleInputChange.bind(this)} />
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
