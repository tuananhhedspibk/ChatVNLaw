import React, { Component } from 'react';
import $ from 'jquery';

import Nav from '../../homepage/nav';
import Footer from '../../homepage/footer';
import HeaderBlock from './headerblock';

import {getUserByUid} from '../../../lib/user/getuserinfo';

import * as constant from '../../constants';
import * as firebase from 'firebase';
import * as translate from 'counterpart';

import '../../../assets/styles/common/customerProfile.css';

class CustomerProfile extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    currentUser: ''
	  }
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
	        	component.setState({currentUser: snapshotUser.val()});
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
		return(
			<div>
				<Nav navStyle='inverse'/>
				<div className='container-customer-wrapper'>
					<HeaderBlock user={this.state.currentUser}/>
				</div>
				<Footer/>
			</div>
		)
	}
}

export default CustomerProfile;

