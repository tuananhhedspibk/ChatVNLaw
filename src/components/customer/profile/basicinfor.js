import React, { Component } from 'react';

class BasicInfor extends Component {
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
						<strong>Age: </strong>
						22
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