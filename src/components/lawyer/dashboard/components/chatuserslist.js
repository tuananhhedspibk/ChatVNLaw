import React, {Component} from 'react';
import ChatBox from './chatbox';
import firebase from 'firebase';
import {getAllRoom} from '../../../../lib/room/rooms';

import * as constant from '../../../constants';
import * as translate from 'counterpart';

class ChatUsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetUser:null,
      currentUser: null,
      users: [],
      unread: [],
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
      component.setState({targetUser: targetUser})
    })
  }
  
  componentWillReceiveProps(nextProps){
    if(this.state.currentUser !== nextProps.currentUser){
      this.setState({currentUser: nextProps.currentUser});
    }
  }
  changeUserChat(user){
    document.body.classList.remove('chat-section-hidden');
    this.setState({targetUser: user})
  }

  render() {    
    return(
      <div>
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
        <ChatBox
          targetUser={this.state.targetUser}
          currentUser={this.state.currentUser}
          emitter={this.props.emitter}
          peer={this.props.peer}/>
      </div>
    )
  }
}

export default ChatUsersList;
