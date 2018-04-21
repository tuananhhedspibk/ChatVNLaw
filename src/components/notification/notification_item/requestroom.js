import React from 'react';
import $ from 'jquery';

import BaseItem from './baseitem';

import { createNewRoom, createNewRoomFb } from '../../../lib/room/rooms';
import { deleteNotification,
  createNewNotification }from '../../../lib/notification/notifications';

import { createInitMessage } from '../../../lib/messages/messages';

import * as translate from 'counterpart';
import * as tableConstant from '../../../lib/constants';
import * as constant from '../../constants';

class RequestRoomItem extends BaseItem {
  constructor(props) {
    super(props);
    this.state = {
      currentRoomId: ''
    }
  }

  notifiOperation(noti_type, element) {
    var propertiesNoti = {}
    propertiesNoti.currentUser = this.state.currentUser;
    propertiesNoti.targetUser = {}
    propertiesNoti.targetUser.uid = element.sender.uid;
    propertiesNoti.nid = element.id;

    deleteNotification(propertiesNoti);
    propertiesNoti.type= noti_type;
    createNewNotification(propertiesNoti, ()=>{
    });
  }

  sendInitMessage(element, currentRoomId) {
    var initMessContent = '';
    var data = element.information.split('<br />');
    initMessContent += translate('app.init_mess.content_1') + data[0] +
      translate('app.init_mess.content_2') + data[4] +
      translate('app.init_mess.content_3');
    
    var properties = {
      content: initMessContent,
      senderId: element.sender.uid,
      currentRoomId: currentRoomId
    }
    createInitMessage(properties, () => {

    });
  }

  gotoDialogBtnClick(element) {
    this.notifiOperation(tableConstant.NOTIFICATION_TYPE.acceptRoomRequest,
      element);
    var currentRoomId = null;
    this.props.rooms.map(room => {
      if(room.lawyer.id === JSON.parse(localStorage.chat_vnlaw_user)['lawyer_id']
        && room.user.uid === this.props.element.sender.uid) {
          currentRoomId = room.id;
      }
    });
    this.sendInitMessage(element, currentRoomId);
    window.location = constant.DASHBOARD_URI;
  }

  createDialogBtnClick(element){
    var propertiesNoti = {}
    var currentUser = this.state.currentUser;
    var component = this;
    currentUser.userName = JSON.parse(localStorage.chat_vnlaw_user)['userName'];
    this.setState({currentUser: currentUser});
    propertiesNoti.currentUser = this.state.currentUser;
    propertiesNoti.targetUser = {}
    propertiesNoti.targetUser.uid = element.sender.uid;

    var properties = {
      user_id: element.sender.uid,
      description: ''
    };
    createNewRoom(properties, (success, response)=>{
      if (success) {
        var properties_fb = {
          roomId: response.data.room.id,
          lawyerId: component.state.currentUser.uid,
          customerId: element.sender.uid
        }
        createNewRoomFb(properties_fb, key => {
          propertiesNoti.nid = element.id;
          deleteNotification(propertiesNoti);
          propertiesNoti.type = tableConstant.NOTIFICATION_TYPE.acceptRoomRequest;
          createNewNotification(propertiesNoti, ()=>{
          });
          component.sendInitMessage(element, response.data.room.id);
        });
      }
      else {
        console.log(response);
      }
    })
  }

  denyDialogBtnClick(element) {
    this.notifiOperation(tableConstant.NOTIFICATION_TYPE.refuseRoomRequest,
      element);
  }

  renderButton(element){
    switch($('input[name='+element.id+']:checked', '#form'+element.id).val()){
      case '1':
        $('#button_create_'+ element.id).show();
        $('#button_deny_'+ element.id).hide();
        break;      
      case '2':
        $('#button_create_'+ element.id).hide();
        $('#button_deny_'+ element.id).show();
        break; 
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

  renderDetailInfo(data){
    var type = data.type;
    switch(type){
      case tableConstant.NOTIFICATION_TYPE.requestRoom:
        var info = data.information.split('<br />');
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

  renderAcceptBtn() {
    var component = this;
    var hasRoom = false;
    this.props.rooms.map(room => {
      if(room.lawyer.id === JSON.parse(localStorage.chat_vnlaw_user)['lawyer_id']
        && room.user.uid === this.props.element.sender.uid) {
          hasRoom = true;
        }
    });
    if (hasRoom) {
      return (
        <button className='button blue display_none'
          id={'button_create_'+ this.state.element.id}
          onClick={this.gotoDialogBtnClick.bind(this,
            this.state.element)}>
              {translate('app.notification.goto_dialog')}
        </button>
      )
    }
    else {
      return (
        <button className='button blue display_none'
          id={'button_create_'+this.state.element.id}
          onClick={this.createDialogBtnClick.bind(this,this.state.element)}>
            {translate('app.notification.create_dialog')}
        </button>
      )
    }
  }

  render(){
    return(
    <div className='notifi-content'>
      <div className='notification-item green'>
        <div className='info'>
          <h1>
            {this.state.element.sender.displayName +
              translate('app.notification.new_room_request_title')}
          </h1>      
          <div className='info-detail'>
            <p className='title'>
              {translate('app.notification.detail')}
            </p>
            <div>
              {this.renderDetailInfo(this.state.element)}
            </div>
          </div>
          <div className='ui form' id={'form' + this.state.element.id}>
            <label>{translate('app.notification.evaluate')}</label>
            <div className='field'>
              <div className='ui radio checkbox'>
                <input type='radio' id={'radio-1-' + this.state.element.id}
                  name={this.state.element.id} value='1'
                  onClick={this.renderButton.bind(this,this.state.element)}/>
                <label htmlFor={'radio-1-' + this.state.element.id}>
                  {translate('app.notification.agree_with_case')}
                </label>
              </div>
            </div>
            <div className='field'>
              <div className='ui radio checkbox'>
                <input type='radio' id={'radio-2-' + this.state.element.id}
                  name={this.state.element.id} value='2'
                  onClick={this.renderButton.bind(this,this.state.element)}/>
                <label htmlFor={'radio-2-' + this.state.element.id}>
                  {translate('app.notification.disagree_with_case')}
                </label>
              </div>
            </div>
          </div>
          {this.renderAcceptBtn()}
          <button className='button blue display_none'
            id={'button_destroy_'+ this.state.element.id}
            onClick={this.denyDialogBtnClick.bind(this,
              this.state.element)}>
                {translate('app.notification.destroy_room_request')}
          </button>
        </div>
        <div className='icon orange'>
          <i className='fa fa-asterisk'></i>
        </div>
      </div>
    </div>
    )
  }
}

export default RequestRoomItem;
