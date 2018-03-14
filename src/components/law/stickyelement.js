import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as constant from '../constants';

class StickyElement extends Component {
	render() {
		var style = {background:this.props.data.color};
		var href = '#sticky-' + this.props.data.key;
		return (
			<li>
				<a className='internal_link' href={href}>
					<div style={style}></div>
					<span className='sticky-title'
						title={this.props.data.title}>
							{this.props.data.title}
					</span>
				</a>
			</li>
		);
	}
}

export default StickyElement;
