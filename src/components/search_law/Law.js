import React, { Component } from 'react';

class Law extends Component {
	render() {
		return(
			<div className="law-item">
			  	<div className="law-title">
			    	<a href="routes link to articles">{this.props.article.title}</a>
			    </div>
			  	<div className="law-detail-content">
			    	<div className="main-content">
			      		<div className="link">
					        <ul>
					          <li className="source">
					            <i className="fa fa-file-pdf-o"></i> Bản PDF
					          </li>
					          <li className="ref">
					            <i className="fa fa-file-text-o"></i> Văn bản liên quan
					          </li>
					          <li className="attribute">
					            <i className="fa fa-sitemap"></i> Thuộc tính
					          </li>
					        </ul>
					        <ul>
					          <li className="map">
					            <i className="fa fa-bar-chart"></i> Biểu đồ
					          </li>
					          <li className="download">
					            <i className="fa fa-download"></i> Tải về
					          </li>
					        </ul>
				      	</div>
				    </div>
				    <div className="law-status">
				      	<div className="public-day">
				        	<div className="sub-title">Ban hành: {this.props.article.public_day}</div>
				    	</div>
				      	<div className="effect-day">
				        	<div className="sub-title">Hiệu lực: {this.props.article.effect_day}</div>
				    	</div>
					    <div className="effect-status">
					        <div className="value">{this.props.article.effect_status}</div>
					    </div>
					</div>
				</div>
			</div>
			);
	}
}
export default Law;
