import React, {Component} from 'react';

import * as constant from '../constants';
import ChatWindow from '../chat/chatwindow';
import UsersIndex from '../user/index';

import '../../assets/styles/chatui.css';

class Home extends Component {
  renderView() {
    if (localStorage.rocket_chat_user == null) {
      window.location = constant.BASE_URL + constant.SIGN_IN_URI; 
    }
    else{
      return(
        <div className='chat-ui'>
          <UsersIndex/>
          <ChatWindow/>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    )
  }
}

export default Home;
