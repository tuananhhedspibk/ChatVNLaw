import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';

import * as constant from '../constants';
import * as translate from 'counterpart';

import '../../assets/styles/common/main.css';

class Loading extends Component {
  render() {
    return (
      <div className='logo-app'>
        <div className='logo-section'>
          <img src={constant.appLogoPic}/>
        </div>
        <div className='loading-section'>
          <ReactLoading type='cylon' 
            color='#ffffff'  width='120'/>
        </div>
      </div>
    )
  }
}

export default Loading;
