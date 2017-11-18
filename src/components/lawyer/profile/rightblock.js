import React, { Component } from 'react';

let translate = require('counterpart');

class RightBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='content-block right-block'>
        <i className='fa fa-headphones' aria-hidden='true'></i>
        <div className='title'>
          {translate('app.lawyer.online_counsel')}
        </div>
        <div className='sub-title'>
          {translate('app.lawyer.pay_for_hour')}
        </div>
        <button className='btn-blue'>
          {translate('app.lawyer.regis_now')}
        </button>
      </div>
    )
  }
}

export default RightBlock;
