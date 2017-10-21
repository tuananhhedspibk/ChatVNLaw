import React, {Component} from 'react';
import ChatBox from './chatBox';
import ChatUserLists from './chatUsersList';

class Chat extends Component {
  render() {
    return(
      <div className='chat-section'>
        <ChatUserLists />
        <ChatBox />
      </div>
    )
  }
}

export default Chat;
