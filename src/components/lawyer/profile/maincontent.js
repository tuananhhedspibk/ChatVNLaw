import React, { Component } from 'react';
import $ from 'jquery';
import ReactStars from 'react-stars';

import HeaderBlock from './headerblock';
import LeftBlock from './leftblock';
import RightBlock from './rightblock';
import CenterBlock from './centerblock';

import * as constant from '../../constants';

class MainContent extends Component {
	convertContent(text) {
		if (text == null || text == '') {
			return '...';
		}
		else {
			return text;
		}
	}

	render() {
		return (
			<div className='lawyer-profile'>
				<div className='container-lawyer-wrapper'>
					<div className='row'>
						<div className='col-sm-12'>
							<HeaderBlock convertContent={this.convertContent}
								user={this.props.user}
								profile={this.props.profile}/>
						</div>
					</div>
					<div className='space-wrapper'>
					</div>
					<div className='row'>
						<div className='col-sm-12 col-md-3'>
							<LeftBlock convertContent={this.convertContent}
								profile={this.props.profile}/>
						</div>
						<div className='col-sm-12 col-md-6'>
							<CenterBlock convertContent={this.convertContent}
								profile={this.props.profile}/>
						</div>
						<div className='col-sm-12 col-md-3'>
							<RightBlock profile={this.props.profile}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MainContent; 
