import React, { Component } from 'react';

import * as translate from 'counterpart';
import * as constant from '../constants';

class Result extends Component {
	render() {
		return(
			<div className='law-item'>
				<a href={constant.BASE_URL +
					constant.LAW_URI+ this.props.article.id}>
						<div className='law-title'>
							<a title={this.props.article.title}
								href={constant.BASE_URL + constant.LAW_URI+ this.props.article.id}>
									{this.props.article.title}
							</a>
							{
								this.props.article.effect_status ==
									translate('app.home.search_law.effect_status_1') ?
								(
									<label className='validated'>
										{this.props.article.effect_status}
									</label>
								):
								(
									this.props.article.effect_status ==
										translate('app.home.search_law.effect_status_2') ?
									(
										<label className='expired'>
											{this.props.article.effect_status}
										</label>
									):
									(
										<label className='half-expired'>
											{this.props.article.effect_status}
										</label>
									)
								)
							}
						</div>
						<div className='law-detail-content'>
							<div className='law-status'>
								<div className='public-day'>
									<div className='sub-title'>
										<label>
											{translate('app.search.search_tool.order_by.order_by_1')}:
										</label>
										{new Date(this.props.article.public_day).toLocaleDateString('en-US')}
									</div>
								</div>
								<div className='effect-day'>
									<div className='sub-title'>
										<label>
											{translate('app.search.search_tool.order_by.order_by_2')}:
										</label>
										{new Date(this.props.article.effect_day).toLocaleDateString('en-US')}
									</div>
								</div>
								<div className='effect-status'>
								</div>
							</div>
						</div>
				</a>
			</div>
		);
	}
}

export default Result;
