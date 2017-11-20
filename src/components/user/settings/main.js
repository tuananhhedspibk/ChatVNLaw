import React, { Component } from 'react';

import Nav from '../../homepage/nav';
import Footer from '../../homepage/footer';
import LawyerProfile from './lawyersprof';
import UserProfile from './userprof';
import FeedBackHistory from './feedbackhistory';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'
import Loading from '../../shared/loading';
import Toast from '../../notification/toast';
import {EventEmitter} from 'fbemitter';
import firebase from 'firebase';
import {onAuthStateChanged} from '../../../lib/user/authentication';

import '../../../assets/styles/common/profile.css';

import $ from 'jquery'

import * as constant from '../../constants';
import * as translate from 'counterpart';

class CustomerProfile extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lawyer: null,
			user: null,
			uid: null,
			isLoading: true			
		};
		this.emitter = new EventEmitter();		
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	componentWillMount() {
		var component = this;
		onAuthStateChanged( user =>{
      if(!user){
				component.emitter.emit('AddNewErrorToast', translate('app.system_notice.unauthenticated.title'), translate('app.system_notice.unauthenticated.text'), 5000, ()=>{
					window.location = constant.BASE_URL + constant.SIGN_IN_URI
				})
				setTimeout(()=>{
					window.location = constant.BASE_URL + constant.SIGN_IN_URI
				},3000);                   
      }else{
				component.setState({currentUser: user, isLoading : false,uid: user.uid})  
				component.renderProfileView(user.uid);      
      }
		})
		
		// firebase.auth().onAuthStateChanged(function(user) {
		// 	if (user) {
		// 		component.setState({uid: user.uid});
		// 		component.renderProfileView(user.uid);
		// 	} else {
		// 		window.location = constant.BASE_URL + constant.SIGN_IN_URI
		// 	}
		// });
	}

<<<<<<< 7c4b402fc9ddb69de54598ca8b3604f28cbb9b6e:src/components/user/settings/main.js
  	handleUpdate(table,name, newValue) {
		if(table=='users' &&  name=='displayName')
			this.handleUpdate('lawyers','fullname',newValue);
  		var update = eval('('+`{${name}:'${newValue}'}`+')');
  		firebase.database().ref(`${table}/${this.state.uid}`).update(update);
  	}
  	renderProfileView(uid) {
    	var component = this;
  		firebase.database().ref(`users/${uid}`).once('value',function(snapshotUser) {
			if(snapshotUser.val().role == 'lawyer') {
				firebase.database().ref(`lawyers/${uid}`).once('value',function(snapshot) {
    			component.setState({lawyer: snapshot.val()})
    			component.setState({user: snapshotUser.val()});
    			})
=======
	handleUpdate(table,name, newValue) {
	if(table=='users' &&  name=='displayName')	
		this.handleUpdate('lawyers','fullname',newValue);
		var update = eval('('+`{${name}:'${newValue}'}`+')');
		firebase.database().ref(`${table}/${this.state.uid}`).update(update);
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
>>>>>>> 123:src/components/user/profile/main.js
			}
		})
	}

	renderMain() {
		return (
			<div>
<<<<<<< 7c4b402fc9ddb69de54598ca8b3604f28cbb9b6e:src/components/user/settings/main.js
				<Nav navStyle='inverse'/>
					{	this.state.user != null &&
							(this.state.lawyer != null ? (<LawyerProfile lawyer={this.state.lawyer} user={this.state.user} handleUpdate={this.handleUpdate}/>) 
						: (<UserProfile user={this.state.user} handleUpdate={this.handleUpdate}/>))
					}
=======
				<Nav  navStyle='inverse'/>
				{	this.state.user != null &&
						(this.state.lawyer != null ? (<LawyerProfile lawyer={this.state.lawyer} user={this.state.user} handleUpdate={this.handleUpdate}/>) 
					: (<UserProfile user={this.state.user} handleUpdate={this.handleUpdate}/>))
				}
>>>>>>> 123:src/components/user/profile/main.js
			</div>
		);
	}
	render(){
		return(
			<div>
				<Toast emitter={this.emitter}/>
				{this.state.isLoading ? <Loading/> : <div>{this.renderMain()}</div>}
			</div>
		)
	}
}

export default CustomerProfile;

