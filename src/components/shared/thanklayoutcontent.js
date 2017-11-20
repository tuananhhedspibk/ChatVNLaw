import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Nav from '../homepage/nav';

import * as constant from '../constants';
import * as translate from 'counterpart';

import '../../assets/styles/common/404.css';

class ThankLayoutContent extends Component {
  render() {
    return (
      <div className='notfound-wrapper'>
      
        <div className='container'>
          <div className='row justify-content-md-center'>
            <div className='error-pic'>
              <img src={constant.handShakePic}/>
            </div>
            <div className='content'>
              <div className='temp-content'></div>
              <div className='main-content'></div>
            </div>
            <Link to='/home' className='back-to-home'>
              {translate('app.notfound.content.back_home')}
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ThankLayoutContent;
