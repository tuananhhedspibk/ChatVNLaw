import React, { Component } from 'react';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import { onAuthStateChanged } from '../../lib/user/authentication';
import { extractNotification, noticeWhenNewNotiComing } from '../../lib/notification/notifications';
import WebNotification from './webnotification';

import * as tableConstant from '../../lib/constants';

import 'react-notifications/lib/notifications.css';

class Toast extends Component{
  constructor(props) {
    super(props);
    this.state = {
      timeStamp : '' + (new Date()).getTime(),
      currentUser: null,
    };
  }
  
  componentWillMount(){
    var component = this;   
    onAuthStateChanged( user =>{
      this.setState({currentUser: user}, ()=>{
        if(this.state.currentUser){
          var properties = {}
          properties['currentUser'] = this.state.currentUser;
          properties['timeStamp'] = this.state.timeStamp || '' + (new Date()).getTime();
          noticeWhenNewNotiComing(properties, (data) =>{
            extractNotification(data,(type,item) =>{
              switch(type){
                case tableConstant.NOTIFICATION_TYPE.requestRoom:
                  component.props.emitter.emit('AddNewInfoToast', item.title, item.content, 5000, () => {
                    if (!(window.location.pathname).startsWith('/notifications')) {
                      window.open('/notifications', "_blank")
                    }} );
                  break;
                case tableConstant.NOTIFICATION_TYPE.acceptRoomRequest:
                  component.props.emitter.emit('AddNewSuccessToast', item.title, item.content, 5000, () => {
                    if (!(window.location.pathname).startsWith('/notifications')) {
                      window.open('/notifications', "_blank")
                    }
                  });
                  break;
                case tableConstant.NOTIFICATION_TYPE.refuseRoomRequest:
                  component.props.emitter.emit('AddNewWarningToast', item.title, item.content, 5000, () => {
                    if (!(window.location.pathname).startsWith('/notifications')) {
                      window.open('/notifications', "_blank")
                    }
                  });
                  break;
                default:
                  break;
              }      
            })
          })
        }  
      })
    })
    if(!!this.props.emitter){
      this.onCreateNewInfoToastRequest();
      this.onCreateNewSuccessToastRequest();
      this.onCreateNewWarningToastRequest();
      this.onCreateNewErrorToastRequest();
    }
  }

  onCreateNewInfoToastRequest(){
    var component = this;
    this.props.emitter.addListener('AddNewInfoToast', function(title,text,duration,callback){
      component.createNotification('info', title,text,duration,callback);
    })
  }
  onCreateNewSuccessToastRequest(){
    var component = this;
    this.props.emitter.addListener('AddNewSuccessToast', function(title,text,duration,callback){
      component.createNotification('success', title,text,duration,callback);
    })
  }
  onCreateNewWarningToastRequest(){
    var component = this;
    this.props.emitter.addListener('AddNewWarningToast', function(title,text,duration,callback){
      component.createNotification('warning', title,text,duration,callback);
    })
  }
  onCreateNewErrorToastRequest(){
    var component = this;
    this.props.emitter.addListener('AddNewErrorToast', function(title,text,duration,callback){
      component.createNotification('error', title,text,duration,callback);
    })
  }
  createNotification(type,title, text, duration, callback){
    if(localStorage.getItem('isFocused') === 'true'){
      switch (type) {
        case 'info':
          NotificationManager.info(text, title, duration, callback);
          break;
        case 'success':
          NotificationManager.success(text, title, duration, callback);
          break;
        case 'warning':
          NotificationManager.warning(text, title, duration, callback);
          break;
        case 'error':
          NotificationManager.error(text, title, duration, callback);
          break;
        default:
          break;
      }
    }  
  };

  render(){
    return(
      <div className='toast'>
        <WebNotification emitter={this.props.emitter}/>
        <NotificationContainer/>    
      </div>
    )
  }
} 

export default Toast;
