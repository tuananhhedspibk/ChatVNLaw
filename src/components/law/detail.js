import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as constant from '../constants';

import * as translate from 'counterpart';

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
						<tr>
							<th>{translate('app.article.numerical_symbol')}</th>
							<td>{this.props.detail.numerical_symbol}</td>
							<th>{translate('app.article.public_day')}</th>
							<td>{this.props.detail.public_day}</td>
						</tr>
						<tr>
							<th>{translate('app.article.article_type')}</th>
							<td>{this.props.detail.article_type}</td>
							<th>{translate('app.article.effect_day')}</th>
							<td>{this.props.detail.effect_day}</td>
						</tr>				
						<tr>
							<th>{translate('app.article.source')}</th>
							<td>{this.props.detail.source}</td>
							<th>{translate('app.article.day_report')}</th>
							<td>{this.props.detail.day_report}</td>
						</tr>				
						<tr>
							<th>{translate('app.article.agency_issued')}</th>
							<td colSpan={3}>{this.props.detail.agency_issued}</td>
						</tr>				
						<tr>
							<th>{translate('app.article.signer_title')} ký</th>
							<td>{this.props.detail.signer_title}</td>
							<td colSpan={2}>{this.props.detail.the_signer}</td>
						</tr>				
						<tr>
							<th>{translate('app.article.scope')}</th>
							<td colSpan={3}>{this.props.detail.scope}</td>
						</tr>				
						<tr>
							<td colSpan={4} className='effect-status'>
								{this.props.detail.effect_status}
							</td>
						</tr>				
						<tr>
							<th>{translate('app.article.expire_day')}</th>
							<td colSpan={3}></td>
						</tr>				
					</tbody>
				</table>
			</div>
		);
	}
}

export default ArticleDetail;
