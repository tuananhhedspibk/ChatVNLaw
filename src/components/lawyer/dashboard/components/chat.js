import React, {Component} from 'react';
import ChatUserLists from './chatuserslist';

class Chat extends Component {
  render() {
    return(
      <div className='chat-section'>
        <ChatUserLists 
          emitter={this.props.emitter}
          peer={this.props.peer}
          currentUser={this.props.currentUser}/>
      </div>
    )
  }
}

export default Chat;
