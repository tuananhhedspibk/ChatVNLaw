import React, { Component } from 'react';
import * as constant from '../../constants';
import EditerInline from './editinline';
class SideBar extends Component {
	constructor(props) {
		super(props);
		this.handleUpdate=this.handleUpdate.bind(this);
	}
	getTypeOfAccount() {
		if (this.props.user.role == 'user')
			return 'người dùng';
		if (this.props.user.role == 'lawyer')
			return 'luật sư';
	}
	handleUpdate(name,text) {
		this.props.handleUpdate('users',name,text);	
	}
	render() {
		return(
			<div className="left-bar-prof col-lg-3 col-md-3 col-sm-4 col-xs-12">
				<img src={this.props.user.photoURL} />
				<ul>
					<li>
						<EditerInline name="displayName" text={this.props.user.displayName} handleUpdate={this.handleUpdate} />
					</li>
					<li>
						<div>
						<i className="fa fa-envelope-o" aria-hidden="true"></i>{this.props.user.email}
						</div>
					</li>
					<div>
						Loại tài khoản: {this.getTypeOfAccount()}
					</div>
				</ul>
			</div>
			);
	}
}
export default SideBar;