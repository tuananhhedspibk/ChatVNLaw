import React, { Component } from 'react';
import $ from 'jquery';

let translate = require('counterpart');

class SearchTool extends Component {
	componentDidMount() {
		$('#search-form-body').addClass('show');
		$('.search-law-tool').find('.title').removeClass('collapsed');
	}

	render() {
		return(
			<div className='search-law-tool'>
				<button className='title collapsed' data-toggle='collapse'
					data-target='#search-form-body'>
					<i className='fa fa-search' aria-hidden='true'></i>
					{translate('app.search.search_tool.title')}
				</button>
				<form onSubmit={this.props.handler} >
			    <div className='search-law-tool-body collapse' id='search-form-body'>
			      <div className='text-search-box'>
			        <input type='text' name='query' id='query'
								className='form-control'
								placeholder={translate('app.search.search_tool.key_search')}/>
			      </div>
			      <div className='filter-list'>
			        <div className='search-term'>
								<div id='group1'>
									<div className='ui toggle checkbox'>
										<input id='filter1' type='radio' name='group1'
											value={translate('app.search.search_tool.filter.filter_1')}/>
										<label htmlFor='filter1'>
											{translate('app.search.search_tool.filter.filter_1')}
										</label>
									</div>
									<div className='ui toggle checkbox'>
										<input id='filter2' type='radio' name='group1'
											value={translate('app.search.search_tool.filter.filter_2')}/>
										<label id='label-fil2' htmlFor='filter2'>
											{translate('app.search.search_tool.filter.filter_2')}
										</label>
									</div>
								</div>
								<div id='group2'>
									<label>
										{translate('app.search.search_tool.order_by.title')}
									</label>
									<div className='select-section'>
										<select className='form-control topic' name='group2_1'>
											<option 
												value={translate('app.search.search_tool.order_by.order_by_1')}>
													{translate('app.search.search_tool.order_by.order_by_1')}
											</option>
											<option 
												value={translate('app.search.search_tool.order_by.order_by_2')}>
													{translate('app.search.search_tool.order_by.order_by_2')}
											</option>
										</select>
										<select className='form-control' name='group2_2'>
											<option
												value={translate('app.search.search_tool.order_by.order_by_3')}>
													{translate('app.search.search_tool.order_by.order_by_3')}
											</option>
											<option
												value={translate('app.search.search_tool.order_by.order_by_1')}>
													{translate('app.search.search_tool.order_by.order_by_1')}
											</option>
										</select>
									</div>
								</div>
			        </div>
						</div>
						<div className='submit-btn'>
							<button className='btn'
								onClick={this.props.handler}>
									{translate('app.search.search_tool.title')}	
							</button>
						</div>
			    </div>
			  </form>
			</div>
		);
	}
}

export default SearchTool;
