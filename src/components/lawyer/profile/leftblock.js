import React, { Component } from 'react';

import ReadMore from '../../shared/readmore';

let translate = require('counterpart');

class LeftBlock extends Component {
  render() {
    return(
      <div>
        <div className='content-block left-block'>
          <div className='title'>
            {translate('app.lawyer.work_place')}
          </div>
          <div className='content'>
            <ReadMore>
              {this.props.convertContent(
                this.props.user.lawyer_profile.workPlace)}
            </ReadMore>
          </div>
        </div>
        <br/>
        {
          this.props.user.mn_acc ? 
          (
            <div className='content-block left-block'>
              <div className='title'>
                {translate('app.lawyer.bank_account')}
              </div>
              <div className='content'>
                {this.props.user.mn_acc.ammount} Đ
              </div>
            </div>
          )
          :
          (
            ''
          )
        }
      </div>
    )
  }
}

export default LeftBlock;
