import React, {Component} from 'react';

import * as constant from '../constants';

class Home extends Component {
  renderView() {
    if (localStorage.rocket_chat_user == null) {
     window.location = constant.BASE_URL + constant.SIGN_IN_URI; 
    }
    else{

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
