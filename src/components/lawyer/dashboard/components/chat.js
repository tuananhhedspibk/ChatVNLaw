import React, {Component} from 'react';
import ChatBox from './chatbox';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';

import { getAllRooms, upFile } from '../../../../lib/room/rooms';
import { chat } from '../../../../lib/messages/messages';

import * as constant from '../../../constants';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetUser:null,
      currentUser: null,
      rooms: [],
      unread: [],
      listUsersHeight: 0,
      roomDes: '',
      fileBtn: null,
      currentRoomId: '',
      isVideoCalling: false
    };
  }

  componentWillMount(){
    var component = this;
    this.setState({currentUser : this.props.currentUser});
    getAllRooms( (success, response) =>{
      if (success) {
        component.setState({rooms: response.data.rooms});
        this.props.emitter.addListener('getUserSearch', function(targetUser){
          component.state.rooms.every((element)=>{
            if(element.user.uid === targetUser.uid){
              targetUser = element.user
              targetUser.rid = element.id;
              component.setState({targetUser: targetUser});
              return false;
            }
            return true;
          })
        })  
      }
    })
  }
  
  componentWillReceiveProps(nextProps){
    if(this.state.currentUser !== nextProps.currentUser){
      this.setState({currentUser: nextProps.currentUser});
    }
  }

  setHeight(component) {
    var vh = Math.max(document.documentElement.clientHeight,
      window.innerHeight || 0);
    var listUsersHeight = vh - $('.app-header').height();
    component.setState({listUsersHeight: listUsersHeight});
  }

  componentDidMount() {
    var component = this;
    this.setHeight(this);
    $(window).resize(function() {
      component.setHeight(component);
    });
    var fileBtn = document.getElementById('upfile');
    fileBtn.addEventListener('change', function(e){
      e.preventDefault();
      upFile(component, component.state.currentRoomId, e, chat);
    });
  }

  changeUserChat(user, rid, roomDes){
    document.body.classList.remove('chat-section-hidden');
    user.rid = rid;
    this.setState({
      targetUser: user,
      roomDes: roomDes,
      currentRoomId: rid
    });
    if ($('#open-chat-btn').css('display') !== 'none'){
      $('#open-chat-btn').fadeOut();
      $('#close-chat-btn').fadeIn();
    }
    if ($('.chat-box-wrapper').css('display') === 'none') {
      $('.chat-box-wrapper').toggle();
      if($('.video-call').css('display') !== 'none') {
        $('.video-call').find('.video').toggle();
        $('.video-call').find('.end-call-btn').toggle();
      }
    }
  }

  blockWhenVideoCalling() {
    this.setState({isVideoCalling: true});
  }

  openWhenEndVideoCalling() {
    this.setState({isVideoCalling: false});
  }

  upfile() {
    $('#upfile:hidden').trigger('click');
  }

  render() { 
    return(
      <div className='chat-section'>
        <div className='chat-users-list-wrapper'>
          <Scrollbars style={{
            height: this.state.listUsersHeight}}
            autoHide={true}
            autoHideTimeout={1500}
            thumbSize={100}
            renderView={
              props =>
              <div {...props} className='custom-content'/>
            }>
            <input type='file' id='upfile'/>
            <div className='chat-users-list'>
              {
                this.state.rooms.map(room => {
                  if(this.state.targetUser && this.state.targetUser.uid === room.user.uid){
                    return(
                      <div className='chat-user active-link'
                        onClick={this.changeUserChat.bind(this, room.user,
                          room.id, room.description)} key={room.id}>
                          <div className='user-ava'>
                            <img alt='ava'
                              src={constant.API_BASE_URL + room.user.avatar.url}
                              title={room.user.displayName}/>
                          </div>
                        </div>
                    )
                  } else{
                    if (!this.state.isVideoCalling) {
                      return(
                        <div className='chat-user'
                          onClick={this.changeUserChat.bind(this, room.user,
                            room.id, room.description)} key={room.id}>
                            <div className='user-ava'>
                              <img alt='ava'
                                src={constant.API_BASE_URL + room.user.avatar.url}
                                title={room.user.displayName}/>
                            </div>
                        </div>
                      )
                    }
                    else {
                      return (
                        <div className='chat-user' key={room.id}>
                          <div className='user-ava'>
                            <img alt='ava'
                              src={constant.API_BASE_URL + room.user.avatar.url}
                              title={room.user.displayName}/>
                          </div>
                        </div>
                      )
                    }
                  }         
                })
              }
            </div>
          </Scrollbars>
        </div>
        <ChatBox
          openWhenEndVideoCalling={this.openWhenEndVideoCalling.bind(this)}
          blockWhenVideoCalling={this.blockWhenVideoCalling.bind(this)}
          upfile={this.upfile}
          fileBtn={this.state.fileBtn}
          targetUser={this.state.targetUser}
          currentUser={this.state.currentUser}
          roomDes = {this.state.roomDes}
          emitter={this.props.emitter}/>
      </div>
    )
  }
}

export default Chat;
