import React, { Component } from 'react';
import $ from 'jquery';

let translate = require('counterpart');

class SearchTool extends Component {
	componentDidMount() {
		$('#search-form-body').addClass('show');
		$('.search-law-tool').find('.title').removeClass('collapsed');
		if (this.props.group1 === 0)
			$('#filter1').attr('checked', true);
		else
			$('#filter2').attr('checked', true);
		if (this.props.group2_1 === 0)
			$('#group2_1 option[id=val3]').attr('selected','selected');
		else if (this.props.group2_1 === 1)
			$('#group2_1 option[id=val1]').attr('selected','selected');
		else
			$('#group2_1 option[id=val2]').attr('selected','selected');
		if (this.props.group2_2 === 0)
			$('#group2_2 option[id=val1]').attr('selected','selected');
		else
			$('#group2_2 option[id=val2]').attr('selected','selected');	
		$('.text-search-box input').val(this.props.query)
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
										<select className='form-control topic' name='group2_1' id='group2_1'>
											<option id='val3' 
												value={translate('app.search.search_tool.order_by.order_by_5')}>
													{translate('app.search.search_tool.order_by.order_by_5')}
											</option>
											<option id='val1' 
												value={translate('app.search.search_tool.order_by.order_by_1')}>
													{translate('app.search.search_tool.order_by.order_by_1')}
											</option>
											<option id='val2' 
												value={translate('app.search.search_tool.order_by.order_by_2')}>
													{translate('app.search.search_tool.order_by.order_by_2')}
											</option>
										</select>
										<select className='form-control' name='group2_2' id='group2_2'>
											<option id='val1' 
												value={translate('app.search.search_tool.order_by.order_by_3')}>
													{translate('app.search.search_tool.order_by.order_by_3')}
											</option>
											<option id='val2' 
												value={translate('app.search.search_tool.order_by.order_by_4')}>
													{translate('app.search.search_tool.order_by.order_by_4')}
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
