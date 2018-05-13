import React, { Component } from 'react';

import * as translate from 'counterpart';

class ArticleTopics extends Component {
	renderTopics() {
		var topics = []
		if(this.props.topics != null) {
			topics  = this.props.topics.split('#');
			if (topics.length > 5) {
				var ct = 0;
				var filter_topics = [];
				while (ct < 5) {
					var item = topics[Math.floor(Math.random() * topics.length)];
					if (filter_topics.indexOf(item) === -1) {
						filter_topics.push(item);
						ct ++;
					}
				}
				return (
					filter_topics.map((topic, index) => {
						return (
							<div className='topic-element' key={index}>
								{topic}
							</div>
						);
					})
				)
			}
			else {
				return (
					topics.map((topic,index) => {
						return (
							<div className='topic-element' key={index}>
								{topic}
							</div>
							);
					})
				)
			}
		}
	}
	render() {
		return (
			<div className='article-topics'>
				<div className='article-topics-div'>
					<div className='topics-title'><i className='fa fa-key'></i>
						{translate('app.article.keyword')}
					</div>
					<div className='topics-detail'>
					{this.renderTopics()}
					</div>
				</div>
			</div>
			);
	}
}

export default ArticleTopics;
