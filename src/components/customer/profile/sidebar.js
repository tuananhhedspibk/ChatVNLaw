import React, { Component } from 'react';

import * as constant from '../../constants';

class SideBar extends Component {
	render() {
		return(
			<div className="side-bar">
				<div >
					<div className="user-avatar">
						<img src={this.props.user.photoURL}/>
					</div>
					<div className="user-name">
						<p>{this.props.user.displayName}</p>
					</div>
					<div className="user-contact">
						<p><span className="glyphicon glyphicon-envelope"></span> {this.props.user.email}</p>
					</div>
				</div>
			</div>
			);
	}
}
export default SideBar;