import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import firebase from 'firebase';

import * as constant from '../constants';
import * as Lawyers from '../../lib/user/lawyers';

import * as translate from 'counterpart';

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
						{translate('app.search.has')}
						<b>{' ' + this.state.result.length}</b>
						{translate('app.dashboard.search.result_for')}
						<b>{this.state.name}</b></div>
				)
			}else{
				return(
					<div className='result-stas'>
						{translate('app.search.has') + ' '}
						<b>{this.state.result.length}</b>
						{' ' + translate('app.search.results')}</div>
				)
			}
		}else{
			return(
				<div className='result-stas'>
					{translate('app.dashboard.search.search_tag_not_found')
					+ translate('app.dashboard.search.result_for')}
					<b>{this.state.name}</b>
					. <b>{this.state.result.length}</b>
					{translate('app.dashboard.search.result_relate')}</div>
			)
		}
	}

	handleOnclickLawyer(uid){
		firebase.database().ref(`users/${uid}`).once('value', data=>{
			if(data.exists()){
				window.open(constant.BASE_URL + '/lawyers/'
					+ data.val().username)
			}
		})
	}

	renderResultArr(){
		return (
			<div>
				{this.state.result.map((element)=>{
					return(	
						<div className='lawyer' onClick={
							this.handleOnclickLawyer.bind(this,element.uid)}>
								<img className='ava' src={element.photoURL} />
								<div className='infor'>
									<div className='name' title={element.fullname}>
										{element.fullname}
									</div>
									<div className='cost'>
										<div>{translate('app.attorney.cost')}</div>
										<div className='value'>
											200,000 Đ {translate('app.attorney.hour')}
										</div>
									</div>
									<div className='specializes'>
										<div className='item'>
											Dân Sự
										</div>
										<div className='item'>
											Tài Chính - Ngân Hàng
										</div>
										<div className='item'>
											Bảo hiểm
										</div>
										<div className='item'>
											Đất Đai
										</div>
										<div className='item'>
											Quốc Tế
										</div>
									</div>
								</div>
								<div className='status-block'>
									<div className='status-icon'>
										<img src={constant.supportIcon}/>
										<div className='icon online-icon'>
										</div>
									</div>
									<div className='status-text online-text'>
										{translate('app.attorney.online')}
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
