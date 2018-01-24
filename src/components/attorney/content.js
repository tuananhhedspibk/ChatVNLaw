import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import firebase from 'firebase';
import ReactStars from 'react-stars';
import { Dropdown } from 'semantic-ui-react';

import ReadMore from '../shared/readmore';
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
			<div className='lawyers'>
				{this.state.result.map((element)=>{
					return(	
						<div className='lawyer' onClick={
							this.handleOnclickLawyer.bind(this,element.uid)}>
								<img className='ava' src={element.photoURL} />
								<div className='infor'>
									<div className='name' title={element.fullname}>
										{element.fullname}
									</div>
									<div className='status online-status'>
										{translate('app.attorney.online')}
									</div>
									<div className='cost'>
										<div className='value'>
											200,000 Đ {translate('app.attorney.hour')}
										</div>
									</div>
									<div className='rate'>
										<ReactStars
											count={5}
											value={5}
											edit={false}
											size={20}
											color2={'#ffd700'} />
									</div>
									<div className='attorney-intro'>
										<ReadMore has_link={false} lines={2}>
											Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào
											việc trình bày và dàn trang phục vụ cho in ấn. Lorem Ipsum đã được
											sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những
											năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để
											tạo thành một bản mẫu văn bản. Đoạn văn bản này không những đã tồn tại
											năm thế kỉ, mà khi được áp dụng vào tin học văn phòng, nội dung của nó
											vẫn không hề bị thay đổi. Nó đã được phổ biến trong những năm 1960 nhờ 
											việc bán những bản giấy Letraset in những đoạn Lorem Ipsum,
											và gần đây hơn, được sử dụng trong các ứng dụng dàn trang,
											như Aldus PageMaker.
										</ReadMore>
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
						</div>
					)
				})}
			</div>
		);
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

		if(!this.state.isLoading){
			return(
				<div className='content-wrapper'>
					<div className='header'>
						{this.renderCountNumberOfResult()}
						<div className='sort-by'>
							<div className='label'>
								{translate('app.attorney.sort_by')}
							</div>
							<Dropdown options={sortOptions}
								defaultValue={sortOptions[0].value}/>
						</div>
					</div>
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
