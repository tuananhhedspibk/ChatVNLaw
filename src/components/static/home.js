import React, {Component} from 'react';

import * as constant from '../constants';

import '../../assets/styles/chatui.css';
// import {DDPClient} from 'ddp';
let user      = require('../../lib/api/users');



class Home extends Component {
  renderView() {
    if (localStorage.rocket_chat_user == null) {
      window.location = constant.BASE_URL + constant.SIGN_IN_URI;
    }
    else{
      window.location = constant.BASE_URL + constant.CHAT_URI + '/'
        + JSON.parse(localStorage.rocket_chat_user).user_name;
	}
	
  }
  handleSubmit(evt) {
    evt.preventDefault();
  }
  handleSubmit1(evt) {
    evt.preventDefault();
    var imagefile = document.querySelector('#file');    
    user.setAvatarWithFile(imagefile.files[0],function(response){

    });
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
