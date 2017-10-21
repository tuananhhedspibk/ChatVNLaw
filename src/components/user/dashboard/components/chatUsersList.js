import React, {Component} from 'react';

class ChatUsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          photoURL: 'https://image.ibb.co/i23jUF/default_ava.png',
          status: 'online',
          displayName: 'Hello1'
        },
        {
          photoURL: 'https://image.ibb.co/i23jUF/default_ava.png',
          status: 'offline',
          displayName: 'Hello2'
        },
        {
          photoURL: 'https://image.ibb.co/i23jUF/default_ava.png',
          status: 'online',
          displayName: 'Hello3'
        },
        {
          photoURL: 'https://image.ibb.co/i23jUF/default_ava.png',
          status: 'away',
          displayName: 'Hello4'
        }
      ],
      unread: []
    }
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

  render() {
    return(
      <div className='chat-users-list'>
        {
          this.state.users.map(user => {
            return(
              <div className='chat-user'>
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
      </div>
    )
  }
}

export default ChatUsersList;
