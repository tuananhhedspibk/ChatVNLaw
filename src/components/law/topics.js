import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as constant from '../constants';

class ArticleTopics extends Component {
	renderTopics() {
		var topics = []
		if(this.props.topics != null)
			topics  = this.props.topics.split(',');
		return (
			topics.map((topic,index) => {
				console.log(topic)
				return (
					<div className='topic-element' key={index}>
						{topic}
					</div>
					);
			})
			)
	}
	render() {
		return (
			<div className='article-topics'>
				<div className='article-topics-div'>
					<div className='topics-title'><i className="fa fa-key"></i> Các từ khóa liên quan:</div>
					<div className='topics-detail'>
					{this.renderTopics()}
					</div>
				</div>
			</div>
			);
	}
}

export default ArticleTopics;
