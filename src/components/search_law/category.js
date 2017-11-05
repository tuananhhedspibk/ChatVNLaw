import React, { Component } from 'react';

let translate = require('counterpart');

class Category extends Component {
	renderCategory(type, numberItem) {
		var handleFunction = '';
		var itemIndex = [];
		for(var i = 1; i <= numberItem ; i++) {
			itemIndex.push(i);
		}
		if (type === 'organ') {
			handleFunction = this.props.handlerOrgan;
		}
		else if (type === 'type') {
			handleFunction = this.props.handlerType;
		}
		else if (type === 'year') {
			handleFunction = this.props.handlerYear;
		}
		if (type != 'year') {
			return(
				itemIndex.map(i => {
					return(
						<div className='category-item'>
							<a onClick={handleFunction}
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
		else {
			return (
				itemIndex.map(i => {
					return(
						<div className='category-item'>
							<a onClick={handleFunction}
								from={translate('app.search.category_' +
									type + '.' + type + '_' + i + '.from')}
								to={translate('app.search.category_' +
									type + '.' + type + '_' + i + '.to')}
								href='#'>
									{translate('app.search.category_' + type +
										'.' + type + '_' + i + '.title')}
							</a>
						</div>
					)
				})
			)
		}
	}

	render() {
		return (
			<div className='category-filter'>
				<div className='title'>
					<i className='fa fa-filter' aria-hidden='true'></i>
					{translate('app.search.category_title')}
				</div>
				<div className='category-organization'>
					<button className='category-filter-title'
						data-toggle='collapse' data-target='#organ-content'>
						{translate('app.search.category_organ.title')}
					</button>
					<div className='collapse category-filter-content' id='organ-content'>
						{this.renderCategory('organ', 6)}
					</div>
				</div>
				<div className='category-type'>
					<button className='category-filter-title'
						data-toggle='collapse' data-target='#type-content'>
						{translate('app.search.category_type.title')}
					</button>
					<div className='collapse category-filter-content'
						id='type-content'>
						{this.renderCategory('type', 11)}
					</div>
				</div>
				<div className='category-year'>
					<button className='category-filter-title'
						data-toggle='collapse' data-target='#year-content'>
						{translate('app.search.category_year.title')}
					</button>
					<div className='collapse category-filter-content'
						id='year-content'>
						{this.renderCategory('year', 8)}
					</div>
				</div>
			</div>	
		);
	}
}

export default Category;
