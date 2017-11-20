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

	componentWillMount() {
		var component = this;
	    firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				getUserByUid(user.uid, (event,data) =>{
          switch(event){
            case 'value':
              var item = {
                username: data.val().username,
								displayName: data.val().displayName,
								email: data.val().email,
								role: data.val().role,
                uid : data.key,
                status: data.val().status,
                photoURL: data.val().photoURL
              }
              var bool = data.val().role === 'lawyer' ? true : false 
              component.setState({currentUser: item, islawyer: bool});
              break;
            case 'child_changed':
              var bool = data.val().role === 'lawyer' ? true : false 
              component.setState({islawyer: bool})
              break;
          }
        })
			}
		});
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

