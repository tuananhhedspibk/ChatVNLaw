import React, { Component } from 'react';
import * as constant from '../../constants';
import EditerInline from './editinline'

class SideBar extends Component {
	getTypeOfAccount() {
		if (this.props.role == 'user')
			return 'người dùng';
		if (this.props.role == 'lawyers')
			return 'luật sư';
	}
	render() {
		console.log(this.props.user)
		return(
			<div className="left-bar-prof col-lg-3 col-md-3 col-sm-4 col-xs-12">
				<img src={this.props.user.photoURL} />
				<EditerInline name="displayName" text={this.props.user.displayName} handleUpdate={this.props.handleUpdate} />
				<div>
					<i class="fa fa-envelope-o" aria-hidden="true"></i>{this.props.user.email}
				</div>
				<div>
					Loại tài khoản: {this.getTypeOfAccount()}
				</div>
			</div>
			);
	}
}
export default SideBar;