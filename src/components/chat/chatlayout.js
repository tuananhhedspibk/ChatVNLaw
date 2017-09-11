import React, { Component } from 'react';
import UserIndex from '../user/index';

class ChatLayout extends Component {
  render() {
    return(
      <div className='chat-ui'>
        <UserIndex/>
        {this.props.children}
      </div>
    )
  }
}

export default ChatLayout;
