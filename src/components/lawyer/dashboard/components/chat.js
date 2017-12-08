import React, {Component} from 'react';
import ChatUserLists from './chatuserslist';

class Chat extends Component {
  render() {
    return(
      <ChatUserLists 
        emitter={this.props.emitter}
        peer={this.props.peer}
        currentUser={this.props.currentUser}/>
    )
  }
}

export default Chat;
