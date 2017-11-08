import React, { Component } from 'react';
import SideBar from './sidebar';

class LawyerProfile extends Component {
	render() {
		console.log(this.props.user)
		return(
			<div className="my-profile">
				<div className="row">
					<SideBar user={this.props.user}/>
				</div>
			</div>
			);
	}
}
export default LawyerProfile;