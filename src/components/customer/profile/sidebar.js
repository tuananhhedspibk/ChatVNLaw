import React, { Component } from 'react';
import * as constant from '../../constants';

class SideBar extends Component {
	render() {
		return(
			<div className="side-bar">
				<div className="overlay"></div>
				<div >
					<div className="user-avatar">
						<img src={this.props.user.photoURL}/>
						<p>{this.props.user.displayName}</p>
					</div>
					<ul className="nav sidebar-nav">
				        <li className="active" role="presentation">
				           	<a href = "#basic-information" data-toggle="tab">Information</a>
				        </li>
				        <li role="presentation">
				        	<a href="#chat-history" data-toggle="tab">Chat History</a>
				        </li>
    				    <li role="presentation">
				        	<a href = "#feedback-history" data-toggle="tab">Feedback History</a>
				        </li>
				    </ul>
				</div>
			</div>
			);
	}
}
export default SideBar;