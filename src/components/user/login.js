import React, { Component } from 'react';
import AlertContainer from 'react-alert';

import * as constant from '../constants';

import '../../assets/styles/common/authen.css';
import '../../assets/styles/common/main.css';

let translate = require('counterpart');
var authen = require('../../lib/api/authentication.js');

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  componentWillMount() {
    if(localStorage.rocket_chat_user != null) {
      this.props.history.push();
    }
  }

  showAlert = (text) => {
    this.msg.show(text, {
      time: 2000,
      type: 'success',
      icon: <img alt='warning' src={constant.warning} />
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
    var component = this;
    evt.preventDefault();
    authen.login(this.state.username, this.state.password, function(response){
      if(response.status === 200){
        component.props.history.push(constant.CHAT_URI + '/' +
          component.state.username);
      }
    });
  }

  render() {
    return(
      <div className='login-page ng-scope ui-view'>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS}/>
        <div className='row justify-content-md-center'>
          <div className='col-md-6'>
            <img src={constant.logoPic} className='user-avatar' alt=''/>
            <h1>{translate('app.identifier.app_name')} <small>
              {translate('app.identifier.slogan')}</small></h1>
            <form onSubmit={this.handleSubmit.bind(this)}
              className='ng-pristine ng-valid'>
              <div className='form-content'>
                <div className='form-group'>
                  <input type='text'
                    name='username'
                    value={this.state.username}
                    onChange={this.handleInputChange.bind(this)}
                    className='form-control input-underline input-lg'
                    placeholder={translate('app.login.username')}/>
                </div>
                <div className='form-group'>
                  <input type='password'
                    name='password'
                    value={this.state.password}
                    onChange={this.handleInputChange.bind(this)}
                    className='form-control input-underline input-lg'
                    placeholder={translate('app.login.password')}/>
                </div>
                <div className='form-group redirect-to'>
                  {translate('app.signup.new_to_us')}
                  <a href={constant.BASE_URL + constant.SIGN_UP_URI}>
                    {translate('app.signup.submit')}
                  </a>
                </div>
              </div>
              <button type='submit' className='btn btn-white btn-outline btn-lg btn-rounded'>
                {translate('app.login.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default UserLogin;
