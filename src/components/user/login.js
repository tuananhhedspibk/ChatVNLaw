import React, { Component } from 'react';
import firebase from 'firebase';
import $ from 'jquery';
import {EventEmitter} from 'fbemitter';

import Loading from '../shared/loading';
import Toast from '../notification/toast';
import Nav from '../homepage/nav';
import Footer from '../homepage/footer';

import {signInWithPopup, signInWithEmailAndPassword,
  onAuthStateChanged, loginRails} from '../../lib/user/authentication';
import {checkAlreadyLogin} from '../../lib/notification/toast';

import * as constant from '../constants';
import * as translate from 'counterpart';
import * as userInfo from '../../lib/user/getuserinfo';

import '../../assets/styles/common/authen.css';
import '../../assets/styles/common/main.css';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      currentUser: null,
      isLoading: false
    }
    this.emitter = new EventEmitter();
  }

  componentWillMount(){
    if (localStorage.chat_vnlaw_user) {
      this.redirect();
    }
  }

  redirect(){
    var uri = localStorage.getItem('redirect_uri');
    localStorage.removeItem('redirect_uri');
    if (uri.includes(constant.APPLY_LAWYER_URI)) {
      if (JSON.parse(localStorage.chat_vnlaw_user)['role'] === 'Lawyer') {
        this.emitter.emit('AddNewErrorToast', '',
          translate('app.apply_lawyer.can_not'),
          5000, ()=>{});
          setTimeout(() => {
            window.location = constant.BASE_URL;
          }, 5000);
        return;
      }
    }
    window.location = uri;
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.isLoading !== this.state.isLoading){
      $('#button-login-with-facebook').on('click', event => {
        var provider = new firebase.auth.FacebookAuthProvider();
        this.signInWithPopup(provider);
      });
  
      $('#button-login-with-google').on('click', event => {
        var provider = new firebase.auth.GoogleAuthProvider();
        this.signInWithPopup(provider);      
      });
    }
  }

  signInWithPopup(provider){
    var component = this;    
    signInWithPopup(provider, (issuccess,result) =>{
      if(issuccess){
      }else{
        component.emitter.emit('AddNewErrorToast', '',result.message, 5000, ()=>{ })        
      }
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

  logout() {
    firebase.auth().signOut().then(function() {
      window.location = constant.BASE_URL + constant.HOME_URI;
    }).catch(function(error) {});
  }

  handleSubmit(evt) {
    var component = this;
    evt.preventDefault();
    if(!this.state.email || !this.state.password){
      this.emitter.emit('AddNewWarningToast',
        translate('app.system_notice.warning.title'),
        translate('app.system_notice.warning.text.please_fill_the_form'),
        5000, ()=>{} )
      return;
    }
    signInWithEmailAndPassword(this.state.email, this.state.password, (issuccess, data) =>{
      if(issuccess){
        if(data){
          loginRails(component.state.email, component.state.password, (success, response) => {
            if (success) {
              let chat_vnlaw_user = {
                'id': response.data.id,
                'email': component.state.email,
                'token': response.data.userToken,
                'role': response.data.role,
                'userName': response.data.userName,
                'displayName': response.data.displayName,
                'avatar': response.data.avatar
              }
              if(chat_vnlaw_user.role == 'Lawyer') {
                chat_vnlaw_user['lawyer_id'] = response.data.lawyer_id;
              }
              localStorage.setItem(constant.STORAGE_ITEM, JSON.stringify(chat_vnlaw_user));
              onAuthStateChanged( user =>{
                if(!!user){
                  component.setState({isLoading : true})
                  checkAlreadyLogin(component.emitter, () => {
                    if(localStorage.chat_vnlaw_user) {
                      component.redirect();
                    }
                  });
                }else{
                  component.setState({currentUser: user, isLoading : false})        
                }
              })
            }
            else {
              component.logout();
              component.emitter.emit('AddNewErrorToast', '',
                response.message, 5000, ()=>{ })                         
              return;
            }
          })
        }        
      }else{
        console.log(data.code);
        switch(data.code){
          case 'auth/invalid-email':
            component.emitter.emit('AddNewErrorToast',
              '', translate('app.system_notice.error.text.invalid_email'),
              5000, ()=>{ })                         
            break;
          case 'auth/user-not-found':
            component.emitter.emit('AddNewErrorToast', '',
              translate('app.system_notice.error.text.user_not_found'),
              5000, ()=>{ })                        
            break;
          case 'auth/wrong-password':
            component.emitter.emit('AddNewErrorToast', '',
              translate('app.system_notice.error.text.user_not_found'),
              5000, ()=>{ })                        
            break;
        }
      }
    })
  }

  renderView(){
    return(
      <div className='login-page ng-scope ui-view'>
        <Nav navStyle='inverse'/>
        <div className='row justify-content-md-center'>
          <div className='col-md-4'>
            <div className='box'>
              <img src={constant.appLogoPic}
                className='app-logo' alt=''/>
              <div className='elip-section'>
              </div>
              <form onSubmit={this.handleSubmit.bind(this)}
                className='ng-pristine ng-valid'>
                <div className='form-content'>
                  <div className='form-group'>
                    <input type='email'
                      name='email'
                      value={this.state.email}
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
              <div className='or'>
                {translate('app.identifier.or')}
              </div>
              <div className='omni-auth'>
                <button id='button-login-with-facebook'>
                  {translate('app.identifier.login_face')}
                </button>
                <button id='button-login-with-google'>
                  {translate('app.identifier.login_google')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

  renderMain() {
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

  render(){
    return(
      <div>
        <Toast emitter = {this.emitter}/>
        {this.renderMain()}
      </div>
    )
  }
}

export default UserLogin;
