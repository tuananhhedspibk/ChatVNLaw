import React, { Component } from 'react';

import ReadMore from '../../shared/readmore';

let translate = require('counterpart');

class LeftBlock extends Component {
  render() {
    return(
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
    )
  }
}

export default LeftBlock;
