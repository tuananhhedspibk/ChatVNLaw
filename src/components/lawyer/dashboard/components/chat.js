import React, {Component} from 'react';
import ChatBox from './chatbox';
import firebase from 'firebase';
import {getAllRoom} from '../../../../lib/room/rooms';
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
      users: [],
      unread: [],
      listUsersHeight: 0
    };
  }

  componentWillMount(){
    var component = this;
    this.setState({currentUser : this.props.currentUser});
    
    let properties = {}
    properties['component'] = this;
    properties['currentUser'] = this.props.currentUser;
    getAllRoom(properties, (userArr) =>{
      component.setState({users :userArr})
    })
    this.props.emitter.addListener('getUserSearch', function(targetUser){
      component.state.users.every((element)=>{
        if(element.uid === targetUser.uid){
          targetUser.rid = element.rid;
          component.setState({targetUser: targetUser})
          return false;
        }
        return true;
      })
     
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

  changeUserChat(user){
    document.body.classList.remove('chat-section-hidden');
    this.setState({targetUser: user});
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
                this.state.users.map(user => {
                  if(JSON.stringify(this.state.targetUser) === JSON.stringify(user)){
                  
                    return(
                      <div className='chat-user active-link'
                        onClick={this.changeUserChat.bind(this,user)}
                        key={user.uid}>
                        <div className='user-ava'>
                          <img src={user.photoURL} title={user.displayName}/>
                        </div>
                      </div>
                    )
                  
                  } else{
                    return(
                      <div className='chat-user'
                        onClick={this.changeUserChat.bind(this,user)}
                        key={user.uid}>
                        <div className='user-ava'>
                          <img src={user.photoURL} title={user.displayName}/>
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
          emitter={this.props.emitter}/>
      </div>
    )
  }
}

export default Chat;
