import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import * as constant from '../constants';

class ArticleDetail extends Component {



	render() {
		return (
			<div className="article-detail">
				<table>
					<thead>
						<tr><th colSpan={4}>
							{this.props.detail.article_type + " " + this.props.detail.title}
						</th></tr>
					</thead>
					<tbody>	
						<tr><th>Số ký hiệu</th><td>{this.props.detail.numerical_symbol}</td><th>Ngày ban hành</th><td>{this.props.detail.public_day}</td></tr>
						<tr><th>Loại văn bản</th><td>{this.props.detail.article_type}</td><th>Ngày có hiệu lực</th><td>{this.props.detail.effect_day}</td></tr>				
						<tr><th>Nguồn thu thập</th><td>{this.props.detail.source}</td><th>Ngày đăng công báo</th><td>{this.props.detail.day_report}</td></tr>				
						<tr><th>Cơ quan ban hành</th><td colSpan={3}>{this.props.detail.agency_issued}</td></tr>				
						<tr><th>Chức danh / Người ký</th><td>{this.props.detail.signer_title}</td><td colSpan={2}>{this.props.detail.the_signer}</td></tr>				
						<tr><th>Phạm vi</th><td colSpan={3}>{this.props.detail.scope}</td></tr>				
						<tr><td colSpan={4} className="effect-status">{this.props.detail.effect_status}</td></tr>				
						<tr><th>Ngày hết hiệu lực</th><td colSpan={3}></td></tr>				
					</tbody>
				</table>
			</div>
			);
	}
}

export default ArticleDetail;
