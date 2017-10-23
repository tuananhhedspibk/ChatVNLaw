import React, {Component} from 'react';
import ChatBox from './chatBox';
import * as firebase from 'firebase';
import * as constant from '../../../constants';
import * as UserList from '../../../../lib/helper/user/get_target_chat_list';
class ChatUsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetUser:'',
      users: [],
      unread: []
    };
    this.targetUser = '';
    this.currentUser = '';
  }

  renderUserStatus(user) {
    if (user.status === 'online') {
      return(
        <div className='online-status'></div>
      )
    }
    else if(user.status === 'offline') {
      return(
        <div className='away-status'></div>
      )
    }
    else if(user.status === 'away'){
      return(
        <div className='offline-status'></div>
      )
    }
  }
  componentWillMount(){
    var component = this;
    if(!firebase.apps.length){
      firebase.initializeApp(constant.APP_CONFIG);
    }
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        component.currentUser = user;
        let properties = {}
        properties['component'] = component;
        properties['currentUser'] = component.currentUser;
        properties['keyword'] = 'user';
        UserList.getTargetChat(properties);
      }else{

      }
    })
  }
  changeUserChat(user){
    this.setState({targetUser: user})
  }
  render() {
    return(
      <div className='chat-users-list'>
        {
          this.state.users.map(user => {
            return(
              <div className='chat-user' onClick={this.changeUserChat.bind(this,user)} key={user.uid}>
                <div className='user-ava'>
                  <img src={user.photoURL}/>
                  {this.renderUserStatus(user)}
                </div>
                <div className='user-info'>
                  <div className='user-name'>
                    {user.displayName}
                  </div>
                </div>
              </div>
            )
          })
        }
      <ChatBox
        targetUser={this.state.targetUser}
        currentUser={this.currentUser}
        emitter={this.props.emitter}/>
      </div>
    )
  }
}

export default ChatUsersList;
