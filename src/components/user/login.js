import React, { Component } from 'react';
import firebase from 'firebase';
import $ from 'jquery';
import {signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged}
  from '../../lib/user/authentication';
import Loading from '../shared/loading';
import Toast from '../notification/toast';
import {EventEmitter} from 'fbemitter';
import Nav from '../homepage/nav';
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
      email: null,
      password: null,
      currentUser: null,
      isLoading: true
    }
    this.emitter = new EventEmitter();
    
  }

  componentWillMount(){
    var component = this;
    onAuthStateChanged( user =>{
      if(!!user){
        userInfo.getUserName(user, function(result){
          component.setState({isLoading : true})
          checkAlreadyLogin(component.emitter,()=> {
            component.redirect(result)
          });
        })
      }else{
        component.setState({currentUser: user, isLoading : false})        
      }
    })
  }
  redirect(result){
    const target = localStorage.getItem('target')
    switch(target){
      case 'chat':
        window.location = constant.BASE_URL+ '/chat/' + result; 
        break;
      default:
        window.location = constant.BASE_URL+ '/home';
        break;      
    } 
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

  handleSubmit(evt) {
    var component = this;
    evt.preventDefault();
    if(!this.state.email || !this.state.password){
      this.emitter.emit('AddNewWarningToast',translate('app.system_notice.warning.title'),translate('app.system_notice.warning.text.please_fill_the_form'), 5000, ()=>{} )
      return;
    }
    signInWithEmailAndPassword(this.state.email,this.state.password, (issuccess, data) =>{
      if(issuccess){
        if(data){
          firebase.database().ref().child('users').child(data.uid).update({
            "status" : "online",
          }).catch(function(error){
            component.emitter.emit('AddNewErrorToast', '',error.message, 5000, ()=>{ })                    
          }).then(function(){
          })
        }        
      }else{
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
