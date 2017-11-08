import React, { Component } from 'react';
import * as constant from '../../constants';
import EditerInline from './editinline'

class SideBar extends Component {

	render() {
		console.log(this.props.user)
		return(
			<div className="left-bar-prof col-lg-3 col-md-3 col-sm-4 col-xs-12">
				<EditerInline name="displayName" text={this.props.user.displayName} handleUpdate={this.props.handleUpdate} />
			</div>
			);
	}
}
export default SideBar;