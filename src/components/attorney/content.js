import React, { Component } from 'react';
import ReactLoading from 'react-loading';

import * as constant from '../constants';

import * as Lawyers from '../../lib/user/lawyers';
import firebase from 'firebase';
import { BASE_URL } from '../constants';

let translate = require('counterpart');

class Content extends Component {
  constructor(props){
		super(props);
		this.state={
			name:null,
			isLoading: true,
			findOther: false,
			result: []
		}
	}

	componentWillMount(){
		this.setState({name: this.props.name});
	}

	componentDidMount(){
		let properties = {}
		properties['component'] = this;			
		if(!!this.state.name){
			properties['input'] = this.state.name;
			Lawyers.findLawyers(properties, () =>{

			})
		}else{
			Lawyers.findLawyersWithoutInput(properties,()=>{

			})
		}
	}

	renderCountNumberOfResult(){
		if(!this.state.findOther){
			if(!!this.state.name){
				return(
					<div className='result-stas'>
						{translate('app.search.has')
						+ ' ' + this.state.result.length
						+ translate('app.dashboard.search.result_for')}
						<b>{this.state.name}</b></div>
				)
			}else{
				return(
					<div className='result-stas'>
						{translate('app.search.has') + ' '
						+ this.state.result.length
						+ ' ' + translate('app.search.results')}</div>
				)
			}
		}else{
			return(
				<div className='result-stas'>
					{translate('app.dashboard.search.search_tag_not_found')
					+ translate('app.dashboard.search.result_for')}
					<b>{this.state.name}</b>
					. {this.state.result.length
					+ translate('app.dashboard.search.result_relate')}</div>
			)
		}
	}

	handleOnclickLawyer(uid){
		console.log('test');
		firebase.database().ref(`users/${uid}`).once('value', data=>{
			if(data.exists()){
				window.open(BASE_URL+'/lawyers/'+data.val().username)
			}
		})

	}

	renderResultArr(){
		console.log(this.state.result);
		return (
			<div>
				{this.state.result.map((element)=>{
					console.log(element)
					return(	
						<div className='lawyer' onClick={this.handleOnclickLawyer.bind(this,element.uid)}>
							<img className='ava' src={element.photoURL} />
							<div className='infor'>
								<div className='name' title={element.fullname}>
									{element.fullname}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		);
	}

	render() {
		if(!this.state.isLoading){
			return(
				<div>
					{this.renderCountNumberOfResult()}
					{this.renderResultArr()}
				</div>
			)
		}
		else{
			return(
				<ReactLoading type='cylon' color='#337ab7'
					height='150' width='150'/>					
			)
		}
	}
}

export default Content;
