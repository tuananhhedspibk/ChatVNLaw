import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import * as constant from '../constants';

class StickyElement extends Component {
	
	render() {
		console.log(this.props)
		var style = {background:this.props.data.color};
		var href = '#sticky-' + this.props.data.key;
		return (
			<li>
				<a className="internal_link" href={href}>
					<div style={style}></div>
					<p className="sticky-title">{this.props.data.title}</p>
				</a>
			</li>
			);
	}
}

export default StickyElement;
