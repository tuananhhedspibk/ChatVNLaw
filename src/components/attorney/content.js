import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import firebase from 'firebase';
import ReactStars from 'react-stars';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import ReactPaginate from 'react-paginate';
import $ from 'jquery';
import { EventEmitter } from 'fbemitter';
import * as translate from 'counterpart';
import {Typeahead} from 'react-bootstrap-typeahead';

import TopLawyers from './toplawyers';
import Toast from '../notification/toast';
import ReadMore from '../shared/readmore';
import * as constant from '../constants';
import * as Lawyers from '../../lib/user/lawyers';

import 'react-bootstrap-typeahead/css/Typeahead.css';

let listSpecializes = [
	{value: 'field_1', checked: false}, {value: 'field_2', checked: false},
	{value: 'field_3', checked: false}, {value: 'field_4', checked: false},
	{value: 'field_5', checked: false}, {value: 'field_6', checked: false},
	{value: 'field_7', checked: false}, {value: 'field_8', checked: false}
];

class Content extends Component {
  constructor(props){
		super(props);
		this.state = {
			isLoading: false,
			offset: 1,
			lawyers: [],
			key_word: '',
			number_lawyers: 0,
			suggest_name: '',
			current_page: 0,
			names: [],
			sort_by: '',
			selectedLabel: translate('app.attorney.rate')
		};
		this.emitter = new EventEmitter();
	}

	componentDidMount() {
		this.loadDataFromServer({}, false, false);
		this.loadNameFromServer();
	}

	handlePageClick (data) {
		let component = this;
		let selected = data.selected;
		let offset = Math.ceil(selected * 6);

		this.setState({offset: offset, current_page: selected}, () => {
			if(component.state.sort_by != ''){
				component.loadDataFromServer({query: component.state.key_word,
					page: selected + 1, sort_by: component.state.sort_by},
					true, true);
			}
			else {
				component.loadDataFromServer({query: component.state.key_word,
					page: selected + 1}, true, false);
			}
		});
	}

	resetSpecializes() {
		listSpecializes.map(item => {
			item.checked = false;
		})
	}

	loadNameFromServer() {
		var component = this;
		var instance = axios.create({
			baseURL: constant.API_BASE_URL
		});
		var names = [];

		instance.get(constant.API_ALL_LAWYERS_NAME_URI)
			.then(function(response) {
				response.data.names.map (item => {
					if(!names.includes(item.name)) {
						names.push(item.name);
					}
				})
				component.setState({names: names});
			})
			.catch(function (error) {})
	}

	loadDataFromServer(objQuery, pgClick, sort) {
		var component = this;
		var instance = axios.create({
			baseURL: constant.API_BASE_URL
		});

		if(!pgClick) {
			this.uncheckFilter();
			this.resetSpecializes();
		}

		if(!sort) {
			this.setState({sort_by: ''});
			this.setState({selectedLabel: translate('app.attorney.rate')});
		}

		this.setState({key_word: objQuery.query ? objQuery.query : ''});
		$('.rbt-input-main').text(objQuery.query);
		this.setState({isLoading: true});

		instance.get(constant.API_SEARCH_LAWYERS_URI, {params: objQuery})
			.then(function (response) {
				component.setState({isLoading: false});
				if(!response.data.suggest) {
					component.setState({
						lawyers: response.data.lawyers,
						pageCount: response.data.limit_page,
						number_lawyers: response.data.number_lawyers,
						current_page: response.data.current_page - 1
					});
					if(sort) {
						component.setState({selectedLabel: objQuery.sort_by});
					}
					$('.result-stas').show();
					$('.suggest').hide();
					if (!pgClick && !sort) {
						component.emitter.emit('AddNewSuccessToast', '',
							translate('app.search.founded') + ' '
							+ component.state.number_lawyers + ' '
							+ translate('app.search.results'), 5000, () => { });
					}
					else {
						listSpecializes.map(item => {
							if(item.checked) {
								component.state.lawyers.map((lawyer, index) => {
									component.filterWhenChecked(lawyer, index, item.value);
								})
							}
						})
					}
				}
				else {
					component.setState({
						lawyers: [],
						number_lawyers: response.data.number_lawyers,
						suggest_name: response.data.suggest_name,
						offset: 1, pageCount: 0
					});
					$('.result-stas').hide();
					$('.suggest').show();
					if(!pgClick) {
						component.emitter.emit('AddNewErrorToast', '',
							translate('app.search.founded') + ' '
							+ component.state.number_lawyers + ' '
							+ translate('app.search.results'), 5000, () => { });
					}
				}
			})
			.catch(function (error) {
				component.setState({
					lawyers: [], number_lawyers: 0,
					offset: 1, pageCount: 0
				})
				component.emitter.emit('AddNewErrorToast', '',
					translate('app.search.founded') + ' ' +
					' 0 ' + translate('app.search.results'), 5000, () => { })
			});
	}
	
