import React, {Component} from 'react';
import ChatBox from './chatBox';

import * as firebase from 'firebase';
import * as constant from '../../../constants';
import * as UserList from '../../../../lib/helper/user/get_target_chat_list';

let translate = require('counterpart');

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
<<<<<<< HEAD
        
=======
        component.props.emitter.addListener('getUserSearch', function(targetUser){
          component.setState({targetUser: targetUser})
          console.log(component.state.targetUser)
        })
>>>>>>> search username
      }else{

      }
    })
    component.props.emitter.addListener('getUserSearch', function(targetUser){
      component.setState({targetUser: targetUser})
      console.log(component.state.targetUser)
    })
  }

  changeUserChat(user){
    this.setState({targetUser: user})
    console.log(user);
  }

  render() {    
    return(
      <div>
        <div className='chat-users-list'>
        {
          this.state.users.map(user => {
            if(this.state.targetUser == user){
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
        <div className='header'>
          {this.state.targetUser ? translate('app.dashboard.chat_title') +' ' + this.state.targetUser.displayName : translate('app.dashboard.chat_title')}
        </div>
        <ChatBox
          targetUser={this.state.targetUser}
          currentUser={this.currentUser}
          emitter={this.props.emitter}/>
      </div>
    )
  }
}

export default ChatUsersList;
