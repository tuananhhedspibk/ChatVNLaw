import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { parse } from 'qs';
import axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

import Nav from '../homepage/nav';
import Footer from '../homepage/footer';
import Result from './result';
import SearchTool from './searchtool';
import Category from './category';

import * as constant from '../constants';

import 'react-toastify/dist/ReactToastify.min.css';
import '../../assets/styles/common/searchLaw.css';

let translate = require('counterpart');

class SearchLaw extends Component {
	constructor(props) {
		super(props)
		this.state = {
			articles: [],
			offset: 1,
			number_articles: 0,
			toast_showed: false
		};
    this.handlerCategoryType = this.handlerCategoryType.bind(this);
    this.handlerCategoryYear = this.handlerCategoryYear.bind(this);
	}

	notif() {
		toast(translate('app.search.founded') + ' ' +
			this.state.number_articles + ' '
				+ translate('app.search.results'), {type: 'success'});
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
				if (!component.state.toast_showed) {
					component.setState({toast_showed: true});
					component.notif();
				}
		})
		.catch(function (error) {
			if (!component.state.toast_showed) {
				component.setState({toast_showed: true});
				component.notif();
			}
		});
	}

	componentDidMount() {
		this.loadDataFromServer({});
	}

	handlerSearch(event) {
		event.preventDefault();
		this.setState({toast_showed: false});
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
		return(
			<div className='search-law'>
				<Nav navStyle='inverse'/>
				<ToastContainer
          position='top-right'
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover/>
				<div className='row'>
					<div className='col-sm-12 col-md-3 side-section'>
						<SearchTool handler={this.handlerSearch.bind(this)}/>
						<Category handlerType={this.handlerCategoryType}
							handlerYear={this.handlerCategoryYear}
							handlerOrgan={this.handlerCategoryOrgan}/>
					</div>
					<div className='col-sm-12 col-md-9 results'>
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
				<Footer/>
			</div>
		);
	}
}

export default SearchLaw;
