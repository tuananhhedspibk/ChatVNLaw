import React, { Component } from 'react';

let translate = require('counterpart');

class GetStarted extends Component {
  render() {
    return(
      <div className='get-started'>
        <div className='title'>
          {translate('app.home.get_start.title')}
        </div>
        <a className='get-start-btn' href='/attroney'>
          {translate('app.home.get_start.button_content')}
        </a>
      </div>
    )
  }
}

export default GetStarted;
