import React, { Component } from 'react';
import AlertContainer from 'react-alert';

import * as constant from '../constants';

import '../../assets/styles/common/authen.css';

let warningImage = require('../../assets/images/warning.png');

let translate = require('counterpart');
let user = require('../../lib/api/users.js');
let authen = require('../../lib/api/authentication.js');
let ddp = require('../../lib/real_time_api/ddp_connection');
let group = require('../../lib/api/group');

class UserSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  componentWillMount() {
    if(localStorage.rocket_chat_user != null) {
      window.location = constant.BASE_URL;
    }
    ddp.connect(function(){

    });
  }

  showAlert = (text) => {
    this.msg.show(text, {
      time: 2000,
      type: 'success',
      icon: <img alt='warning' src={warningImage} />
    })
  }

  handleInputChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.password === this.state.password_confirmation) {
      var username = this.state.username;
      var password = this.state.password;
      var component = this;
      user.register(this.state.username, this.state.email, 
        this.state.password, this.state.name, function(response) {
          if (response.status === 200) {
            authen.login(username, password, function(response) {
              if (response.status === 200) {
                var userId = response.data.data.userId;
                user.setAvatarWithImageUrl(constant.DEFAULT_AVATAR_URL.valueOf(),function(response){
                  group.create(userId,[],function(response){
                    if(response.status === 200){
                      component.props.history.push(constant.CHAT_URI + '/' +
                        component.state.username);
                    }else{
                      localStorage.removeItem(constant.STORAGE_ITEM);                      
                    }
                  })
                });
              }
            });
          }
          else {
            component.showAlert('Singup unsuccessfully, check information');
          }
        });
    }
    else {
      this.showAlert('Password and Password confirmation not the same'); 
    } 
  }

  render() {
    return(
      <div className='login-page ng-scope ui-view'>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS}/>
        <div className='row justify-content-md-center'>
          <div className='col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3'>
            <img src={constant.logoPic} className='user-avatar' alt=''/>
            <h1>{translate('app.identifier.app_name')} <small>
              {translate('app.identifier.slogan')}</small></h1>
            <form onSubmit={this.handleSubmit.bind(this)}
              className='ng-pristine ng-valid'>
              <div className='form-content'>
                <div className='form-group'>
                  <input type='text'
                    name='name'
                    value={this.state.name}
                    onChange={this.handleInputChange.bind(this)}
                    className='form-control input-underline input-lg'
                    placeholder={translate('app.signup.name')}/>
                </div>
                <div className='form-group'>
                  <input type='text'
                    name='username'
                    value={this.state.username}
                    onChange={this.handleInputChange.bind(this)}
                    className='form-control input-underline input-lg'
                    placeholder={translate('app.signup.username')}/>
                </div>
                <div className='form-group'>
                  <input
                    name='email'
                    type='email'
                    value={this.state.email}
                    onChange={this.handleInputChange.bind(this)}
                    className='form-control input-underline input-lg'
                    placeholder={translate('app.signup.email')}/>
                </div>
                <div className='form-group'>
                  <input
                    name='password'
                    type='password'
                    value={this.state.password}
                    onChange={this.handleInputChange.bind(this)}
                    className='form-control input-underline input-lg'
                    placeholder={translate('app.signup.password')}/>
                </div>
                <div className='form-group'>
                  <input
                    name='password_confirmation'
                    type='password'
                    value={this.state.password_confirmation}
                    onChange={this.handleInputChange.bind(this)}
                    className='form-control input-underline input-lg'
                    placeholder={translate('app.signup.password_confirmation')}/>
                </div>
                <div className='form-group redirect-to'>
                  {translate('app.login.had_account')}
                  <a href={constant.BASE_URL + constant.SIGN_IN_URI}>
                    {translate('app.login.submit')}
                  </a>
                </div>
              </div>
              <button type='submit' className='btn btn-white btn-outline btn-lg btn-rounded'>
                {translate('app.signup.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default UserSignUp;
