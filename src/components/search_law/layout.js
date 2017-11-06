import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { parse } from 'qs';
import axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';

import Nav from '../homepage/nav';
import Result from '../search_law/result';
import SearchTool from '../search_law/searchTool';
import Category from '../search_law/category';

import * as constant from '../constants';

import 'react-toastify/dist/ReactToastify.min.css';
import '../../assets/styles/common/searchLaw.css';

let translate = require('counterpart');

class SearchLaw extends Component {
	constructor(props) {
		super(props)
		this.state = {
			articles: [],
			defaultQuery: '',
			perPage: 6
		};
    this.handlerCategoryType = this.handlerCategoryType.bind(this);
    this.handlerCategoryYear = this.handlerCategoryYear.bind(this);
	}

	notif() {
		toast(translate('app.search.founded') + ' ' +
			this.state.articles.length + ' ' + translate('app.search.results'), {type: 'success'});
	}

	componentDidMount() {
		var component = this;
		const parsed = parse(this.props.location.search.substr(1));
		this.setState({defaultQuery:parsed.query})
		var instance = axios.create({
      baseURL: constant.API_BASE_URL
    });
		
		instance.get(constant.API_SEARCH_URI, {params:parsed})
    .then(function (response) {
			component.setState({articles: response.data.articles});
			component.notif();
    })
    .catch(function (error) {
			console.log(error);
			component.notif();
		});

		$('.text-search-box input').val(parsed.query);
		
    if (parsed.group2_1) {
      $('.form-control[name="group2_1"]').val(parsed.group2_1)
		}
		if (parsed.group2_2) {
      $('.form-control[name="group2_2"]').val(parsed.group2_2)
		}
		if (parsed.group1) {
			$('input:radio[name="group1"]')
				.filter('[value="' + parsed.group1 + '"]').attr('checked', true);
		}
	}

	handlerSearch() {
		var query = 'query=' + $('.text-search-box input').val()
		var group1 = '';
		if($('.search-term #group1 input[name=group1]:checked').length >0) {
			group1 = '&group1=' + 
				$('.search-term #group1 input[name=group1]:checked').val();
		}
		var group2_1 ='&group2_1=' + 
			$('.form-control[name=group2_1] option:selected').val()
		var group2_2 = '&group2_2=' + 
			$('.form-control[name=group2_2] option:selected').val()
		window.location = constant.BASE_URL + '/search-law?' + query
			+ group1 + group2_2 + group2_1;
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
						<Category handlerType={this.handlerCategoryType}
							handlerYear={this.handlerCategoryYear}
							handlerOrgan={this.handlerCategoryOrgan}/>
						<SearchTool handler={this.handlerSearch}/>
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
										<div key={i}>
											<Result article={article} number={i}/>
										</div>
									);
								})
							)
						}
					</div>
				</div>
			</div>
		);
	}
}

export default SearchLaw;
