import React, { Component } from 'react';

import * as translate from 'counterpart';

class ArticleIndex extends Component {
	render() {
		return (
			<div className='article-index'>
				<div className='title'>
					{translate('app.article.index')}
				</div>
				<div className='content'
					dangerouslySetInnerHTML={{ __html: this.props.index_html }} />
			</div>
		);
	}
}

export default ArticleIndex;
