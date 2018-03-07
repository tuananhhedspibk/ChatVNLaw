import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { parse } from 'qs';
import axios from 'axios';
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

import '../../assets/styles/common/searchLaw.css';

class SearchLaw extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: false,
			articles: [],
			offset: 1,
			number_articles: 0,
			pageCount: 0
		};
		this.emitter = new EventEmitter();
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
		var instance = axios.create({
			baseURL: constant.API_BASE_URL
		});

		if (!!objQuery.query) {
			parsed.query = objQuery.query;
			parsed.group1 = objQuery.group1;
			parsed.group2_1 = objQuery.group2_1;
			parsed.group2_2 = objQuery.group2_2;
		}
		parsed.page = this.state.offset;

		this.setState({isLoading: true});

		instance.get(constant.API_SEARCH_ARTICLES_URI, {params: parsed})
		.then(function (response) {
			component.setState({isLoading: false});
			component.setState({articles: response.data.articles,
				pageCount: response.data.limit_page,
				number_articles: response.data.number_articles});
				if(!pageClick) {
					component.emitter.emit('AddNewSuccessToast', '', translate('app.search.founded') + ' ' +
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
			queryParams = queryParams.substr(1, queryParams.length - 1).split('&');
			var queryObj = {};
			queryObj.query = queryParams[0].split("=")[1];
			queryObj.group1 = queryParams[1].split("=")[1];
			queryObj.group2_1 = queryParams[2].split("=")[1];
			queryObj.group2_2 = queryParams[3].split("=")[1];
			this.loadDataFromServer(queryObj, false);
		}
	}

	checkTabIsFocusOrBlur() {
		var component = this;
		$(window).on("blur focus", function (e) {
			var prevType = $(this).data("prevType");

			if (prevType != e.type) {
				switch (e.type) {
					case "blur":
						$('div').text("Blured");
						break;
					case "focus":
						$('div').text("Focused");
						break;
				}
			}

			$(this).data("prevType", e.type);
		})
	}

	handlerSearch(event) {
		event.preventDefault();
		var query = $('.text-search-box input').val()
		var group1 = '';
		if($('.search-term #group1 input[name=group1]:checked').length >0) {
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
		window.location = navigateURI;
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
								<SearchTool handler={this.handlerSearch.bind(this)}/>
								<Category handlerType={this.handlerCategoryType}
									handlerYear={this.handlerCategoryYear}
									handlerOrgan={this.handlerCategoryOrgan}/>
							</div>
						</div>
						<div className='col-sm-12 col-md-8 results'>
							{
								this.state.isLoading ? (
									this.renderLoading()
								):
								(
									this.state.articles.length === 0 ? (
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
