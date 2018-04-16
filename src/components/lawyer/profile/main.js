import React, { Component } from 'react';
import {EventEmitter} from 'fbemitter';
import firebase from 'firebase';

import Nav from '../../homepage/nav';
import MainContent from './maincontent';
import Footer from '../../homepage/footer';

import Toast from '../../notification/toast';
import NotFound from '../../shared/notfound';

import * as constant from '../../constants';
import * as Lawyer from '../../../lib/user/lawyers';

import '../../../assets/styles/common/lawyerProfile.css';

class LawyerProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			success: false,
			isLoading: true
		};
		this.emitter = new EventEmitter(); 
  }

	loadDataFromServer() {
		var component = this;
		Lawyer.loadProfilePage(this.props.match.params.user_name, (success, response) => {
			if (success) {
				component.setState({
					currentUser: response.data.lawyer_info,
					isLoading: false,
					success: true
				});
			}
			else {
				console.log(response);
				//window.location = constant.BASE_URL + constant.NF_URI;
			}
		})
	}

  componentWillMount() {
		this.loadDataFromServer();
  }

	renderView(){
		if(this.state.success){
			return (
				<div>
					<Nav navStyle='inverse'/>
					<MainContent user={this.state.currentUser}/>
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
		if(this.state.isLoading){
			return(
				<div>
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
