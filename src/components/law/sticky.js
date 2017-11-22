import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import * as constant from '../constants';
import SitckyElement from './stickyelement';

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
			sticky = <img src={constant.onStickyPic}  height="20" width="20" onClick={this.props.handleStickyOff}/>
		}
		else {
			sticky = <img src={constant.offStickyPic} height="20" width="20" onClick={this.props.handleSticky}/>
		}
		console.log(this.props.stickies)
		return (
			<div>
				<div className="sticky-btn">
					{sticky} <p> Đánh dấu văn bản</p>
				</div>
				<ul className="listSticky">
					{existSticky &&
						this.props.stickies.map(function(data, index){
							console.log(true);
            return <SitckyElement key={ index } data={data}/>;
          })}
				</ul>
			</div>
			);
	}
}

export default StickyHighlight;
