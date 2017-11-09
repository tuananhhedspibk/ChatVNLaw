import React, { Component } from 'react';
import SideBar from './sidebar';
import EditerInline from './editinline'
class UserProfile extends Component {
	// handleUpdate (name,text) {
	// 	this.props.handleUpdate('users',name,text);
	// }
	render() {
		console.log(this.props.user)
		return(
			<div className="my-profile">
				<div className="row">
					<SideBar user={this.props.user} handleUpdate={this.props.handleUpdate}/>
					<div>
					</div>
				</div>
			</div>
			);
	}
}
export default UserProfile;