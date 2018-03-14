import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as constant from '../constants';
import SitckyElement from './stickyelement';

import * as translate from 'counterpart';

class StickyHighlight extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let sticky = null;
		var existSticky = false;

		if (this.props.stickies) {
			existSticky = true;
		}

		if (this.props.painting) {
			sticky = (<div className='sticky-btn' onClick={this.props.handleStickyOff}>
				<img src={constant.onStickyPic} height='20' width='20'/>
				<span className='btn-text'>{translate('app.article.markup')}</span>
			</div>)
		}
		else {
			sticky = (<div className='sticky-btn' onClick={this.props.handleSticky}>
				<img src={constant.offStickyPic} height='20' width='20'/>
				<span>{translate('app.article.markup')}</span>
			</div>)	
		}

		return (
			<div className='sticky-col'>
				{sticky}
				<ul className='listSticky'>
					{
						existSticky &&
							this.props.stickies.map(function(data, index){
            		return <SitckyElement key={ index } data={data}/>;
          	})
					}
				</ul>
			</div>
		);
	}
}

export default StickyHighlight;
