import React, { Component } from 'react';
import $ from 'jquery';

import * as translate from 'counterpart';

class Category extends Component {

	componentDidMount() {
		if(this.props.group3_1 || this.props.group3_2) {
			$('.category-filter .title').removeClass('collapsed');
			$('.category-filter .title').attr('aria-expanded', true);
			$('.category-filter .collapse').first().addClass('show');
			if (this.props.group3_1) {
				$('.category-filter-title.org-filter').removeClass('collapsed');
				$('.category-filter-title.org-filter').attr('aria-expanded', true);
				$('.category-organization .collapse').first().addClass('show');
				if ($(`.category-organization #organ-content a[value='${this.props.group3_1}']`)) {
					$(`.category-organization #organ-content a[value='${this.props.group3_1}']`).parent().addClass('filtering');
				}
			}
			else if (this.props.group3_2) {
				$('.category-filter-title.type-filter').removeClass('collapsed');
				$('.category-filter-title.type-filter').attr('aria-expanded', true);
				$('.category-type .collapse').first().addClass('show');
				if ($(`.category-type #type-content a[value='${this.props.group3_2}']`)) {
					$(`.category-type #type-content a[value='${this.props.group3_2}']`).parent().addClass('filtering');
				}
			}
		}
	}

	renderCategory(type, numberItem) {
		var handleFunction = this.props.handlerFilterResult;
		var itemIndex = [];
		for(var i = 1; i <= numberItem ; i++) {
			itemIndex.push(i);
		}

		return(
			itemIndex.map(i => {
				return(
					<div className='category-item'>
						<a onClick={handleFunction.bind(null,
							translate('app.search.category_' + type +
								'.' + type + '_' + i))}
							value={translate('app.search.category_' + type +
								'.' + type + '_' + i)}
							href='#'>
								{translate('app.search.category_' + type +
									'.' + type + '_' + i)}
						</a>
					</div>
				)
			})
		)
	}

	render() {
		return (
			<div className='category-filter'>
				<button className='title collapsed' data-toggle='collapse'
					data-target='#category-content'>
					<i className='fa fa-filter' aria-hidden='true'></i>
					{translate('app.search.category_title')}
				</button>
				<div className='collapse' id='category-content'>
					<div className='category-item category-organization'>
						<button className='category-filter-title collapsed  org-filter'
							data-toggle='collapse' data-target='#organ-content'>
							{translate('app.search.category_organ.title')}
						</button>
						<div className='collapse category-filter-content' id='organ-content'>
							{this.renderCategory('organ', 7)}
						</div>
					</div>
					<div className='category-item category-type'>
						<button className='category-filter-title collapsed type-filter'
							data-toggle='collapse' data-target='#type-content'>
							{translate('app.search.category_type.title')}
						</button>
						<div className='collapse category-filter-content'
							id='type-content'>
							{this.renderCategory('type', 11)}
						</div>
					</div>
				</div>
			</div>	
		);
	}
}

export default Category;
