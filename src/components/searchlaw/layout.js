import React, { Component } from 'react';
import { parse } from 'qs';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';
import { EventEmitter } from 'fbemitter';
import ReactLoading from 'react-loading';

import Toast from '../notification/toast';
import Nav from '../homepage/nav';
import Footer from '../homepage/footer';
import Result from './result';
import SearchTool from './searchtool';
import Category from './category';

import * as translate from 'counterpart';
import * as constant from '../constants';
import { ax_ins } from '../../lib/constants';

import '../../assets/styles/common/searchLaw.css';

class SearchLaw extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: false,
			articles: null,
			offset: 1,
			number_articles: 0,
			pageCount: 0,
			group1: 0,
			group2_1: 0,
			group2_2: 0,
			query: '',
			group3_1: null,
			group3_2: null,
			group3_3: null
		};
		this.emitter = new EventEmitter();
	}

	componentWillMount() {
		var query = parse(this.props.location.search.substr(1))
		if(query.group1 && query.group1 === 'Có tất cả từ trên') {
			this.setState({group1: 1});
		}
		if(query.group2_1 && query.group2_1 === 'Ngày có hiệu lực') {
			this.setState({group2_1: 2});
		}
		else if (query.group2_1 && query.group2_1 === 'Ngày phát hành')
		{
			this.setState({group2_1: 2});
		}
		if(query.group2_2 && query.group2_2 === 'Cũ tới mới') {
			this.setState({group2_2: 1});
		}
		if(query.query) {
			this.setState({query: query.query});
		}
		if(query.group3_1) {
			this.setState({group3_1: query.group3_1});
		}
		if(query.group3_2) {
			this.setState({group3_2: query.group3_2});
		}
		if(query.group3_3) {
			this.setState({group3_3: query.group3_3});
		}
	}

	handlePageClick (data) {
		let component = this;
		let selected = data.selected;
		let offset = selected + 1;

		this.setState({offset: offset}, () => {
			component.loadDataFromServer({}, true);
		});
	}

	loadDataFromServer(objQuery, pageClick) {
		var component = this;
		const parsed = parse(this.props.location.search.substr(1));
		var instance = ax_ins;

		this.setState({isLoading: true});
		var defaultParams = {
			query: '',
			group1: translate('app.search.search_tool.filter.filter_1'),
			group2_1: translate('app.search.search_tool.order_by.order_by_5'),
			group2_2: translate('app.search.search_tool.order_by.order_by_3')
		}
		if(parsed.query)
			defaultParams.query = parsed.query;
		if(parsed.group1)
			defaultParams.group1 = parsed.group1;
		if(parsed.group2_1)
			defaultParams.group2_1 = parsed.group2_1;
		if(parsed.group2_2)
			defaultParams.group2_2 = parsed.group2_2;
		if(parsed.group3_1)
			defaultParams.group3_1 = parsed.group3_1;
		else if(parsed.group3_2)
			defaultParams.group3_2 = parsed.group3_2;
		defaultParams.page = this.state.offset;

		instance.get(constant.API_SEARCH_ARTICLES_URI, {params: defaultParams})
		.then(function (response) {
			component.setState({isLoading: false});
			component.setState({articles: response.data.articles,
				pageCount: response.data.limit_page,
				number_articles: response.data.number_articles});
				if(!pageClick) {
					component.emit('AddNewSuccessToast', '', translate('app.search.founded') + ' ' +
						component.state.number_articles + ' '
						+ translate('app.search.results'), 5000, () => { })
				}
		})
		.catch(function (error) {
			component.setState({isLoading: false});
			if(!pageClick) {
				component.emitter.emit('AddNewErrorToast', '',
					translate('app.search.founded') + ' ' +
					component.state.number_articles + ' '
					+ translate('app.search.results'), 5000, () => { })
			}
		});
	}

	componentDidMount() {
		var queryParams = this.props.location.search;

		if(queryParams.length <= 0) {
			this.loadDataFromServer({}, false);
		}
		else {
			this.loadDataFromServer({}, false);
		}

	}

	checkTabIsFocusOrBlur() {
		$(window).on('blur focus', function (e) {
			var prevType = $(this).data('prevType');
			if (prevType !== e.type) {
				switch (e.type) {
					case 'blur':
						$('div').text('Blured');
						break;
					case 'focus':
						$('div').text('Focused');
						break;
					default:
						break;
				}
			}
			$(this).data('prevType', e.type);
		})
	}

	handlerSearch(event) {
		if (event)
			event.preventDefault();
		var query = $('.text-search-box input').val()
		var group1 = '';
		if($('.search-term #group1 input[name=group1]:checked').length > 0) {
			group1 = $('.search-term #group1 input[name=group1]:checked')
				.val();
		}
		var group2_1 = $('.form-control[name=group2_1] option:selected')
			.val()
		var group2_2 = $('.form-control[name=group2_2] option:selected')
			.val();

		var navigateURI = constant.SEARCH_LAW_URI + '?';
		navigateURI += 'query=' + query + '&';
		navigateURI += 'group1=' + group1 + '&';
		navigateURI += 'group2_1=' + group2_1 + '&';
		navigateURI += 'group2_2=' + group2_2;

		if($('.category-filter .category-organization .filtering').length > 0) {
			var group3_1 = $('.category-filter .category-organization .filtering a').attr('value');
			navigateURI += '&group3_1=' + group3_1;
		}
		else if ($('.category-filter .category-type .filtering').length > 0) {
			var group3_2 = $('.category-filter .category-type .filtering a').attr('value');
			navigateURI += '&group3_2=' + group3_2;
		}

		window.location = navigateURI;
	}
	handlerCategoryType(val){
		if ($('.category-filter .filtering a').attr('value') === val) {
			$('.category-filter .filtering').removeClass('filtering');
		}
		else {
			$('.category-filter .filtering').removeClass('filtering');
			$(`.category-filter a[value='${val}']`).parent().addClass('filtering');	
		}
		this.handlerSearch()
	}

	handlerCategoryYear(e,j){
	}

	handlerCategoryOrgan(val){
		$('.category-filter .filtering').removeClass('filtering');
		$(`.category-filter a[value='${val}']`).parent().addClass('filtering');
		this.handlerSearch();
	}

	renderLoading() {
		return(
			<ReactLoading className='loading-symbol'
				type='cylon' color='#337ab7'
				height='125' width='125'/>					
		)
	}

	render() {
		return (
			<div className='search-law'>
				<Nav navStyle='inverse'/>
				<Toast emitter={this.emitter} />
				<div className='search-law-inner container'>
					<div className='row'>
						<div className='col-sm-12 col-md-4'>
							<div className='side-section'>
								<SearchTool handler={this.handlerSearch.bind(this)} group1={this.state.group1}
									group2_1={this.state.group2_1} group2_2={this.state.group2_2} 
									query={this.state.query}/>
								<Category handlerType={this.handlerCategoryType.bind(this)}
									handlerYear={this.handlerCategoryYear.bind(this)}
									handlerOrgan={this.handlerCategoryOrgan.bind(this)}
									group3_1={this.state.group3_1} group3_2={this.state.group3_2} 
									group3_3={this.state.group3_3}/>
							</div>
						</div>
						<div className='col-sm-12 col-md-8 results'>
							{
								this.state.isLoading ? (
									this.renderLoading()
								):
								(
									this.state.articles === null ? (
										<div className='not-found-any-results'>
											{translate('app.search.founded') + ' 0 ' + translate('app.search.results')}
											<div className='symbol-not-found'>
												{translate('app.search.not_found_symbol')}
											</div>
										</div>
									) :
									(
										this.state.articles.map(function(article, i) {
											return(
												<Result article={article} number={i}/>
											);
										})
									)
								)
							}
							<ReactPaginate
								previousLabel={translate('app.home.previous')}
								nextLabel={translate('app.home.next')}
								breakLabel={<a href=''>...</a>}
								breakClassName={'break-me'}
								pageCount={this.state.pageCount}
								marginPagesDisplayed={2}
								pageRangeDisplayed={5}
								onPageChange={this.handlePageClick.bind(this)}
								containerClassName={'pagination'}
								subContainerClassName={'pages pagination'}
								activeClassName={'active'} />
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default SearchLaw;
