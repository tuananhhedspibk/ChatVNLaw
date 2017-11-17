import React, { Component } from 'react';
import AlertContainer from 'react-alert';
import firebase from 'firebase';
import {createUserWithEmailAndPassword,onAuthStateChanged} from '../../lib/user/authentication';
import Loading from '../shared/loading';

import Nav from '../homepage/nav';

import * as constant from '../constants';
import * as translate from 'counterpart';
import * as userInfo from '../../lib/user/getuserinfo';

import '../../assets/styles/common/authen.css';

const warningImage = require('../../assets/images/warning.png');

class UserSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
      currentUser: null,
      isLoading: true
    }
  }

  componentWillMount() {
    var component = this;
    onAuthStateChanged( user =>{
      if(!!user){
        userInfo.getUserName(user, function(result){
          const target = localStorage.getItem('target')
          switch(target){
            case 'chat':
              window.location = constant.BASE_URL+ '/chat/' + result; 
              break;
            default:
              window.location = constant.BASE_URL+ '/home';
              break;      
          }                   
        })
      }
      component.setState({currentUser: user, isLoading : false})
    })
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
    createUserWithEmailAndPassword(email,password, (issuccess , data) =>{
      if(issuccess){
        if(data){             
          data.updateProfile({
            displayName: displayName,
            photoURL: constant.DEFAULT_AVATAR_URL
          }).then(function() {
            firebase.database().ref(`users/${data.uid}`).update({
              "displayName" : displayName,
              "username": username
            }).then(function(){
              window.location = constant.BASE_URL+'/chat/'+username;              
            }).catch(function(error){
              component.showAlert(error.message);
              data.delete().then(function() {
              }).catch(function(error) {
              });
              return;              
            });
          })
        }
      }else{
        component.showAlert(data.message);
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
  renderView() {
    return(
      <div className='login-page ng-scope ui-view'>
        <Nav navStyle='inverse'/>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS}/>
        <div className='row justify-content-md-center'>
          <div className='col-md-4 col-lg-4 col-md-offset-3 col-lg-offset-3'>
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
              <button type='submit' className='btn btn-white btn-lg'>
                {translate('app.signup.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  render(){
    if(this.state.isLoading){
      return(
        <Loading />
      )
    }else{
      if(!this.state.currentUser){
        return(
          <div>
            {this.renderView()}
          </div>
        )
      }
    }
  }
}

export default UserSignUp;
