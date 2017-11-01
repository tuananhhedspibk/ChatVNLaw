import React, { Component } from 'react';
import $ from 'jquery';

import * as constant from '../constants';
import * as Lawyers from '../../lib/helper/user/lawyers';
let translate = require('counterpart');

class Content extends Component {
  constructor(props) {
    super(props);
    this.state={
      lawyers:[],
      currentLawyer: ''
    }
  }

  componentWillMount(){
    let properties = {}
    properties['component'] = this;
    Lawyers.getLawyerList(properties, function(){
      
    })
  }

  changeLawyer(lawyer) {
    this.setState({currentLawyer: lawyer});
  }

  render() {
    return(
      <div className='main-content'>
        <div className='hot-lawyers'>
          <div className='lawyers-list'>
            <div className='title'>
              {translate('app.home.recent_lawyer.title')}
            </div>
            <div className='lawyers'>
              {
                this.state.lawyers.map((lawyer) => {
                  return(
                    <div className='lawyer'
                      onClick={this.changeLawyer.bind(this, lawyer)}>
                        <img className='ava'
                          src={lawyer.photoURL} />
                        <div className='infor'>
                          <div className='name'>
                            {lawyer.displayName}
                          </div>
                        </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='lawyer-overview'>
            <div className='title'>
              {translate('app.home.recent_lawyer.lawyer_overview')}
            </div>
            <div className='content'>
              <div className='name'>
                {this.state.currentLawyer.displayName}
              </div>
              <div className='overview-infor'>
                <div>
                  <i className='fa fa-money' aria-hidden='true'></i>
                  $ 10 / {translate('app.home.recent_lawyer.hour')}
                </div>
                <div>
                  <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                </div>
              </div>
              <div className='description'>
                Proin ligula neque, pretium et ipsum eget,
                mattis commodo dolor.
                Etiam tincidunt libero quis commodo.
              </div>
              <button className='apply-btn'>
                {translate('app.home.recent_lawyer.apply')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
