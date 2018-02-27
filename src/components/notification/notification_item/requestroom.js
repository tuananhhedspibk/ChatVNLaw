import React from 'react';
import {getRoomId, createNewRoom} from '../../../lib/room/rooms';
import $ from 'jquery';
import {extractNotificationInfo,getAllNotification,deleteNotification,createNewNotification} from '../../../lib/notification/notifications';
import BaseItem from './baseitem';

import * as translate from 'counterpart';
import * as tableConstant from '../../../lib/constants';

class RequestRoomItem extends BaseItem {
  
  onClickButton(element){
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

  renderButton(element){
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
          <button className='button blue display_none'
            id={'button_'+this.state.element.id}
            onClick={this.onClickButton.bind(this,this.state.element)}>
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
}

export default RequestRoomItem;
