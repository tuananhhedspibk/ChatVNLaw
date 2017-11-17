import React, { Component } from 'react';
import AlertContainer from 'react-alert';
import firebase from 'firebase';
import $ from 'jquery';
import {signInWithPopup,signInWithEmailAndPassword,onAuthStateChanged} from '../../lib/user/authentication';
import Loading from '../shared/loading';

import Nav from '../homepage/nav';

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
  }

  componentWillMount(){
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
  componentDidUpdate(prevProps, prevState){
    if(prevState.isLoading !== this.state.isLoading){
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
  }
  signInWithPopup(provider){
    var component = this;    
    signInWithPopup(provider, (issuccess,result) =>{
      if(issuccess){
      }else{
        component.showAlert(result.message);        
      }
    })  
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
    signInWithEmailAndPassword(this.state.email,this.state.password, (issuccess, data) =>{
      if(issuccess){
        if(data){
          firebase.database().ref().child('users').child(data.uid).update({
            "status" : "online",
          }).catch(function(error){
            component.showAlert(error.message);
          }).then(function(){
          })
        }
      }else{
        component.showAlert(data.message);
      }
    })
  }

  renderView(){
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
          </div>
        </div>
      </div>
    )
  }
  render() {
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

export default UserLogin;