	searchLawyer(event) {
		event.preventDefault();
		var query = $('.rbt-input-main').val();
		var objQuery = {query: query};
		this.loadDataFromServer(objQuery, false, false);
	}

	uncheckFilter() {
		for(var i = 0; i < 8; i++) {
			$('#ckb-' + i).prop('checked', false);
		}
	}

	filterWhenChecked(lawyer, index, filter_value) {
		let ct = 0;
		lawyer.specializations.map(spe => {
			if(spe.name == translate('app.home.search_law.' +
				filter_value + '.title')) {
					ct++;
			}
		});
		if(ct == 0){
			$('#lawyer-' + index).hide();
		}
	}

	handleOnclickLawyer(uid){
		firebase.database().ref(`users/${uid}`).once('value', data => {
			if(data.exists()){
				window.open(constant.BASE_URL + '/lawyers/' + data.val().username)
			}
		})
	}

	handleFilter(key) {
		var component = this;
		listSpecializes[key].checked = !listSpecializes[key].checked;
		if(listSpecializes[key].checked){
			this.state.lawyers.map((lawyer, index) => {
				if($('#lawyer-' + index).css('display') != 'none') {
					component.filterWhenChecked(lawyer, index,
						listSpecializes[key].value);
				}
			})
		}
		else {
			let filChecked = 0;
			listSpecializes.map(item => {
				if(item.checked) {
					filChecked++;
				}
			});
			this.state.lawyers.map((lawyer, index) => {
				if($('#lawyer-' + index).css('display') == 'none') {
					let mapFil = 0;
					lawyer.specializations.map(spe => {
						listSpecializes.map(item => {
							if(item.checked) {
								if (translate('app.home.search_law.' +
									item.value + '.title') == spe.name) {
										mapFil++;
								}
							}
						});
					});
					if (filChecked <= mapFil) {
						$('#lawyer-' + index).show();
					}
				}
			}
		)}
	}

	handleSort(event, data) {
		var sortBy = $('.ui.dropdown').children('.text').text();
		this.setState({sort_by: sortBy});
		this.loadDataFromServer({query: this.state.key_word,
			sort_by: sortBy}, true, true);
	}

	renderCountNumberOfResult(){
		return(
			<div className='header-wrapper'>
				<div className='result-stas'>
					{translate('app.search.has')}
					<b>{' ' + this.state.number_lawyers + ' '}</b>
					{
						this.state.key_word.length == 0 ?
						translate('app.search.results') : 
						translate('app.dashboard.search.result_for')
					}
					<b>{this.state.key_word}</b>
				</div>
				<div className='suggest'>
					<div className='suggest-title'>
						{translate('app.search.you_mean')}
					</div>
					<a className='suggest-name' onClick={
						this.loadDataFromServer.bind(this,
							{query: this.state.suggest_name}, false, false)}>
								{this.state.suggest_name}
					</a>
				</div>
			</div>
		)
	}

