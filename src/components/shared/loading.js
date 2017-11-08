import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as constant from '../constants';
import '../../assets/styles/common/main.css';
import ReactLoading from 'react-loading';

let translate = require('counterpart');

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
