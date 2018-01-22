import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { parse } from 'qs';
import axios from 'axios';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';
import Toast from '../notification/toast';
import { EventEmitter } from 'fbemitter';

import Nav from '../homepage/nav';
import Footer from '../homepage/footer';
import Result from './result';
import SearchTool from './searchtool';
import Category from './category';

import * as constant from '../constants';

import '../../assets/styles/common/searchLaw.css';

let translate = require('counterpart');

class SearchLaw extends Component {
	constructor(props) {
		super(props)
		this.state = {
			articles: [],
			offset: 1,
			number_articles: 0,
		};
		this.emitter = new EventEmitter();
		this.handlerCategoryType = this.handlerCategoryType.bind(this);
		this.handlerCategoryYear = this.handlerCategoryYear.bind(this);
	}

	handlePageClick (data) {
		let component = this;
		let selected = data.selected;
		let offset = this.state.offset + 1;

		this.setState({offset: offset}, () => {
				component.loadDataFromServer({});
		});
	}

	loadDataFromServer(objQuery) {
		var component = this;
		const parsed = parse(this.props.location.search.substr(1));
		var instance = axios.create({
			baseURL: constant.API_BASE_URL
		});

		if (objQuery.group2_2 != '') {
			parsed.query = objQuery.query;
			parsed.group1 = objQuery.group1;
			parsed.group2_1 = objQuery.group2_1;
			parsed.group2_2 = objQuery.group2_2;
		}
		parsed.page = this.state.offset;

		instance.get(constant.API_SEARCH_URI, {params: parsed})
		.then(function (response) {
			component.setState({articles: response.data.articles,
				pageCount: response.data.limit_page,
				number_articles: response.data.number_articles});
				component.emitter.emit('AddNewSuccessToast', '', translate('app.search.founded') + ' ' +
					component.state.number_articles + ' '
					+ translate('app.search.results'), 5000, () => { })
		})
		.catch(function (error) {
			component.emitter.emit('AddNewErrorToast', '', translate('app.search.founded') + ' ' +
				component.state.number_articles + ' '
				+ translate('app.search.results'), 5000, () => { })
		});
	}

	componentDidMount() {
		this.loadDataFromServer({});
		// this.checkTabIsFocusOrBlur();
	}

	checkTabIsFocusOrBlur() {
		var component = this;
		$(window).on("blur focus", function (e) {
			var prevType = $(this).data("prevType");

			if (prevType != e.type) {   //  reduce double fire issues
				switch (e.type) {
					case "blur":
						$('div').text("Blured");
						// component.setState({ isFocused: false })
						console.log("blured");

						// $('div').text("Blured");
						break;
					case "focus":
						// component.setState({ isFocused: true })
						$('div').text("Focused");
						console.log("focus");

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
		var objQuery = {query: query,
			group1: group1, group2_1: group2_1, group2_2: group2_2};
		this.loadDataFromServer(objQuery);
	}

	handlerCategoryOrgan({target}) {

	}

	handlerCategoryType({target}) {
		window.location = constant.BASE_URL +
			'/search-law?' + 'article_type='
			+ target.attributes.getNamedItem('value').value
	}

	handlerCategoryYear({target}) {
		var from_y = 'from_year=' + target.attributes.getNamedItem('from').value
		var to_y = '&to_year=' + target.attributes.getNamedItem('to').value
      window.location = constant.BASE_URL + '/search-law?' + from_y + to_y
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
