import React, { Component } from 'react';

import Nav from '../../homepage/nav';
import Footer from '../../homepage/footer';
import LawyerProfile from './lawyersprof';
import UserProfile from './userprof';
import FeedBackHistory from './feedbackhistory';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'

import '../../../assets/styles/common/profile.css';

import $ from 'jquery'
import * as constant from '../../constants';


const firebase = require('firebase');

class CustomerProfile extends Component {
	
	constructor(props) {
	    super(props);
	    this.state = {
	      lawyer: null,
	      user: null,
	      uid: null
	    };
	    this.handleUpdate = this.handleUpdate.bind(this);
  	}
  	componentWillMount() {
  		var component = this;
		if(!firebase.apps.length){
      		firebase.initializeApp(constant.APP_CONFIG);
    	}
	    firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				component.setState({uid: user.uid});
				component.renderProfileView(user.uid);
			} else {
				window.location = constant.BASE_URL + constant.SIGN_IN_URI
			}
		});
  	}

  	handleUpdate(table,name, newValue) {
		if(table=='users' &&  name=='displayName')	
			this.handleUpdate('lawyers','fullname',newValue);
  		var update = {};
  		update[`${table}/${this.state.uid}/${name}`] = newValue
  		firebase.database().ref().update(update);
  	}
  	renderProfileView(uid) {
    	var component = this;
  		firebase.database().ref(`users/${uid}`).once('value',function(snapshotUser) {
			if(snapshotUser.val().role == 'lawyer') {
				firebase.database().ref(`lawyers/${uid}`).once('value',function(snapshot) {
    			component.setState({lawyer: snapshot.val()})
    			component.setState({user: snapshotUser.val()});
    			})
			}
    		else {
    			component.setState({user: snapshotUser.val()});
    		}
	    })
  	}

	render() {
	    return (
			<div>
				<Nav  navStyle='inverse'/>
					{	this.state.user != null &&
							(this.state.lawyer != null ? (<LawyerProfile lawyer={this.state.lawyer} user={this.state.user} handleUpdate={this.handleUpdate}/>) 
						: (<UserProfile user={this.state.user} handleUpdate={this.handleUpdate}/>))
					}
			</div>
		);
	}
}

export default CustomerProfile;

