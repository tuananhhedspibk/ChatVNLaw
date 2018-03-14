import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as constant from '../constants';
import * as translate from 'counterpart';

class ArticleIndex extends Component {
	render() {
		return (
			<div className='index'>
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
