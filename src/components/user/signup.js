import React, { Component } from 'react';
import AlertContainer from 'react-alert';
import * as constant from '../constants';

import '../../assets/styles/common/authen.css';

let translate = require('counterpart');
let user = require('../../lib/api/users.js');
let authen = require('../../lib/api/authentication.js');
let ddp = require('../../lib/real_time_api/ddp_connection');
let group = require('../../lib/api/group');

let warningImage = require('../../assets/images/warning.png');
var firebase = require('firebase');

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
    var username = this.state.username;
    var component = this;
    var password = this.state.password;
    var password_confirmation = this.state.password_confirmation;
    var email = this.state.email;
    if( !username || !password || !password_confirmation || !email){
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
        firebase.database().ref('users').orderByChild('username').equalTo(username).once('value').then(function(result) {
          if(result.exists()){
            component.showAlert('exist username');
            user.delete().then(function() {
              // User deleted.
            }).catch(function(error) {
              // An error happened.
            });
          }else{            
            user.updateProfile({
              displayName: username,
              photoURL: constant.DEFAULT_AVATAR_URL
            }).then(function() {
              // Update successful.
              var success = 0;
              
              firebase.database().ref().child('users').child(user.uid).set({
                "username" : username,
                "email" : user.email,
                "role" : "user",
                "status" : "online",
                "avatarUrl" : constant.DEFAULT_AVATAR_URL
              }).then(function(){
                success = success + 1;
                if(success === 2){
                  window.location = constant.BASE_URL+'/chat/'+user.displayName;
                }
              }).catch(function(error){
                component.showAlert(error.message);
                user.delete().then(function() {
                  // User deleted.
                }).catch(function(error) {
                  // An error happened.
                });
                return;              
              })
  
              let ref = firebase.database().ref().child('rooms');
              ref.push().set({
                "members":[user.uid,user.uid,user.uid+'_'+user.uid]
              }).catch(function(error){
                component.showAlert(error.message);
                user.delete().then(function() {
                  // User deleted.
                }).catch(function(error) {
                  // An error happened.
                });
                return;
              })
              ref.on('child_added',function(snapshot){
                console.log(snapshot);
                var roomId = snapshot.key;
                firebase.database().ref().child('reference').child(user.uid + user.uid).set({
                  roomId
                }).then(function(){
                  success = success + 1;
                  if(success === 2){
                    window.location = constant.BASE_URL+'/chat/'+user.displayName;
                  }
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
            }).catch(function(error) {
              // An error happened.
              component.showAlert(error.message);
              user.delete().then(function() {
                // User deleted.
              }).catch(function(error) {
                // An error happened.
              });
            }); 
          }
        })
      }
    })
  } 

  render() {
    return(
      <div className='login-page ng-scope ui-view'>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS}/>
        <div className='row'>
          <div className='col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3'>
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
