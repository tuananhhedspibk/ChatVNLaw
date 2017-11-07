import React, { Component } from 'react';

import * as constant from '../constants';
import $ from 'jquery'

class MainContent extends Component {
	constructor(props){
    	super(props);
    	this.handleScroll = this.handleScroll.bind(this)
    }

	componentDidMount(){
		window.addEventListener('scroll',this.handleScroll);
		this.handleScroll();
		console.log(this.props.profile);
  	}
  	componentWillMount() {
  		console.log(this.props.profile);
  	}
  	handleScroll(){
  		var currentY =$(window).height() -  $('.progress-scroll').offset().top;
  		var startY = $('.progress-scroll').offset().top;
  		var currentScroll = window.scrollY + currentY - 50;
		$('.progress-scroll').css('height', currentScroll);

		$('.timeline-event.off-light').each(function() {
			// console.log($(this).offset().top - startY);
			// console.log(currentScroll);
			if($(this).offset().top - startY <= currentScroll) {
				$(this).css('background-color','#1f77ad');
				$(this).removeClass('off-light').addClass('on-light');
			}
		});

		$('.timeline-event.on-light').each(function() {
			if($(this).offset().top -startY > currentScroll) {
				$(this).css('background-color','#ecf0f1');
				$(this).removeClass('on-light').addClass('off-light');
			}
		});
  	}
  	convertText(text) {
  		if (text == null || text == '')
  			return '...';
  		else
  			return text;
  	}

	render() {
		console.log(this.props.profile)
		// this.convertProps();
		return (
			<div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
			<div className="main-content">
				<div className="progress-scroll"></div>
				<ul className="timeline">
					<li id="timeline-title">
						<h1 className="timeline-head">Tiểu sử</h1>
						<div className="timeline-badge"><i className="fa fa-user"></i></div>
					</li>
			        <li id="timeline-detail">
			        	<div className="timeline-event off-light"></div>
			          	<div className="timeline-panel">
			          		<h2>Luật sư <strong>{this.convertText(this.props.profile.fullname)}</strong></h2>
			          		<div className="hr-left"></div>
			          		<div className="timeline-content">
			          			<ul>
			          			<li className="col-md-12"><span>
                                    <i className="fa fa-anchor" aria-hidden="true"></i> <b>Lĩnh vực chuyên môn:</b> {this.convertText(this.props.profile.category)}</span>
                                </li>
                                <li className="col-md-12"><span><i className="fa fa-birthday-cake" aria-hidden="true"></i> <b>Ngày sinh</b>: {this.convertText(this.props.profile.birth)}</span>
                                </li>
                                <li className="col-md-12"><span><i className="fa fa-user-circle-o" aria-hidden="true"></i> <b>Kinh nghiệm:</b> {this.convertText(this.props.profile.exp)} năm kinh nghiệm</span>
                                </li>
                                <li className="col-md-12"><span><i className="fa fa-globe" aria-hidden="true"></i> <b>Khu vực</b>: {this.convertText(this.props.profile.area)}</span>
                                </li>
                                <li className="col-md-12"><span><i className="fa fa-users" aria-hidden="true"></i> <b>Thuộc đoàn luật sư:</b> {this.convertText(this.props.profile.clanlaw)}</span>
                                </li>
                                <li className="col-md-12"><span><i className="fa fa-university" aria-hidden="true"></i> <b>Tổ chức hành nghề:</b> {this.convertText(this.props.profile.orglaw)}</span>
                                </li>
                                <li className="col-md-12"><span><i className="fa fa-id-card-o" aria-hidden="true"></i> <b>Số thẻ hành nghề</b>: {this.convertText(this.props.profile.card_number)}</span>
                                </li>
                                <li className="col-md-12"><span><i className="fa fa-id-card-o" aria-hidden="true"></i> <b>Số chứng chỉ hành nghề</b>: {this.convertText(this.props.profile.certificate)}</span>
                                </li>
                                </ul>
			          		</div>
			          	</div>
			        </li>
			       	<li id="timeline-title">
						<h1 className="timeline-head">Giới thiệu</h1>
						<div className="timeline-badge"><i className="fa fa-info"></i></div>
					</li>
			        <li id="timeline-detail">
			        	<div className="timeline-event off-light"></div>
			          	<div className="timeline-panel">
			          		<h2>Giới thiệu về bản thân </h2>
			          		<div className="hr-left"></div>
			          		<div className="timeline-content">
			          			<p>{this.convertText(this.props.profile.intro)}
								</p>
			          		</div>
			          	</div>
			        </li>
			        <li id="timeline-title">
						<h1 className="timeline-head">Sự nghiệp</h1>
						<div className="timeline-badge"><i className="fa fa-briefcase"></i></div>
					</li>
			        <li id="timeline-detail">
			        	<div className="timeline-event off-light"></div>
			          	<div className="timeline-panel">
			          		<h2>Học vấn </h2>
			          		<div className="hr-left"></div>
			          		<div className="timeline-content">
			          			<p>{this.convertText(this.props.profile.education)}
								</p>
			          		</div>
			          	</div>
			        </li>
			        <li id="timeline-detail">
			        	<div className="timeline-event off-light"></div>
			          	<div className="timeline-panel">
			          		<h2>Nơi làm việc </h2>
			          		<div className="hr-left"></div>
			          		<div className="timeline-content">
			          			<p>{this.convertText(this.props.profile.workplace)}
								</p>
			          		</div>
			          	</div>
			        </li>
			        <li id="timeline-detail">
			        	<div className="timeline-event off-light"></div>
			          	<div className="timeline-panel">
			          		<h2>Thành tựu nghề nghiệp </h2>
			          		<div className="hr-left"></div>
			          		<div className="timeline-content">
			          			<p>{this.convertText(this.props.profile.achievement)}
								</p>
			          		</div>
			          	</div>
			        </li>
			        <li id="timeline-detail">
			        	<div className="timeline-event off-light"></div>
			          	<div className="timeline-panel">
			          		<h2>Văn bằng và chứng chỉ khác </h2>
			          		<div className="hr-left"></div>
			          		<div className="timeline-content">
			          			<p>{this.convertText(this.props.profile.othercertificate﻿)}
								</p>
			          		</div>
			          	</div>
			        </li>
			    </ul>
			</div>
			</div>
		);
	}
}
export default MainContent; 