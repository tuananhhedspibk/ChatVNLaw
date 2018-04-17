import React, {Component} from 'react';
import ChatBox from './chatbox';
import firebase from 'firebase';
import {getAllRooms} from '../../../../lib/room/rooms';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';

import * as constant from '../../../constants';
import * as translate from 'counterpart';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetUser:null,
      currentUser: null,
      rooms: [],
      unread: [],
      listUsersHeight: 0,
      roomDes: ''
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
  }

  changeUserChat(user,rid,roomDes){
    document.body.classList.remove('chat-section-hidden');
    user.rid = rid;
    this.setState({
      targetUser: user,
      roomDes: roomDes});
    console.log('chatjs')
    console.log(user)
    if ($('.chat-box-wrapper').css('display') == 'none') {
      $('.chat-box-wrapper').toggle();
      if($('.video-call').css('display') !== 'none') {
        $('.video-call').find('.video').toggle();
        $('.video-call').find('.end-call-btn').toggle();
      }
    }
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
            <div className='chat-users-list'>
              {
                this.state.rooms.map(room => {
                  if(this.state.targetUser != null && this.state.targetUser.id === room.user.id){
                    return(
                      <div className='chat-user active-link'
                        onClick={this.changeUserChat.bind(this,room.user,room.id, room.description)}
                        key={room.id}>
                        <div className='user-ava'>
                          <img src={constant.API_BASE_URL + room.user.avatar.url} title={room.user.displayName}/>
                        </div>
                      </div>
                    )
                  
                  } else{
                    return(
                      <div className='chat-user'
                        onClick={this.changeUserChat.bind(this,room.user,room.id,room.description)}
                        key={room.id}>
                        <div className='user-ava'>
                          <img src={constant.API_BASE_URL + room.user.avatar.url} title={room.user.displayName}/>
                        </div>
                      </div>
                    )
                  }         
                })
              }
            </div>
          </Scrollbars>
        </div>
        <ChatBox
          targetUser={this.state.targetUser}
          currentUser={this.state.currentUser}
          roomDes = {this.state.roomDes}
          emitter={this.props.emitter}/>
      </div>
    )
  }
}

export default Chat;
