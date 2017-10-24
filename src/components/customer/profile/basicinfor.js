import React, { Component } from 'react';
const firebase = require('firebase');

class BasicInfor extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      currentUser: ''
	    }
	  }
	componentDidMount() {
		var component = this;
		firebase.database().ref("users/"+this.props.user.uid).on("value", function(snapshot) {
			component.setState({currentUser : snapshot.toJSON()});
		});
	}
	render() {
		return(
			<div id="basic-information" className="tab-pane active">
				<div className="tab-title">
					<h1>Basic information</h1>
				</div>
				<div className="user-detail">
					<p>
						<strong>User name: </strong>
						{this.props.user.displayName}
					</p>
					<p>
						<strong>Role: </strong>
						{this.state.currentUser.role}
					</p>
					<p>
						<strong>Email: </strong>
						{this.props.user.email}
					</p>
				</div>
			</div>
			);
	}
}
export default BasicInfor;