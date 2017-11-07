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
						<i className="fa fa-envelope-o" aria-hidden="true"></i><p>{this.props.user.email}</p>
					</div>
					<div className="user-contact">
						<i className="fa fa-phone" aria-hidden="true"></i><p>0123456789</p>
					</div>
					<div className="user-contact">
						<i className="fa fa-address-card-o" aria-hidden="true"></i>số 102 đường Đê La Thành, Hà Nội<p></p>
					</div>
					<div className="user-contact">
						<i className="fa fa-credit-card" aria-hidden="true"></i><p>0 VNĐ</p>
					</div>
				</div>
			</div>
			);
	}
}
export default SideBar;