import React, { Component } from 'react';

class ArticleContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			full_html: ''
		}
	}

	componentDidMount() {
		var full_html = this.props.art_html;
		full_html = full_html.replace(/\\r\\n/g, '');
		full_html = full_html.replace(/\\n\\r/g, '');
		full_html = full_html.replace(/\\t\\n/g, '');
		full_html = full_html.replace(/\\n\\t/g, '');
		full_html = full_html.replace(/\\r\\t/g, '');
		full_html = full_html.replace(/\\t\\r/g, '');
		full_html = full_html.replace(/\\n/g, '');
		this.setState({full_html: full_html});
	}

	render() {
		return (
			<div className='article-content'>
				<div className='law-content'
					dangerouslySetInnerHTML={{ __html: this.state.full_html}} />
			</div>
		);	
	}
}

export default ArticleContent;
