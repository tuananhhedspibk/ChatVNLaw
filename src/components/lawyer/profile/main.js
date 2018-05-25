import React, { Component } from 'react';
import {EventEmitter} from 'fbemitter';

import Nav from '../../homepage/nav';
import MainContent from './maincontent';
import Footer from '../../homepage/footer';

import Toast from '../../notification/toast';
import NotFound from '../../shared/notfound';
import Loading from '../../shared/loading';

import { onAuthStateChanged } from '../../../lib/user/authentication';
import { checkAuthen } from '../../../lib/notification/toast';
import * as Lawyer from '../../../lib/user/lawyers';
import * as constant from '../../constants';

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
				window.location = constant.BASE_URL + constant.NF_URI;
			}
		})
	}

  componentWillMount() {
		this.loadDataFromServer();
	}
	
	componentDidMount() {
		var component = this;
		onAuthStateChanged(user =>{
      if (user) {
        if(localStorage.chat_vnlaw_user){

				}
				else {
					if (component.state.currentUser.mn_acc) {
						component.setState({isLoading: true});
						checkAuthen(component.emitter, constant.SIGN_IN_URI, ()=>{
						});
					}
				}
			}
			else {
				if (component.state.currentUser.mn_acc) {
					component.setState({isLoading: true});
					checkAuthen(component.emitter, constant.SIGN_IN_URI, ()=>{
					});
				}
			}
		});
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
					<Loading/>
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
