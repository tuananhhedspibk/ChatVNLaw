import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { EventEmitter } from 'fbemitter';

import Nav from '../../homepage/nav';
import Footer from '../../homepage/footer';
import HeaderBlock from './headerblock';

import Toast from '../../notification/toast';

import * as constant from '../../constants';
import { loadProfilePage } from '../../../lib/user/users';
import { onAuthStateChanged } from '../../../lib/user/authentication';
import { checkAuthen } from '../../../lib/notification/toast';

import * as translate from 'counterpart';

import '../../../assets/styles/common/customerProfile.css';

class CustomerProfile extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
			currentUser: '',
			isLoading: true
		},
		this.emitter = new EventEmitter();
	}

	loadDataFromServer() {
		var component = this;
		loadProfilePage(this.props.match.params.user_name, (success, response) => {
			if (success) {
				component.setState({
					currentUser: response.data.user_info,
					isLoading: false
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

	render() {
		return(
			<div>
				<Nav navStyle='inverse'/>
				<Toast emitter={this.emitter}/>
				<div className='container-customer-wrapper'>
					{
						this.state.isLoading ?
						(
							<ReactLoading className='loading-symbol'
								type='cylon' color='#337ab7'
								height='125' width='125'/>
						)
						:
						(
							<div>
								<HeaderBlock user={this.state.currentUser}/>
								{
									this.state.currentUser.mn_acc ?
									(
										<div className='row'>
											<div className='col-sm-12 col-md-3'>
												<div className='content-block left-block'>
													<div className='title'>
														{translate('app.customer.bank_account')}
													</div>
													<div className='content'>
														{this.state.currentUser.mn_acc.ammount} Đ
													</div>
												</div>
											</div>
										</div>
									)
									:
									(
										''
									)
								}
							</div>
						)
					}
				</div>
				<Footer/>
			</div>
		)
	}
}

export default CustomerProfile;

