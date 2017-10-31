import React, { Component } from 'react';

import Nav from '../homepage/Nav';
import ReactDOM from 'react-dom';
import Law from '../search_law/Law';
import SearchTool from '../search_law/SearchTool';
import Category from '../search_law/Category';
import '../../assets/styles/search_law/search_law.css';
import { parse } from 'qs';
import axios from 'axios';
import $ from 'jquery';
import * as constant from '../constants';


class SearchLaw extends Component {
	constructor(props) {
		super(props)
			this.state = {
				articles: [],
				defaultQuery:''
			};
       		this.handlerCategoryType = this.handlerCategoryType.bind(this);
       		this.handlerCategoryYear = this.handlerCategoryYear.bind(this);

	}
	componentDidMount() {
		var component = this;
		const parsed = parse(this.props.location.search.substr(1));
		console.log(parsed)
		this.setState({defaultQuery:parsed.query})
		var instance = axios.create({
          baseURL: 'http://localhost:4000/api'
        });
        instance.get('/searches',{params:parsed})
          .then(function (response) {
            component.setState({articles: response.data.articles});
            console.log(component.state.articles);
          })
          .catch(function (error) {
            console.log(error);
          })
        $('.text-search-box input').val(parsed.query)
        if (parsed.group2_1)
        	$('.form-control[name="group2_1"]').val(parsed.group2_1)
        if (parsed.group2_2)
        	$('.form-control[name="group2_2"]').val(parsed.group2_2)
        if (parsed.group1)
        	$('input:radio[name="group1"]').filter('[value="'+parsed.group1+'"]').attr('checked', true);
	}

	handlerSearch() {
		var query ='query=' + $('.text-search-box input').val()
		var group1 ='';
		if($('.search-term #group1 input[name=group1]:checked').length >0)
			group1 = '&group1='+ $('.search-term #group1 input[name=group1]:checked').val()
		var group2_1 ='&group2_1='+ $('.form-control[name=group2_1] option:selected').val()
		var group2_2 = '&group2_2='+ $('.form-control[name=group2_2] option:selected').val()
        window.location = constant.BASE_URL+'/search-law?'+query+group1+group2_2+group2_1
	}
	handlerCategoryType({target}) {
        window.location = constant.BASE_URL+'/search-law?'+'article_type='+target.attributes.getNamedItem("value").value
	}
	handlerCategoryYear({target}) {
		var from_y = 'from_year=' + target.attributes.getNamedItem("from").value
		var to_y = '&to_year=' + target.attributes.getNamedItem("to").value
        window.location = constant.BASE_URL+'/search-law?'+ from_y + to_y
	}
	render() {
		return(
			<div className="search-law">
				<Nav />
				<div className="search-law-super-stack">
					<Category handlerType={this.handlerCategoryType} handlerYear={this.handlerCategoryYear}/>
					<div className="search-law-stack">
						<div className="search-law-combo">
							<SearchTool handler = {this.handlerSearch}/>
						</div>
						<div className="result-report" >
							<h4>Tìm thấy <span className="result-sum">{this.state.articles.length}</span> văn bản</h4>
						</div>
						<div className="result-law">
							{
								this.state.articles.map(function(article,i) {
									return(
										<div key = {i}>
											<Law article={article} number={i}/>
										</div>
								);
								})
							}
						</div>
					</div>
				</div>
			</div>
			);
	}
}
export default SearchLaw;
