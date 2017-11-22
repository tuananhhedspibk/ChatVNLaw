import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import * as constant from '../constants';

class ArticleIndex extends Component {

	render() {
		return (
			<div className="index">
				<div className="title">Muc luc</div>
				<div className="content" dangerouslySetInnerHTML={{ __html: this.props.index_html }} />
			</div>
			);
	}
}

export default ArticleIndex;
