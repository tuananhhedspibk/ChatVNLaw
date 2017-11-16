import React, { Component } from 'react';
import AlertContainer from 'react-alert';

import Nav from '../homepage/nav';

import * as constant from '../constants';

import '../../assets/styles/common/authen.css';
import '../../assets/styles/common/main.css';

const translate = require('counterpart');
const firebase = require('firebase');
const $ = require('jquery');
const userInfo = require('../../lib/helper/user/get_user_info');

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount(){
    $('#button-login-with-facebook').on('click', event => {
      console.log('facebook');
      var provider = new firebase.auth.FacebookAuthProvider();
      this.signInWithPopup(provider);
    });

    $('#button-login-with-google').on('click', event => {
      var provider = new firebase.auth.GoogleAuthProvider();
      this.signInWithPopup(provider);      
    });
  }
  signInWithPopup(provider){
    var component = this;
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var user = result.user;
      userInfo.getUserName(user, function(result){
        const target = localStorage.getItem('target')
        if (!target){
          window.location = constant.BASE_URL+ '/home'           
        }
        if (target === 'home') {
          window.location = constant.BASE_URL+ '/home' 
        }
        if (target === 'chat') {
          window.location = constant.BASE_URL+ '/chat/' + result; 
        }
               
      })
    }).catch(function(error) {
      var errorMessage = error.message;
      component.showAlert(errorMessage);
    });  
  }

  showAlert = (text) => {
    this.msg.show(text, {
      time: 5000,
      type: 'success',
      icon: <img alt='warning' src={constant.warningPic} />
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
    firebase.auth().signInWithEmailAndPassword(this.state.username,this.state.password).catch(function(error){
      component.showAlert(error.message);
    }).then(function(user){
      if(user){
        firebase.database().ref().child('users').child(user.uid).update({
          "status" : "online",
        }).catch(function(error){
          component.showAlert(error.message);
        }).then(function(){
          userInfo.getUserName(user, function(result){
            const target = localStorage.getItem('target')
            if (target === 'home') {
              window.location = constant.BASE_URL+ '/home' 
            }
            if (target === 'chat') {
              window.location = constant.BASE_URL+ '/chat/' + result; 
            }
                   
          })
        })
      }
    });
  }

  render() {
    return(
      <div className='login-page ng-scope ui-view'>
        <Nav navStyle='inverse'/>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS}/>
        <div className='row justify-content-md-center'>
          <div className='col-md-4'>
            <img src={constant.logoPic} className='app-logo' alt=''/>
            <div className='omni-auth'>
              <button id='button-login-with-facebook'>
                {translate('app.identifier.login_face')}
              </button>
              <button id='button-login-with-google'>
                {translate('app.identifier.login_google')}
              </button>
            </div>
            <div className='or'>
              {translate('app.identifier.or')}
            </div>
            <form onSubmit={this.handleSubmit.bind(this)}
              className='ng-pristine ng-valid'>
              <div className='form-content'>
                <div className='form-group'>
                  <input type='text'
                    name='username'
                    value={this.state.username}
                    onChange={this.handleInputChange.bind(this)}
                    className='form-control input-lg'
                    placeholder={translate('app.login.email')}/>
                </div>
                <div className='form-group'>
                  <input type='password'
                    name='password'
                    value={this.state.password}
                    onChange={this.handleInputChange.bind(this)}
                    className='form-control input-lg'
                    placeholder={translate('app.login.password')}/>
                </div>
                <div className='form-group redirect-to'>
                  {translate('app.signup.new_to_us')}
                  <a href={constant.BASE_URL + constant.SIGN_UP_URI}>
                    {translate('app.signup.submit')}
                  </a>
                </div>
              </div>
              <button type='submit' className='btn btn-white btn-lg'>
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
