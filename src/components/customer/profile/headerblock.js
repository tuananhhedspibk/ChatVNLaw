import React, { Component } from 'react';

import * as constant from '../../constants';

import * as translate from 'counterpart';

class HeaderBlock extends Component {
	constructor(props) {
    super(props);
	}

	render() {
		return(
			<div className='profile-header'>
        <div className='row'>
          <div className='col-sm-12 col-md-3'>
            <div className='avatar'>
              <img src={constant.API_BASE_URL + '/' + this.props.user.profile.avatar.url}/>
            </div>
          </div>
          <div className='col-sm-12 col-md-9'>
            <div className='basic-infor'>
              <div className='left-block'>
                <p className='name'>
                  {this.props.user.profile.displayName}
                </p>
                <p className='email'>
                  <i className='fa fa-envelope-o' aria-hidden='true'></i>
                  {this.props.user.email}
                </p>
                <p className='role'>
                  <i className='fa fa-universal-access'
                    aria-hidden='true'></i>
                  {this.props.user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
		)
	}
}

export default HeaderBlock;
