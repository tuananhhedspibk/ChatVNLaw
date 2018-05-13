import React, {Component} from 'react';
import ReactLoading from 'react-loading';

import * as constant from '../constants';

import '../../assets/styles/common/main.css';

class Loading extends Component {
  render() {
    return (
      <div className='logo-app'>
        <div className='logo-section'>
          <img alt='logo' src={constant.appLogoPic}/>
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
