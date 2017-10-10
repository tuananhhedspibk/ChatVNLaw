import React, {Component} from 'react';

import * as constant from '../constants';
var firebase = require('firebase');

class Home extends Component {
  renderView() {
    if(!firebase.apps.length){
      firebase.initializeApp(constant.APP_CONFIG);  
    }
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        window.location = constant.BASE_URL + constant.CHAT_URI + '/' + firebase.auth().currentUser.displayName;
      } else {
        // No user is signed in.
        window.location = constant.BASE_URL + constant.SIGN_IN_URI;
      }
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