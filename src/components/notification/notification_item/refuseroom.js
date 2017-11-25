import React from 'react';
import BaseItem from './baseitem';
import {deleteNotification} from '../../../lib/notification/notifications';

import * as translate from 'counterpart';

class RefuseRoomItem extends BaseItem{

  removeNotification(element){
    var properties = {}
    properties.currentUser = this.state.currentUser;
    properties.targetUser = {}
    properties.targetUser.uid = element.sender.uid;

    properties.nid = element.id;
    deleteNotification(properties);
  }

  render(){
    return(
      <div className="notifi-content">
        <div className="notification-item green">
          <div className="info">
          <h1>{this.state.element.sender.displayName+translate('app.notification.new_refuse_room_request_title')}</h1>      
          <div className='info-detail'>

            <button className='button blue' display='inline-block' onClick={this.removeNotification.bind(this,this.state.element)}>
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
}

export default RefuseRoomItem;