import React from 'react';
import {deleteNotification} from '../../../lib/notification/notifications';
import BaseItem from './baseitem';

import * as translate from 'counterpart';
import * as tableConstant from '../../../lib/constants';
import * as constant from '../../constants';

class AcceptRoomItem extends BaseItem{
  removeNotification(element){
    var properties = {}
    properties.currentUser = this.state.currentUser;
    properties.targetUser = {}
    properties.targetUser.uid = element.sender.uid;

    properties.nid = element.id;
    deleteNotification(properties);
  }

  toChatRoom(element){
    let userName = element.sender.userName;
    window.location = constant.BASE_URL + constant.CHAT_URI + '/' + userName;
  }

  render(){
    return(
      <div className='notifi-content'>
      <div className='notification-item green'>
        <div className='info'>
        <h1>{this.state.element.sender.displayName +
          translate('app.notification.new_accept_room_request_title')}
        </h1>      
        <div className='info-detail'>
          <button className='button blue display_inline'
            onClick={this.toChatRoom.bind(this, this.state.element)}>
              {translate('app.notification.to_chat_room')}
          </button>
          <button className='button blue display_inline'
            onClick={this.removeNotification.bind(this, this.state.element)}>
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
}

export default AcceptRoomItem;
