import React, { Component } from 'react';
import * as Lawyers from '../../lib/helper/user/lawyers' 
import ReactLoading from 'react-loading';

import * as constant from '../constants';

let translate = require('counterpart');

class Content extends Component {
	constructor(props){
		super(props);
		this.state={
			name:null,
			isLoading: true,
			findOther: false,
			result:[]
		}
	}

	componentWillMount(){
		this.setState({name: this.props.name});
	}

	componentDidMount(){
		let properties = {}
		properties['input'] = this.state.name;
		properties['component'] = this;
		Lawyers.findLawyers(properties, () =>{

		})
	}

	renderCountNumberOfResult(){
		if(!this.state.findOther) {
			return (
				<div className='results-statistic'>
					{translate('app.search.search_lawyer.title')}
					<div className='key-search'>
						{this.state.name}
					</div>.
					<div className='key-matched'>
						{this.state.result.length} 
						{translate('app.search.search_lawyer.matches')}
					</div>
				</div>
			)
		}
		else {
			return (
				<div className='results-statistic'>
					{translate('app.search.search_lawyer.title')}
					<div className='key-search'>
						{this.state.name}
					</div>.
					<div className='key-matched'>
						{translate('app.search.search_lawyer.not_found_for')}
						{this.state.name}.
						{this.state.result.length} 
						{translate('app.search.search_lawyer.involve')}
					</div>
				</div>
			)
		}
	}

	renderResultArr(){
		/* return (
			<div className='results'>
				{this.state.result.map( (element)=>{
					return(
						<div className='result'>
							<div className='left-block'>
								<div className='ava'>
									<img src={element.photoURL}/>
								</div>
								<div className='name'>
									{element.fullname}
								</div>
							</div>
							<div className='right-block'>
								<button className='book-btn'>
									{translate('app.attorney.book')}
								</button>
								<button className='view-profile'>
									{translate('app.attorney.view_profile')}
								</button>
							</div>
						</div>
					)
				})}
			</div>
		); */
		return (
			<div className='results'>
				
					<div className='result'>
						<div className='left-block'>
							<div className='ava'>
								<img src={constant.avaUserPic}/>
							</div>
							<div className='name'>
								Nguyễn Tiến Trường
							</div>
						</div>
						<div className='right-block'>
							<button className='book-btn'>
								{translate('app.attorney.book')}
							</button>
							<button className='view-profile'>
								{translate('app.attorney.view_profile')}
							</button>
						</div>
					</div>
					<div className='result'>
						<div className='left-block'>
							<div className='ava'>
								<img src={constant.avaUserPic}/>
							</div>
							<div className='name'>
								Nguyễn Tiến Trường
							</div>
						</div>
						<div className='right-block'>
							<button className='book-btn'>
								{translate('app.attorney.book')}
							</button>
							<button className='view-profile'>
								{translate('app.attorney.view_profile')}
							</button>
						</div>
					</div>
					<div className='result'>
						<div className='left-block'>
							<div className='ava'>
								<img src={constant.avaUserPic}/>
							</div>
							<div className='name'>
								Nguyễn Tiến Trường
							</div>
						</div>
						<div className='right-block'>
							<button className='book-btn'>
								{translate('app.attorney.book')}
							</button>
							<button className='view-profile'>
								{translate('app.attorney.view_profile')}
							</button>
						</div>
					</div>
					</div>
				
		)
	}

	render() {
		if(!this.state.isLoading){
			return(
				<div className='search-result'>
					{this.renderCountNumberOfResult()}
					{this.renderResultArr()}
				</div>
			)
		}else{
			return(
				<ReactLoading type='cylon' color='#337ab7' height='150' width='150'/>					
			)
		}
	}
}

export default Content;
