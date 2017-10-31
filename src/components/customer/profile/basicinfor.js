import React, { Component } from 'react';

class BasicInfor extends Component {
	render() {
		return(
			<div id="basic-information">
				<div className="user-image">
					<img src={this.props.user.photoURL}/>
				</div>
				<div className="user-detail">
					<p>
						<strong>Hello, </strong>
						{this.props.user.displayName}
					</p>
				</div>
			</div>
			);
	}
}
export default BasicInfor;