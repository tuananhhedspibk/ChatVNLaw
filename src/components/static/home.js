import React, {Component} from 'react';
import firebase from 'firebase';

import * as constant from '../constants';

class Home extends Component {
  renderView() {
    if(!firebase.apps.length){
      firebase.initializeApp(constant.APP_CONFIG);  
    }
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let ref = firebase.database().ref('users')
          .orderByChild('displayName').equalTo(user.displayName)
          .once('child_added').then(function(data){
          if(data.exists()){  
            window.location = constant.BASE_URL + constant.CHAT_URI + '/' + data.val().username;           
          }else{
            window.location = constant.BASE_URL + constant.SIGN_IN_URI;
          }
        })
      } else {
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