import React, { Component } from 'react';

let translate = require('counterpart');

class SearchTool extends Component {
	render() {
		return(
			<div className='search-law-tool'>
				<form onSubmit={this.props.handler} >
			    <div className='title'>
						<i className='fa fa-search' aria-hidden='true'></i>
						{translate('app.search.search_tool.title')}
					</div>
			    <div className='search-law-tool-body'>
			      <div className='text-search-box'>
			        <input type='text' name='query' id='query'
								className='form-control'
								placeholder={translate('app.search.search_tool.key_search')}/>
			      </div>
			      <div className='filter-list'>
			        <div className='search-term'>
								<div id='group1'>
									<label htmlFor='filter1'>
										<input id='filter1' type='radio' name='group1'
											value={translate('app.search.search_tool.filter.filter_1')}/>
											{translate('app.search.search_tool.filter.filter_1')}
									</label>
									<label id='label-fil2' htmlFor='filter2'>
										<input id='filter2' type='radio' name='group1'
											value={translate('app.search.search_tool.filter.filter_2')}/>
											{translate('app.search.search_tool.filter.filter_2')}
									</label>
								</div>
								<div id='group2'>
									<label>Sắp xếp theo</label>
									<select className='form-control topic' name='group2_1'>
										<option value='Ngày ban hành'>Ngày ban hành</option>
										<option value='Ngày hiệu lực'>Ngày hiệu lực</option>
									</select>
									<select className='form-control' name='group2_2'>
										<option value='Mới đến cũ'>Mới đến cũ</option>
										<option value='Cũ đến mới'>Cũ đến mới</option>
									</select>
								</div>
			        </div>
						</div>
						<button className='btn btn-info'
							onClick={this.props.handler}>
								{translate('app.search.search_tool.title')}	
						</button>
			    </div>
			  </form>
			</div>
		);
	}
}

export default SearchTool;
