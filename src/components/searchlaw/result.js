import React, { Component } from 'react';
import * as translate from 'counterpart';

class Result extends Component {
	render() {
		return(
			<div className='law-item'>
				<div className='law-title'>
					<a title={this.props.article.title}
						href='routes link to articles'>
							{this.props.article.title}
					</a>
				</div>
				<div className='law-detail-content'>
					<div className='law-status'>
						<div className='public-day'>
							<div className='sub-title'>
								{translate('app.search.search_tool.order_by.order_by_1')}: {this.props.article.public_day}
							</div>
						</div>
						<div className='effect-day'>
							<div className='sub-title'>
								{translate('app.search.search_tool.order_by.order_by_2')}: {this.props.article.effect_day}
							</div>
						</div>
						<div className='effect-status'>
							<div className='value'>
								{this.props.article.effect_status}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Result;
