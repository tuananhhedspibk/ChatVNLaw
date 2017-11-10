import React, { Component } from 'react';

import * as constant from '../constants';

class BottomContent extends Component {
	render() {
		return (
			<div>
				<div className="center-border"></div>
				<div className="title-content"><h1>Tư vấn trực tuyến</h1></div>
				<div className="chat-banner">
					<img src={constant.chatBannerPic} />
					<ul>
						<li>Nhanh nhất</li>
						<li>Tiết kiệm thời gian nhất</li>
						<li>Chi phí thấp nhất</li>
					</ul>
				</div>
				<button className="btn btn-primary">
				>> Kết nối ngay &lt;&lt;
				</button>
			</div>
		);
	}
}
export default BottomContent; 