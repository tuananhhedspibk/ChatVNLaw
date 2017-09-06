import React, { Component } from 'react';

import '../../assets/styles/brand.css';

let translate = require('counterpart');

class Brand extends Component {
  render() {
    return(
      <div className='brand'>
        <div className='app-name'>{translate("app.identifier.app_name")}</div>
        <div className='slogan'>{translate("app.identifier.slogan")}</div>
      </div>
    )
  }
}

export default Brand;
