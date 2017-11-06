import React, {Component} from 'react';
import ChatUserLists from './chatUsersList';

class Chat extends Component {
  render() {
    return(
      <div className='chat-section'>
        <ChatUserLists 
          emitter={this.props.emitter}/>
      </div>
    )
  }
}

export default Chat;
