import React, { Component } from 'react';

let translate = require('counterpart');

class SearchLaw extends Component {
  render() {
    return(
      <div className='search-law'>
        <div className='title'>
          {translate('app.home.search_law.title')}
        </div>
        <div className='explain'>
          {translate('app.home.search_law.des')}
        </div>
        <div className='row'>
          <div className='col-sm-12 col-md-3'>
            <div className='field'>
              <i className='fa fa-user-secret' aria-hidden='true'></i>
              <div className='title'>
                {translate('app.home.search_law.field_1.title')}
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-3'>
            <div className='field'>
              <i className='fa fa-user-circle-o' aria-hidden='true'></i>
              <div className='title'>
                {translate('app.home.search_law.field_2.title')}
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-3'>
            <div className='field'>
              <i className='fa fa-users' aria-hidden='true'></i>
              <div className='title'>
                {translate('app.home.search_law.field_3.title')}
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-3'>
            <div className='field'>
              <i className='fa fa-home' aria-hidden='true'></i>
              <div className='title'>
                {translate('app.home.search_law.field_4.title')}
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-3'>
            <div className='field'>
              <i className='fa fa-money' aria-hidden='true'></i>
              <div className='title'>
                {translate('app.home.search_law.field_5.title')}
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-3'>
            <div className='field'>
              <i className='fa fa-child' aria-hidden='true'></i>
              <div className='title'>
                {translate('app.home.search_law.field_6.title')}
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-3'>
            <div className='field'>
              <i className='fa fa-fire' aria-hidden='true'></i>
              <div className='title'>
                {translate('app.home.search_law.field_7.title')}
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-3'>
            <div className='field'>
              <i className='fa  fa-handshake-o' aria-hidden='true'></i>
              <div className='title'>
                {translate('app.home.search_law.field_8.title')}
              </div>
            </div>
          </div>
        </div>
        <div className='row row-btn'>
          <a className='btn btn-blue' href='/search-law'>
            {translate('app.home.search_law.title')}
          </a>
        </div>
      </div>
    )
  }
}

export default SearchLaw;
