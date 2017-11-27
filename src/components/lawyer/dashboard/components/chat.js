import React, {Component} from 'react';
import ChatUserLists from './chatuserslist';

class Chat extends Component {
  render() {
    return(
      <div className='chat-section'>
        <ChatUserLists 
          emitter={this.props.emitter}
          currentUser={this.props.currentUser}/>
      </div>
    )
  }
}

export default Chat;