	renderSearchResults(){
		return (
			<div className='lawyers'>
				{this.state.lawyers.map((lawyer, index)=>{
					return(	
						<div className='lawyer' id={'lawyer-' + index}
							onClick={this.handleOnclickLawyer.bind(this, lawyer.fb_id)}>
								<img className='ava' src={lawyer.photo_url} />
								<div className='infor'>
									<div className='name' title={lawyer.name}>{lawyer.name}</div>
									<div className='status online-status'>
										{translate('app.attorney.online')}
									</div>
									<div className='cost'>
										<div className='value'>
											 {lawyer.cost + ' Đ' + translate('app.attorney.hour')}
										</div>
									</div>
									<div className='rate'>
										<ReactStars count={5} value={lawyer.rate}
											edit={false} size={20} color2={'#ffd700'} />
									</div>
									<div className='attorney-intro'>
										<ReadMore has_link={false} lines={2}>
											{lawyer.intro}
										</ReadMore>
									</div>
									<div className='specializes'>
										{lawyer.specializations.map(item => {
											return(
												<div className='item'>{item.name}</div>
											)
										})}
									</div>
								</div>
						</div>
					)
				})}
			</div>
		);
	}

	renderContent(sortOptions) {
		return(
			<div className='content-wrapper'>
				<div className='header'>
					{this.renderCountNumberOfResult()}
					<div className='sort-by'>
						<div className='label'>
							{translate('app.attorney.sort_by')}
						</div>
						<Dropdown options={sortOptions}
							onBlur={this.handleSort.bind(this)}
							placeholder={this.state.selectedLabel}/>
					</div>
				</div>
				{this.renderSearchResults()}
				<ReactPaginate
					previousLabel={translate('app.home.previous')}
					nextLabel={translate('app.home.next')}
					breakLabel={<a href=''>...</a>}
					breakClassName={'break-me'}
					forcePage={this.state.current_page}
					pageCount={this.state.pageCount}
					onPageChange={this.handlePageClick.bind(this)}
					containerClassName={'pagination'}
					subContainerClassName={'pages pagination'}
					activeClassName={'active'} />
			</div>
		)
	}

	renderLoading() {
		return(
			<ReactLoading className='loading-symbol'
				type='cylon' color='#337ab7'
				height='125' width='125'/>					
		)
	}

	renderFilterSpecialize() {
    return(
      <div className='items'>
        {listSpecializes.map((item, index) => {
          return(
            <div className='item'>
              <div className='pretty p-default p-curve p-fill'>
                <input id={'ckb-' + index} type='checkbox'
									onClick={this.handleFilter.bind(this, index)}/>
                <div className='state p-primary'>
                  <label>
                    {translate('app.home.search_law.' + item.value + '.title')}
                  </label>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

	render() {
		let sortOptions = [
			{
				text: translate('app.attorney.rate'),
				value: translate('app.attorney.rate'),
			},
			{
				text: translate('app.attorney.cost'),
				value: translate('app.attorney.cost'),
			}
		];

		return(
			<div className='row justify-content-center'>
				<Toast emitter={this.emitter} />
				<div className='col-md-3'>
					<div className='filter-section'>
						<div className='label'>
							{translate('app.attorney.filter')}
						</div>
						<hr/>
						<div className='specialize'>
							<div className='title'>
								{translate('app.attorney.specialize')}
							</div>
							{this.renderFilterSpecialize()}
						</div>
					</div>
				</div>
				<div className='col-md-9'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='search-section'>
								<form onSubmit={this.searchLawyer.bind(this)}>
									<Typeahead labelKey='name' options={this.state.names}
										submitFormOnEnter={true}
										placeholder={translate('app.attorney.search_placeholder')}/>
									<button onClick={this.searchLawyer.bind(this)}>
										<i className='fa fa-search' aria-hidden='true'></i>
									</button>
								</form>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-8'>
							<div className='attorney-result-content'>
								{!this.state.isLoading ? 
										this.renderContent(sortOptions): this.renderLoading()}
							</div>
						</div>
						<div className='col-md-4'><TopLawyers /></div>
					</div>
        </div>
			</div>
		)
	}
}

export default Content;
