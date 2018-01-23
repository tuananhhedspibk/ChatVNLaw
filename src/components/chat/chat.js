import React, { Component } from 'react';
import ChatView from './chatview';

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='chat'>
        <ChatView userNameURL={this.props.match.params.user_name}/>
        <div className='place-holder-ui'>
          <div className='title'>
            <div className='bar'>
            </div>
          </div>
          <div className='chat-text-box'>
          </div>
          <div className='chat-setting'>
            <div className='header'>
              <div className='ava'></div>
              <div className='info'></div>
            </div>
            <div className='content'>
              <div className='shared'>
                <div className='bar'>
                </div>
              </div>
              <div className='shared'>
                <div className='bar'>
                </div>
              </div>
              <div className='shared'>
                <div className='bar'>
                </div>
              </div>
              <div className='shared'>
                <div className='bar'>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat;
