import React,{Component} from 'react';
import Nav from '../homepage/nav';
import Toast from './toast';
import Loading from '../shared/loading';
import $ from 'jquery';

import {EventEmitter} from 'fbemitter';
import {onAuthStateChanged} from '../../lib/user/authentication';
import {extractNotificationInfo,getAllNotification,deleteNotification,createNewNotification} from '../../lib/notification/notifications';
import {getRoomId, createNewRoom} from '../../lib/room/rooms';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import
import {getUserByUid} from '../../lib/user/getuserinfo';


import * as constant from '../constants';
import * as translate from 'counterpart';
import * as tableConstant from '../../lib/constants';

import '../../assets/styles/common/notification.css';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class Notifications extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
      isLoading: true,
      permission: false,
      notifications : [],
      showDialog: false      
    }
    this.emitter = new EventEmitter();
  }

  componentWillMount(){
    var component= this;
    onAuthStateChanged(user =>{
      if(user){
        component.setState({currentUser:user,permission: true}, ()=>{
          component.setState({isLoading: false})
          var properties = {}
          properties['currentUser'] = component.state.currentUser;
          var notificationsArr = [];
          getAllNotification(properties, (event, data)=>{
            switch(event){
              case 'value':
                
                break;
              case 'child_added':
                notificationsArr.unshift(data);
                component.setState({notifications: notificationsArr});
                break;
              case 'child_removed':
                notificationsArr.every(function(element,index){           
                  if(element.id === data.id){
                      notificationsArr.splice(index,1);
                      component.setState({notifications: notificationsArr});
                      return false;
                  }else{
                      return true;
                  }
                })
                break;
            }
          })
        })
      }
      else{
        component.setState({isLoading: true})
        component.emitter.emit('AddNewErrorToast',
        translate('app.system_notice.unauthenticated.title'),
        translate('app.system_notice.unauthenticated.text'),
        5000, () => {
          window.location = constant.HOME_URI;
        })
        setTimeout(() => {
          window.location = constant.HOME_URI;
        },5000);
      }
    })
  }

  extractNotificationInfo(data){
    var type = data.type;
    switch(type){
      case tableConstant.NOTIFICATION_TYPE.requestRoom:
        var info =data.information.split('<br />');
        var fullname = info[0];
        var address = info[1];
        return (
          <ul>
            <li>{translate('app.payment.full_name') + ':\t' + info[0]}</li>
            <li>{translate('app.payment.country') + ':\t' + info[1]}</li>
            <li>{translate('app.payment.phone_number') + ':\t'+ info[2]}</li>
            <li>{translate('app.payment.age') + ':\t' + info[3]}</li>
            <li>{translate('app.payment.problem') + ':\t' + info[4]}</li>
            <li>{translate('app.notification.time_created') +
              this.convertDateToHour(data.timeStamp)
              + '\t' + this.convertDateToDay(data.timeStamp)}</li>
          </ul>
        )
    }
  }

  convertDateToHour(date){
    date = new Date(parseInt(date))
    return date.getUTCHours() + ':' + date.getUTCMinutes();
  }

  convertDateToDay(date){
    date = new Date(parseInt(date))
    return date.getUTCDate() + '/' +
      (date.getUTCMonth() + 1) + '/' + date.getUTCFullYear();
  }
  onCreateRoom(element){
    switch($('input[name='+element.id+']:checked', '#form'+element.id).val()){
      case '1':
        var properties = {}
        properties.currentUser = this.state.currentUser;
        properties.targetUser = {}
        properties.targetUser.uid = element.sender.uid;

        getRoomId(properties, (isssuccess, data) =>{
          if(!isssuccess){
            properties.lawyerId = this.state.currentUser.uid;
            properties.customerId = element.sender.uid;
            createNewRoom(properties, (key)=>{
              properties.nid = element.id;
              deleteNotification(properties);
              properties.type= tableConstant.NOTIFICATION_TYPE.acceptRoomRequest

              createNewNotification(properties, ()=>{

              })
              console.log('done');
              console.log(key);
              
            })
          }else{
            console.log(data);
          }
        })
        break;
      case '2':
        var properties = {}
        properties.currentUser = this.state.currentUser;
        properties.targetUser = {}
        properties.targetUser.uid = element.sender.uid;

        properties.nid = element.id;
        deleteNotification(properties);
        properties.type= tableConstant.NOTIFICATION_TYPE.refuseRoomRequest
              
        createNewNotification(properties, ()=>{

        })
        break;
      default:
        return;
    }
  }

  showButton(element){
    switch($('input[name='+element.id+']:checked', '#form'+element.id).val()){
      case '1':
        $('#button_'+element.id).text(translate('app.button.create_new_chat'));
        break;      
      case '2':
        $('#button_'+element.id).text(translate('app.button.destroy_room_request'));
        break; 
    }
    $('#button_'+element.id).show();
  }
  onConfirm(){
    this.setState({showDialog: false})    
  }
  onCancel(){
    this.setState({showDialog: false})
  }
  renderDialog(){
    return (
      <div>
      {
        this.state.showDialog &&
        <ReactConfirmAlert
          title={translate('app.confirm_dialog.title')}
          message={translate('app.confirm_dialog.message_2')}
          confirmLabel={translate('app.confirm_dialog.confirm_label_2')}
          cancelLabel={translate('app.confirm_dialog.cancel_label_2')}
          onConfirm={this.onConfirm.bind(this)}
          onCancel={this.onCancel.bind(this)}
        />
      }
      </div>
    )
  }

  removeNotification(element){
    var properties = {}
    properties.currentUser = this.state.currentUser;
    properties.targetUser = {}
    properties.targetUser.uid = element.sender.uid;

    properties.nid = element.id;
    deleteNotification(properties);
  }
  toChatRoom(element){
    let targetUid =element[tableConstant.NOTIFICATIONS.sender].uid;
    getUserByUid(targetUid, (event, data)=>{
      switch(event){
        case 'value':
          window.location = constant.BASE_URL + constant.CHAT_URI + '/' + data.val().username
        default:
          return;
      }
    })
  }
  renderRequestRoomNotificationItem(element){
    return(
        <div className="notifi-content">
          <div className="notification-item green">
            <div className="info">
            <h1>{element.sender.displayName+ translate('app.notification.new_room_request_title')}</h1>      
            
              <div className='info-detail'>
                <p className='title'>
                    {translate('app.notification.detail')}
                </p>
                <div>
                  {this.extractNotificationInfo(element)}
                </div>
              </div>
              <div className="ui form" id={'form'+element.id}>
                  <label>{translate('app.notification.evaluate')}</label>
                  <div className="field">
                    <div className="ui radio checkbox">
                      <input type="radio" name={element.id} value='1' onClick={this.showButton.bind(this,element)}/>
                      <label>{translate('app.notification.agree_with_case')}</label>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui radio checkbox">
                      <input type="radio" name={element.id} value='2' onClick={this.showButton.bind(this,element)}/>
                      <label>{translate('app.notification.disagree_with_case')}</label>
                    </div>
                </div>
              </div>
              <button className='button blue' display='none'
              id={'button_'+element.id}
                onClick={this.onCreateRoom.bind(this,element)}>
                  {translate('app.notification.create_dialog')}
              </button>
          </div>
          <div className='icon orange'>
            <i className='fa fa-asterisk'></i>
          </div>
          </div>
      </div>
    )
  }

  renderRefuseRoomNotificationItem(element){
    return(
      <div className="notifi-content">
        <div className="notification-item green">
          <div className="info">
          <h1>{element.sender.displayName+translate('app.notification.new_refuse_room_request_title')}</h1>      
          <div className='info-detail'>

            <button className='button blue' display='inline-block' onClick={this.removeNotification.bind(this,element)}>
                {translate('app.notification.already_known')}
            </button>
          </div>
        </div>
        <div className='icon red'>
          <i className='fa fa-user-times'></i>
        </div>
        </div>
      </div>
    )
  }
  renderAcceptRoomNotificationItem(element){
    return(
      <div className="notifi-content">
        <div className="notification-item green">
          <div className="info">
          <h1>{element.sender.displayName+translate('app.notification.new_accept_room_request_title')}</h1>      
          <div className='info-detail'>

            <button className='button blue' display='inline-block' onClick={this.toChatRoom.bind(this,element)}>
                {translate('app.notification.to_chat_room')}
            </button>

            <button className='button blue' display='inline-block' onClick={this.removeNotification.bind(this,element)}>
                {translate('app.notification.already_known')}
            </button>
          </div>
        </div>
        <div className='icon green'>
          <i className='fa fa-handshake-o'></i>
        </div>
        </div>
      </div>
    )
  }
  renderNotificationItem(element){
    switch(element.type){
      case tableConstant.NOTIFICATION_TYPE.requestRoom:
        return(
          this.renderRequestRoomNotificationItem(element)
        )
      case tableConstant.NOTIFICATION_TYPE.refuseRoomRequest:
        return(
          this.renderRefuseRoomNotificationItem(element)
        )
      case tableConstant.NOTIFICATION_TYPE.acceptRoomRequest:
        return(
          this.renderAcceptRoomNotificationItem(element)
        )
    }
  }

  renderView(){
    return (
      <div>
        <Nav navStyle='inverse'/>
        <div className='notifi-wrapper'>
          {this.state.notifications.map((element, index ) =>{
            return(
              this.renderNotificationItem(element)
            )
          })}
        </div>
      </div>  
    )
  }

  render(){
    return (
      <div>
        <Toast emitter={this.emitter}/>
        {!this.state.isLoading && this.state.permission ? 
          this.renderView() : <Loading/>}
      </div>
    )
  }
}

export default Notifications;