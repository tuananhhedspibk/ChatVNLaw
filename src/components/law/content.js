import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import * as constant from '../constants';

class ArticleContent extends Component {



	render() {
		return (
			<div className="article-content">
				<div className="law-content" dangerouslySetInnerHTML={{ __html: this.props.art_html }} />
			</div>
			);
	}
}

export default ArticleContent;
