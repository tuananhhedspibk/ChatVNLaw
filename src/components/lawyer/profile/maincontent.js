import React, { Component } from 'react';

import HeaderBlock from './headerblock';
import LeftBlock from './leftblock';
import RightBlock from './rightblock';
import CenterBlock from './centerblock';

class MainContent extends Component {
	convertContent(text) {
		if (text === null || text === '') {
			return '...';
		}
		else {
			if(Array.isArray(text)) {
				return text.join(', ');
			}
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
								user={this.props.user}/>
						</div>
					</div>
					<div className='space-wrapper'>
					</div>
					<div className='row'>
						<div className='col-sm-12 col-md-3'>
							<LeftBlock convertContent={this.convertContent}
								user={this.props.user}/>
						</div>
						<div className='col-sm-12 col-md-6'>
							<CenterBlock convertContent={this.convertContent}
								user={this.props.user}
								userName={this.props.user.base_profile.userName}/>
						</div>
						<div className='col-sm-12 col-md-3'>
							<RightBlock user={this.props.user}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MainContent; 
