import React, { Component } from 'react';

import Nav from '../../homepage/nav';
import MainContent from './maincontent';
import Footer from '../../homepage/footer';
import * as constant from '../../constants';
import Loading from '../../shared/loading';
import {EventEmitter} from 'fbemitter';
import Toast from '../../notification/toast';
import NotFound from '../../shared/notfound';
import firebase from 'firebase';

import '../../../assets/styles/common/lawyerProfile.css';


class LawyerProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: null,
			user: null,
			isloading : true,
			issuccess : true
		};
		this.emitter = new EventEmitter(); 
  }

	getUserProfile(key) {
		var component = this;
		firebase.database().ref(`lawyers/${key}`).once('value',
			function(snapshot) {
				if(snapshot.exists()){
					component.setState({profile : snapshot.val(), isloading: false});					
				}
	    })
	}
		
	checkUserName(username){
		var component = this;
		firebase.database().ref('users').orderByChild('username')
			.equalTo(username).once('value')
	    .then(function(snapshot){
	      if(!snapshot.exists()){
					component.setState({issuccess : false, isloading: false})
	      }
	      else {
					console.log(snapshot.val());
					for(var key in snapshot.val()){
						if(snapshot.val()[key].role != 'lawyer'){
							component.setState({issuccess : false, isloading: false})							
						}else{
							component.setState({user : snapshot.val()[key]})
							component.getUserProfile(key);
						}
					}
	      }
	  	})
	}

  componentWillMount() {
	  this.checkUserName(this.props.match.params.user_name);
	}

	renderView(){
		if(this.state.issuccess){
			return (
				<div>
					<Nav navStyle='inverse'/>
					<MainContent profile={this.state.profile}
						user={this.state.user}/>
					<Footer/>
					<Toast emitter={this.emitter}/>
				</div>
			);
		}else{
			return(
				<div>
					<NotFound />
					<Toast emitter={this.emitter}/>
				</div>
			)
		}
	}
	render() {
		if(this.state.isloading){
			return(
				<div>
					<Loading />
					<Toast emitter={this.emitter}/>
				</div>
			)
		}else{
			return(
				this.renderView()				
			)
		}
	}
}

export default LawyerProfile;
