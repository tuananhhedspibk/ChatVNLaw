import React, {Component} from 'react';
import ReactLoading from 'react-loading';
import $ from 'jquery';

import * as constant from '../constants';
import * as Lawyers from '../../lib/user/lawyers';

let translate = require('counterpart');

class HotLawyers extends Component {
  constructor(props) {
    super(props);
    this.state={
      lawyers: [],
      currentLawyer: null,
      isloading: true
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    if (window.scrollY >= ($('.slogan-section').offset().top + 100)) {
      if (!this.state.isloading) {
        $('.hot-lawyers').css('display', 'inline-block');
        $('.hot-lawyers').addClass('animated bounceInLeft');
      }
		}
  }

  componentWillMount(){
    let properties = {}
    var component = this
    properties['component'] = this;
    Lawyers.getLawyerList(properties, function(){
    })
  }

  changeLawyer(lawyer, current_lawyer_id) {
    this.setState({currentLawyer: lawyer});
    for(var i = 0; i < this.state.lawyers.length; i++) {
      $('#lawyer-' + i).removeClass('now-focus');
    }
    $('#lawyer-' + current_lawyer_id).addClass('now-focus');
  }

  applyLawyer(){
    window.location = constant.BASE_URL + '/applylawyer/' +
      this.state.currentLawyer.username;
  }

  getInfoLawyer(){
    var component = this;
    if(this.state.currentLawyer){
      var profileLawyer = "/lawyers/" + this.state.currentLawyer.username;
      var current_lawyer_id = this.state.lawyers.indexOf(this.state.currentLawyer);
      $('#lawyer-' + current_lawyer_id).addClass('now-focus');
      return(component.renderInfoLawyer(profileLawyer, this.state.currentLawyer, component.bind));
    }
    else {
      this.setState({currentLawyer: this.state.lawyers[0]});
      $('#lawyer-0').addClass('now-focus');
      return(component.renderInfoLawyer(profileLawyer, this.state.lawyers[0]));
    }
  }

  renderInfoLawyer(profileLawyer, currentLawyer){
    return (
      <div className='lawyer-overview'>
        <div className='title'>
          {translate('app.home.recent_lawyer.lawyer_overview')}
        </div>
        <div className='content'>
          <a href={profileLawyer}>
            <div className='name' title={currentLawyer.displayName}>
              {currentLawyer.displayName}
            </div>
          </a>
          <div className='overview-infor'>
            <div>
              <i className='fa fa-money' aria-hidden='true'></i>
              {currentLawyer.price} /
              {translate('app.home.recent_lawyer.hour')}
            </div>
            <div>
              <i class="fa fa-shopping-bag" aria-hidden="true"></i>
            </div>
          </div>
          <div className='description'>
            {
              currentLawyer.intro != null ?
              (
                currentLawyer.intro.length >= 330 ?
                (
                  <div>
                    {currentLawyer.intro.substring(0, 330) + '... '}
                    <a href={profileLawyer} target='_blank'>
                      {translate('app.identifier.read_more')}
                    </a>
                  </div>
                )
                :
                (
                  currentLawyer.intro
                )
              )
              :
              (
                ''
              )
            }
          </div>
          <button className='apply-btn' onClick={this.applyLawyer.bind(this)}>
            {translate('app.home.recent_lawyer.apply')}
          </button>
        </div>
      </div>
    )
  }

  renderView() {
    return(
      <div className='hot-lawyers'>
        <div className='row'>
          <div className='col-sm-12 col-md-5'>
            <div className='lawyers-list'>
              <div className='title'>
                {translate('app.home.recent_lawyer.title')}
              </div>
              <div className='lawyers'>
                {
                  this.state.lawyers.map((lawyer, idx) => {
                    return(
                      <div className='lawyer' id={'lawyer-' + idx}
                        onClick={this.changeLawyer.bind(this, lawyer, idx)}>
                          <img className='ava'
                            src={lawyer.photoURL} />
                          <div className='infor'>
                            <div className='name' title={lawyer.displayName}>
                              {lawyer.displayName}
                            </div>
                          </div>
                      </div>
                    )
                  })
                }
              </div>
              <a href={constant.ATTORNEY_URI}
                className='list-all-lawyers'>
                  {translate('app.home.recent_lawyer.show_all')}
              </a>
            </div>
          </div>
          <div className='col-sm-12 col-md-7'>
            {this.getInfoLawyer()}
          </div>
        </div>
      </div>
    )
  }

  render(){
    if(this.state.isloading){
      return(
        <div className='hot-lawyers'>
          <ReactLoading type='spinningBubbles'
            color='#43A3DF' width='100' height='100'
            className='react-loading'/>
        </div>
      )
    }else{
      return(
        <div>{this.renderView()}</div>
      )
    }
  }
}

export default HotLawyers;
