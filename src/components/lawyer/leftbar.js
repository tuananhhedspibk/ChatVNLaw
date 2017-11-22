import React, { Component } from 'react';

import * as constant from '../constants';

class LeftBar extends Component {
	render() {
		return (
			<div className="left-side-prof col-md-3">
				<div id="sidebar">
					<div className="lawyer-overview">
						<div className="text-center">
							<img src={this.props.user.photoURL} className="lawyer-ava"/>
						</div>
						<div className="lawyer-head">
							<h2>{this.props.user.displayName}</h2>
						</div>
					</div>
					<button className="btn btn-primary">Tư vấn trực tuyến</button>
				</div>
			</div>
		);
	}
}
export default LeftBar; 