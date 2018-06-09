import React, { Component } from 'react';

import * as translate from 'counterpart';

class ArticleDetail extends Component {

	componentDidMount() {
		var script= document.createElement('script');
		script.type= 'application/ld+json';

		var text = `{ 
			"@context": "http://schema.org", 
			"@type": "NewsArticle", 
			"mainEntityOfPage": { 
				"@type": "WebPage", 
				"@id": "https://vnlaw.datalab.vn/searchlaw" 
			}, 
			"headline": "${this.props.detail.article_type} ${this.props.detail.numerical_symbol}", 
			"image": [ 
				"https://vnlaw.datalab.vn/static/media/app_logo.5c75486f.png" 
				], 
			"datePublished": "${this.props.detail.public_day}", 
			"dateModified": "${this.props.detail.public_day}", 
			"author": { 
				"@type": "Person", 
				"name": "${this.props.detail.signer_title} ${this.props.detail.the_signer}" 
			}, 
				"publisher": { 
				"@type": "Organization", 
				"name": "${this.props.detail.agency_issued}", 
				"logo": { 
					"@type": "ImageObject", 
					"url": "http://fn.thainguyen.edu.vn/UploadImages/thainguyen/hai2016/logo.png" 
				} 
			}, 
			"description": "${this.props.detail.title}" 
		}`
		var t = document.createTextNode(text); 
		script.appendChild(t);
		document.head.appendChild(script);
	}

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
							<th>{translate('app.article.signer_title')}</th>
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
