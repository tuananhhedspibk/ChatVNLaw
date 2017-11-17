import React, {Component} from 'react';

import * as constant from '../constants';
import * as Lawyers from '../../lib/helper/user/lawyers';

let translate = require('counterpart');

class HotLawyers extends Component {
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

  applyLawyer(){
    window.location = constant.BASE_URL + '/applylawyer/' + this.state.currentLawyer.uid;
  }

  renderInfoLawyer(){
    if(!!this.state.currentLawyer){
      console.log(this.state.currentLawyer)
      var profileLawyer = "/lawyers/"+this.state.currentLawyer.username
      return (
        <div className='lawyer-overview'>
          <div className='title'>
            {translate('app.home.recent_lawyer.lawyer_overview')}
          </div>
          <div className='content'>
            <a href={profileLawyer}>
              <div className='name'>
                {this.state.currentLawyer.displayName}
              </div>
            </a>
            <div className='overview-infor'>
              <div>
                <i className='fa fa-money' aria-hidden='true'></i>
                {this.state.currentLawyer.price} / {translate('app.home.recent_lawyer.hour')}
              </div>
              <div>
                <i class="fa fa-shopping-bag" aria-hidden="true"></i>
              </div>
            </div>
            <div className='description'>
              {this.state.currentLawyer.intro}
            </div>
            <button className='apply-btn' onClick={this.applyLawyer.bind(this)}>
              {translate('app.home.recent_lawyer.apply')}
            </button>
          </div>
        </div>
      )
    }
  }

  render() {
    return(
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
          <a href='/attroney' className='list-all-lawyers'>{translate('app.home.recent_lawyer.show_all')}</a>
        </div>
        {this.renderInfoLawyer()}
      </div>
    )
  }
}

export default HotLawyers;
