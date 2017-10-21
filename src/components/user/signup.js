import React, { Component } from 'react';
import AlertContainer from 'react-alert';

import * as constant from '../constants';

import '../../assets/styles/common/authen.css';

const warningImage = require('../../assets/images/warning.png');
const translate = require('counterpart');
const firebase = require('firebase');

class UserSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
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

  }
  componentDidMount(){

  }
  showAlert = (text) => {
    this.msg.show(text, {
      time: 5000,
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
    var displayName = this.state.displayName;
    var username = this.convertUserName(displayName);
    var component = this;
    var password = this.state.password;
    var password_confirmation = this.state.password_confirmation;
    var email = this.state.email;
    if( !displayName || !password || !password_confirmation || !email){
      component.showAlert('missing required field');
      return;
    }
    if(password !== password_confirmation){
      component.showAlert('password not match');
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .catch(function(error){
      component.showAlert(error.message);
    })
    .then(function(user){
      if(user){             
        user.updateProfile({
          displayName: displayName,
          photoURL: constant.DEFAULT_AVATAR_URL
        }).then(function() {
          firebase.database().ref(`users/${user.uid}`).update({
            "displayName" : displayName,
            "username": username
          }).then(function(){
            window.location = constant.BASE_URL+'/chat/'+username;              
            
          }).catch(function(error){
            component.showAlert(error.message);
            user.delete().then(function() {
              // User deleted.
            }).catch(function(error) {
              // An error happened.
            });
            return;              
          })
        })
      }
    })
  }

  convertUserName(displayName){
    var str = displayName.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/\W+/g, ' ');
    str = str.replace(/\s/g, '.');
    str += '.'+(new Date()).getTime()
    return str; 
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
                    name='displayName'
                    value={this.state.displayName}
                    onChange={this.handleInputChange.bind(this)}
                    className='form-control input-underline input-lg'
                    placeholder={translate('app.signup.displayName')}/>
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
