import React, { Component } from 'react';

import Nav from '../../homepage/nav';
import MainContent from './maincontent';
import Footer from '../../homepage/footer';
import * as constant from '../../constants';

import '../../../assets/styles/common/lawyerProfile.css';

var firebase = require('firebase');

class LawyerProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: '',
			user: ''
		};
  }

	getUserProfile(key) {
		var component = this;
		firebase.database().ref(`lawyers/${key}`).once('value',
			function(snapshot) {
	    	component.setState({profile : snapshot.val()});
	    })
	}
		
	checkUserName(username){
		var component = this;
		firebase.database().ref('users').orderByChild('username')
			.equalTo(username).once('value')
	    .then(function(snapshot){
	      if(!snapshot.exists()){
	        window.location = constant.BASE_URL;
	      }
	      else {
					firebase.database().ref('users').orderByChild('username')
					.equalTo(username).once('child_added')
	    		.then(function(snapshotUser) {
	    			if(snapshotUser.val().role != 'lawyer')
							window.location = constant.BASE_URL;
	        	else {
	        		component.setState({user: snapshotUser.val()});
	        		component.getUserProfile(snapshotUser.key);
	        	}
	    		})
	      }
	  	})
	}

  componentWillMount() {
    if(!firebase.apps.length){
      firebase.initializeApp(constant.APP_CONFIG);
    }
	  this.checkUserName(this.props.match.params.user_name);
  }

	render() {
		return (
			<div>
				<Nav navStyle='inverse'/>
				<MainContent profile={this.state.profile}
					user={this.state.user}/>
				<Footer/>
			</div>
		);
	}
}

export default LawyerProfile;
