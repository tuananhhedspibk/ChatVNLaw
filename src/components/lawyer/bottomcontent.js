import React, { Component } from 'react';

import * as constant from '../constants';
var firebase = require('firebase');

class BottomContent extends Component {

	constructor(props){
		super(props);
	}

	applyLawyer(){
		firebase.database().ref(`users`).orderByChild('username')
					.equalTo(this.props.lawyer).limitToFirst(1).once("value", data => {
			if(data){
				for(var y in data.val()){
					window.location = constant.BASE_URL + '/applylawyer/' + y;
				}
			}
		})
		// window.location = constant.BASE_URL + '/applylawyer/' + this.props.currentLawyer.uid;
	}

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
				<button className="btn btn-primary" onClick={this.applyLawyer.bind(this)}>
				>> Kết nối ngay &lt;&lt;
				</button>
			</div>
		);
	}
}
export default BottomContent; 