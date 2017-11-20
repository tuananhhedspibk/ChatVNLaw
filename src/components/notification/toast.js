import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {onAuthStateChanged} from '../../lib/user/authentication';
import {extractNotification,noticeWhenNewNotiComing} from '../../lib/notification/notifications';

class Toast extends Component{
  constructor(props) {
    super(props);
    this.state = {
      timeStamp : '' + (new Date()).getTime(),
      currentUser: null
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
            extractNotification(data,(item) =>{
              component.createNotification('info' , item.title, item.content);            
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
    switch (type) {
      case 'info':
        NotificationManager.info(text,title,duration,callback);
        break;
      case 'success':
        NotificationManager.success(text,title,duration,callback);
        break;
      case 'warning':
        NotificationManager.warning(text,title,duration,callback);
        break;
      case 'error':
        NotificationManager.error(text,title,duration,callback);
        break;
    }
  };

  render(){
    return(
      <div className='toast'>
        <NotificationContainer/>    
      </div>
    )
  }
} 

export default Toast; 