import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import Nav from '../../homepage/nav';
import Footer from '../../homepage/footer';
import HeaderBlock from './headerblock';

import * as constant from '../../constants';
import * as User from '../../../lib/user/users';

import '../../../assets/styles/common/customerProfile.css';

class CustomerProfile extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
			currentUser: '',
			isLoading: true
	  }
	}

	loadDataFromServer() {
		var component = this;
		User.loadProfilePage(this.props.match.params.user_name, (success, response) => {
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

	render() {
		return(
			<div>
				<Nav navStyle='inverse'/>
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
							<HeaderBlock user={this.state.currentUser}/>
						)
					}
				</div>
				<Footer/>
			</div>
		)
	}
}

export default CustomerProfile;

