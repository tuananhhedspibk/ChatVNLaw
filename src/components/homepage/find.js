import React, { Component } from 'react';

let translate = require('counterpart');

class Find extends Component {
  render() {
    return (
      <div className='find'>
        <div className='title'>
          {translate('app.home.find_box.title')}
        </div>
        <div className='search-box'>
          <input className='search-input'
            placeholder={translate('app.home.find_box.lawyer_name')}/>
          <input className='search-input'
            placeholder={translate('app.home.find_box.lawyer_field')}/>
          <button className='search-button'>
            <i className='fa fa-search'
              aria-hidden='true'></i>
          </button>
        </div>
        <div className='slogan'>
          {translate('app.home.slogan')}
        </div>
      </div>
    );
  }
}

export default Find;
