import React, { Component } from 'react';
import $ from 'jquery';
import { Header, TextArea, Button, Image,Modal, Dropdown } from 'semantic-ui-react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { EventEmitter } from 'fbemitter';
import * as firebase from 'firebase';

import Nav from './nav';
import Footer from './footer';
import NotFound from '../shared/notfound';
import Loading from '../shared/loading';
import Payment from '../payments/payment';
import {createNewNotification,noticeWhenNewNotiComing}
  from '../../lib/notification/notifications';
import ThankLayoutContent from '../shared/thanklayoutcontent';
import Toast from '../notification/toast';
import {checkAuthen} from '../../lib/notification/toast';
import {onAuthStateChanged} from '../../lib/user/authentication';

import * as constant from '../constants';
import * as Lawyers from '../../lib/user/lawyers';
import * as translate from 'counterpart';

import '../../assets/styles/common/applyLawyer.css';

class ApplyLawyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentLawyer: null,
      isLoading: true,
      roomId: '',
      modalOpen: false,
      info: [],
      done: false,
      permission: false
    };
    this.emitter = new EventEmitter();
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        if(localStorage.chat_vnlaw_user) {
          if (JSON.parse(localStorage.chat_vnlaw_user)['role'] === 'Lawyer') {
            this.emitter.emit('AddNewErrorToast', '',
              translate('app.apply_lawyer.can_not'), 5000, ()=>{});
            window.location = constant.BASE_URL;
          }
          else {
            var component = this;
            var username = this.props.location.pathname.split('/applylawyer/')[1];
            Lawyers.loadProfilePage(username, (success, response) => {
              if(success) {
                var lawyer = {
                  username: response.data.lawyer_info.base_profile.userName,
                  displayName: response.data.lawyer_info.base_profile.displayName,
                  uid: response.data.lawyer_info.lawyer_profile.user_id,
                  photoURL: response.data.lawyer_info.base_profile.avatar.url
                }
                this.setState({isLoading: false, currentLawyer: lawyer})
              }
              else {
                component.emitter.emit('AddNewErrorToast', '',
                translate('app.apply_lawyer.can_not'),
                5000, ()=>{
                  window.location = constant.BASE_URL;
                });
              }
            });
            onAuthStateChanged(user =>{
              if(user){
                component.setState({currentUser: user, permission: true});
              }
              else{
                component.setState({isLoading : true})   
                checkAuthen(component.emitter, constant.HOME_URI , ()=>{})     
              }
            });
          }
        }
      }
      else {
        window.location = constant.SIGN_IN_URI;
      }
    });
  }

  handleOpenModal(){
    this.setState({
      modalOpen: true
    });
  }

  handleCloseModal(){
    this.setState({
      modalOpen: false
    });
  }

  renderPaymentInfo(){
    return(
      <Modal 
        onClose={this.handleCloseModal.bind(this)}
        open={this.state.modalOpen}
        id='edit-user-profile-box' closeIcon={true}>
        <Modal.Header>
          {translate('app.payment.title')}
        </Modal.Header>
        <Modal.Content>
          <Payment fullInfo={this.state.info}/>
        </Modal.Content>
      </Modal>
    )
  }

  changeStep(previousSection, nextSection,
    itemIdActive, itemIdNotActive) {
      $(previousSection).removeClass('active');
      $(previousSection + '-overview').hide();
      $(nextSection).addClass('active');
      $(nextSection + '-overview').show();
      $(itemIdActive).parent().addClass('active');
      $(itemIdNotActive).parent().removeClass('active');
  }

  handleClick(){
    var component = this;
    var fullname = $('.apply-lawyer-name').val();
    var address = $('.apply-lawyer-address').val()
    var phone = $('.apply-lawyer-phone').val();
    var age = $('.apply-lawyer-age').val();
    var problem = $('textarea#problem').val();
    var fullInfo = [];
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
      
      createNewNotification(properties, () =>{
      });

      this.setState({done: true},()=>{
        component.emitter.emit('AddNewSuccessToast', '',
          translate('app.system_notice.success.text.submit_form_to_request_room'),
          5000, ()=>{
          window.location = constant.HOME_URI;
        })
      })
    }
  }

  renderView(){
    return (
      <div>
        <div>
          {this.renderPaymentInfo()}
        </div>
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
