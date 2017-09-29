import React, {Component} from 'react';

import * as constant from '../constants';
var firebase = require('firebase');

class Home extends Component {
  renderView() {
    // if (localStorage.rocket_chat_user == null) {
    //   window.location = constant.BASE_URL + constant.SIGN_IN_URI;
    // }
    // else{
    //   window.location = constant.BASE_URL + constant.CHAT_URI + '/'
    //     + JSON.parse(localStorage.rocket_chat_user).user_name;
	  // }
  }

  render() {
    return (
      <div>
        {/* {this.renderView()} */}
		
      </div>
    )
  }
}

export default Home;