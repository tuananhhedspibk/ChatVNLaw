import React, { Component } from 'react';
import ReactStars from 'react-stars';

import * as translate from 'counterpart';
import * as constant from '../../constants';

class HeaderBlock extends Component {
  timeFormat(birthday) {
    if (birthday !== '...' ) {
      var date = new Date(birthday)
      var options = {
        year: 'numeric', month: 'numeric', day: 'numeric'
      };
      var birthdayFormated = date.toLocaleDateString('vi-VN', options);
      return birthdayFormated;
    }
    return birthday
  }

  handleOnclickApplyLawyer(){
    if(localStorage.chat_vnlaw_user) {
      window.location.href = constant.BASE_URL + constant.APPLY_LAWYER_URI
        + this.props.user.base_profile.userName;
    }
    else {
      window.location.href = constant.BASE_URL + constant.SIGN_IN_URI; 
    }
  }

  renderApplyBtn() {
    if(localStorage.chat_vnlaw_user) {
      if(JSON.parse(localStorage.chat_vnlaw_user)['role'] === 'User') {
        return(
          <button className='btn-blue' onClick={this.handleOnclickApplyLawyer.bind(this)}>
            {translate('app.lawyer.online_counsel')}
          </button>
        )
      }
      else {
        return (
          ''
        )
      }
    }
    else {
      localStorage.setItem('redirect_uri', constant.APPLY_LAWYER_URI +
        this.props.user.base_profile.userName);
      return (
        <button className='btn-blue' onClick={this.handleOnclickApplyLawyer.bind(this)}>
          {translate('app.lawyer.online_counsel')}
        </button>
      )
    }
  }

  render() {
    var spes_list = this.props.user.specializes;
    return(
      <div className='profile-header'>
        <div className='row'>
          <div className='col-sm-12 col-md-7'>
            <div className='avatar'>
              <img alt='avatar'
                src={constant.API_BASE_URL + '/' +
                  this.props.user.base_profile.avatar.url}/>
            </div>
            <div className='basic-infor'>
              <div className='left-block'>
                <p className='name'>
                  {this.props.user.base_profile.displayName}
                </p>
                <p className='expert'>
                  {
                    spes_list.map((spe, idx) => {
                      if (idx === spes_list.length - 1) {
                        return(
                          spe.name
                        )
                      }
                      else {
                        return(
                          spe.name + ', '
                        )
                      }
                    })
                  }
                </p>
                <div className='rate'>
                  <ReactStars
                    count={5}
                    value={this.props.user.lawyer_profile.rate}
                    size={24}
                    edit={false}
                    color2={'#ffd700'} />
                    <p>
                      (
                        {this.props.user.votes} {translate('app.attorney.people_vote')}
                      )
                    </p>
                </div>
                {this.renderApplyBtn()}
              </div>
              <div className='right-block'>
                <p className='cost'>
                  {this.props.convertContent(this.props.user.lawyer_profile.price)} Đ /
                   {translate('app.home.recent_lawyer.hour')}
                </p>
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-5'>
            <div className='another-infor'>
              <div className='block'>
                <b>{translate('app.lawyer.birthday')}:</b>
                <p>
                  {this.timeFormat(
                    this.props.convertContent(this.props.user.base_profile.birthday)
                  )}
                </p>
              </div>
              <div className='block'>
                <b>{translate('app.lawyer.card_number')}:</b>
                <p>{this.props.convertContent(this.props.user.lawyer_profile.cardNumber)}</p>
              </div>
              <div className='block'>
                <b>{translate('app.lawyer.certificate')}:</b>
                <p>{this.props.convertContent(this.props.user.lawyer_profile.certificate)}</p>
              </div>
              <div className='block'>
                <b>{translate('app.lawyer.experience')}:</b>
                <p>{this.props.convertContent(this.props.user.lawyer_profile.exp)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderBlock;
