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
        let ref = firebase.database().ref('users').orderByChild('displayName').equalTo(user.displayName).once('child_added').then(function(data){
          if(data.exists()){  
            window.location = constant.BASE_URL + constant.CHAT_URI + '/' + data.val().username;           
          }else{
            window.location = constant.BASE_URL + constant.SIGN_IN_URI;
          }
        })
      } else {
        // No user is signed in.
        window.location = constant.BASE_URL + constant.HOME_URI;
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