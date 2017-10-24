import React, { Component } from 'react';

import Nav from '../../homepage/Nav';
import Footer from '../../homepage/Footer';
import SideBar from './sidebar';
import BasicInfor from './basicinfor';
import ChatHistory from './chathistory';
import FeedBackHistory from './feedbackhistory';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'

import '../../../assets/styles/customer/profile.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css'
import $ from 'jquery'
import * as constant from '../../constants';
global.jQuery = $
const firebase = require('firebase');
require('bootstrap')

var user;

class CustomerProfile extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      currentUser: ''
	    }
	  }

	componentWillMount() {
	
		var component = this;
	    firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
			// User is signed in.
				component.setState({currentUser: user});
			} else {
				window.location = constant.BASE_URL + constant.SIGN_IN_URI
			}
		});
	 }

  	componentDidUpdate(){
		$('.navbar-default').addClass('navbar-fixed-top');
		console.log("asddads");
				console.log(user.role);
  	}
	render() {
		if(this.state.currentUser){

		    return (
				<div>
					<Nav />
					<div className="profile-container">
						<SideBar user={this.state.currentUser} />
						 <div className="tab-content">
							<BasicInfor  user={this.state.currentUser} />
							<ChatHistory />
							<FeedBackHistory/>
						</div>
					</div>
				</div>
		);
		} else{
			return (
				<div></div>
			)
		}
	}
}

export default CustomerProfile;

