import React, { Component } from 'react';
import $ from 'jquery'
import Nav from '../../homepage/nav';
import Footer from '../../homepage/footer';
import SideBar from './sidebar';
import BasicInfor from './basicinfor';
import ChatHistory from './chathistory';
import FeedBackHistory from './feedbackhistory';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'

import * as constant from '../../constants';
import * as firebase from 'firebase';
import '../../../assets/styles/common/profile.css';

global.jQuery = $;

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
  	}
	render() {
		if(this.state.currentUser){

		    return (
				<div>
					<Nav />
					<div className="profile-container">
						<SideBar user={this.state.currentUser} />
						 <div className="profile-information">
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

