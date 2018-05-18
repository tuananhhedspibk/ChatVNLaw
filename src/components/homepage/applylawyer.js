import React, { Component } from 'react';
import $ from 'jquery';
import { EventEmitter } from 'fbemitter';
import * as firebase from 'firebase';

import Nav from './nav';
import Footer from './footer';
import NotFound from '../shared/notfound';
import Loading from '../shared/loading';
import { createNewNotification, getAllNotification } from '../../lib/notification/notifications';
import ThankLayoutContent from '../shared/thanklayoutcontent';
import Toast from '../notification/toast';
import { userGetRoom } from '../../lib/room/rooms';
import { loadProfilePage } from '../../lib/user/lawyers';

import * as constant from '../constants';
import * as translate from 'counterpart';

import '../../assets/styles/common/applyLawyer.css';

let info_pub = 0;

class ApplyLawyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentLawyer: null,
      isLoading: true,
      roomId: '',
      info: '',
      done: false,
      permission: false,
      notifications: [],
      has_noti: true,
    };
    this.emitter = new EventEmitter();
  }

  componentWillMount(){
    var component = this;
    firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        if(localStorage.chat_vnlaw_user) {
          if (JSON.parse(localStorage.chat_vnlaw_user)['role'] === 'Lawyer') {
            component.emitter.emit('AddNewErrorToast', '',
              translate('app.apply_lawyer.can_not'), 5000, ()=>{});
            setTimeout(() => {
              window.location = constant.HOME_URI;
            }, 5000);
          }
          else {
            var username = window.location.pathname.split('/applylawyer/')[1];
            loadProfilePage(username, (success, response) => {
              if(success) {
                var lawyer = {
                  username: response.data.lawyer_info.base_profile.userName,
                  displayName: response.data.lawyer_info.base_profile.displayName,
                  uid: response.data.lawyer_info.lawyer_profile.user_id,
                  photoURL: response.data.lawyer_info.base_profile.avatar.url,
                  id: response.data.lawyer_info.id
                }
                component.setState({currentLawyer: lawyer}, () => {
                  component.setState({currentUser: user});
                  var properties = {};
                  properties['currentUser'] = lawyer;
                  var notificationsArr = [];
                  getAllNotification(properties, (event, data)=>{
                    switch(event){
                      case 'value':
                        component.setState({notifications: notificationsArr});
                        component.checkNoti(notificationsArr, component);
                        component.checkRoom(component, lawyer);
                        break;
                      case 'child_added':
                        notificationsArr.unshift(data);
                        component.setState({notifications: notificationsArr});
                        component.checkNoti(notificationsArr, component);
                        break;
                      case 'child_removed':
                        notificationsArr.every(function(element,index){           
                          if (element.id === data.id){
                            notificationsArr.splice(index, 1);
                            component.setState({notifications: notificationsArr});
                            return false;
                          }
                          else{
                            return true;
                          }
                        })
                        break;
                      default:
                        break;
                    }
                  });
                });
              }
              else {
                component.emitter.emit('AddNewErrorToast', '',
                translate('app.apply_lawyer.can_not'),
                5000, ()=>{});
                setTimeout(() => {
                  window.location = constant.HOME_URI;
                }, 5000);
              }
            });
            component.setState({currentUser: user, permission: true});
          }
        }
        else {
          component.errorAndRedirect(translate('app.system_notice.unauthenticated.text'), component);
        }
      }
      else {
        component.errorAndRedirect(translate('app.system_notice.unauthenticated.text'), component);
      }
    });
  }

  checkNoti(notificationsArr, component) {
    var has_noti = false;
    notificationsArr.map((noti, idx) => {
      if (noti.type === 'requestRoom' & noti.sender.uid === component.state.currentUser.uid) {
        has_noti = true;
      }
    });
    component.setState({has_noti: has_noti});
    if (has_noti) {
      if (info_pub === 0) {
        info_pub = -1;
        component.redirectWhenCannotApply(component);
      }
    }
  }

  checkRoom(component, lawyer) {
    var properties = {
      lawyer_id: lawyer.id
    }
    userGetRoom(properties, (success, response) => {
      if (success) {
        if (response.data.room !== undefined) {
          if (response.data.room.opening) {
            component.redirectWhenCannotApply(component);
          }
          else {
            if (!component.state.has_noti) {
              component.setState({isLoading: false});
            }
          }
        }
        else {
          if (response.data.message === translate('app.apply_lawyer.room_not_found')) {
            if (!component.state.has_noti) {
              component.setState({isLoading: false});
            }
          }
        }
      }
      else {
        component.toastError(component, translate('app.system_notice.error.text.some_thing_not_work'));
      }
    });
  }

  toastError(component, message) {
    component.emitter.emit('AddNewErrorToast',
    translate('app.system_notice.error.title'),
    message, 5000, ()=>{});
    setTimeout(() => {
      window.location = constant.HOME_URI;
    }, 5000);
  }

  redirectWhenCannotApply(component) {
    component.setState({isLoading: true});
    component.emitter.emit('AddNewErrorToast',
    translate('app.system_notice.unauthenticated.title'),
    translate('app.system_notice.can_not_create_noti'), 5000, ()=>{});
    setTimeout(() => {
      window.location = constant.HOME_URI;
    }, 5000);
  }

  errorAndRedirect(message, component) {
    component.setState({isLoading :true});    
    component.emitter.emit('AddNewErrorToast',
      translate('app.system_notice.unauthenticated.title'),
      message, 5000, ()=>{}
    );
    setTimeout(() => {
      window.location = constant.SIGN_IN_URI;
    }, 5000);
  }

  handleClick(){
    var component = this;
    var fullname = $('.apply-lawyer-name').val();
    var address = $('.apply-lawyer-address').val()
    var phone = $('.apply-lawyer-phone').val();
    var age = $('.apply-lawyer-age').val();
    var problem = $('textarea#problem').val();
    if(fullname === ''|| address === ''|| phone === ''
      || age === '' || problem === ''){
      this.emitter.emit('AddNewWarningToast',
      translate('app.system_notice.warning.title'),
      translate('app.system_notice.warning.text.please_fill_the_form'),
      5000, () => {} )
    } 
    else {
      var info = fullname
      +'<br />' + address
      + '<br />' + phone
      + '<br />' + age
      + '<br />' + problem;
      var properties = {}
      properties['targetUser'] = this.state.currentLawyer;
      properties['currentUser'] = this.state.currentUser;
      properties['type'] = 'requestRoom';
      properties['info'] = info;

      info_pub = 1;
      
      createNewNotification(properties, () =>{
      });

      this.setState({done: true},()=>{
        component.emitter.emit('AddNewSuccessToast', '',
          translate('app.system_notice.success.text.submit_form_to_request_room'),
          5000, ()=>{});
        setTimeout(() => {
          window.location = constant.HOME_URI;
        }, 5000);
      })
    }
  }

  renderView(){
    return (
      <div className='apply-lawyer-main'>
        <div className='container'>
          <div className='apply-lawyer-container'>
            <div className='row'>
              <div className='col-sm-12 col-md-9'>
                <div className='tab-content'>
                  <div className='form-section'>
                    <div className='apply-lawyer-header'>
                      {translate('app.payment.personal_info')}
                    </div>
                    <div className='form-group apply-lawyer-contact'>
                      <label htmlFor='usr'>
                        {translate('app.payment.full_name')}
                      </label>
                      <input className='form-control apply-lawyer-name'
                        id='usr' type='text'
                        placeholder={translate('app.payment.placeholder_name')} />
                    </div>
                    <div className='form-group apply-lawyer-contact'>
                      <label htmlFor='usr'>{translate('app.payment.country')}</label>
                      <input type='text' id='usr'
                        className='form-control apply-lawyer-address'
                        placeholder={translate('app.payment.placeholder_country')} />
                    </div>
                    <div className='form-group apply-lawyer-contasearchct'>
                      <label htmlFor='usr'>{translate('app.payment.age')}</label>
                      <input type='number' id='usr'
                        className='form-control apply-lawyer-age'
                        placeholder={translate('app.payment.placeholder_age')} />
                    </div>
                    <div className='form-group apply-lawyer-contact'>
                      <label htmlFor='usr'>
                        {translate('app.payment.phone_number')}
                      </label>
                      <input type='number' id='usr'
                        className='form-control apply-lawyer-phone'
                        placeholder={translate('app.payment.placeholder_phone')} />
                    </div>
                  </div>
                  <div className='form-section'>
                    <div className='apply-lawyer-header'>
                      {translate('app.payment.problem')}
                    </div>
                    <div className='form-group'>
                      <textarea
                        className='form-control apply-lawyer-problem'
                        rows='5' id='problem'>
                      </textarea>
                    </div>
                    <button type='button'
                      className='btn apply-lawyer-button'
                      onClick={this.handleClick.bind(this)}>
                        {translate('app.payment.apply_lawyer')}
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-sm-12 col-md-3'>
                <div className='side-content'>
                  <div className='overview-section'>
                    <i className='fa fa-id-badge'
                      aria-hidden='true'></i>
                    <p className='title'>
                      {translate('app.payment.personal_info')}
                    </p>
                    <div className='overview-content'>
                      {translate('app.payment.personal_info_overview')}
                    </div>
                  </div>
                  <div className='overview-section'>
                    <i className='fa fa-exclamation-triangle'
                      aria-hidden='true'></i>
                    <p className='title'>
                      {translate('app.payment.problem')}
                    </p>
                    <div className='overview-content'>
                      {translate('app.payment.problem_overview')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderMain() {
    if(!this.state.isLoading && this.state.permission){
      if(!! this.state.currentLawyer){
        return(
          <div>
            <Nav navStyle='inverse'/>
            {this.state.done ? <ThankLayoutContent/> : this.renderView()}
            <Footer/>
          </div>
        );
      }else{
        return(      
          <NotFound />
        )
      }
    }
    else{
      return(
        <Loading />
      )
    }   
  }

  render(){
    return(
      <div>
        <Toast emitter={this.emitter}/>
        {this.renderMain()}
      </div>
    )
  }
}

export default ApplyLawyer;
