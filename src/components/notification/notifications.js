import React,{Component} from 'react';
import Nav from '../homepage/nav';
import Toast from './toast';
import Loading from '../shared/loading';

import {EventEmitter} from 'fbemitter';
import {onAuthStateChanged} from '../../lib/user/authentication';
import {extractNotificationInfo,getAllNotification} 
  from '../../lib/notification/notifications';

import * as constant from '../constants';
import * as translate from 'counterpart';

import '../../assets/styles/common/notification.css';

class Notifications extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
      isLoading: true,
      permission: false,
      notifications : []
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
      case 'requestRoom':
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

  onCreateRoom(event){
    event.preventDefault();
    console.log('e');
  }

  renderRequestRoomNotificationItem(element){
    return(
      <div className='notifi-content'>
          <div className='notification-item green'>
            <div className='info'>
              <h1>{element.sender.displayName +
                ' gửi cho bạn yêu cầu tạo cuộc trò chuyện '}</h1>
              <div className='info-detail'>
                <p className='title'>
                  {translate('app.notification.detail')}
                </p>
                <div>
                  {this.extractNotificationInfo(element)}
                </div>
              </div>
              <a href='#' className='button blue'
                onClick={this.onCreateRoom.bind(this)}>
                  {translate('app.notification.create_dialog')}
              </a>
            </div>
            <div className='icon green'>
              <i className='fa fa-asterisk'></i>
            </div>
          </div>
      </div>
    )
  }

  renderNotificationItem(element){
    switch(element.type){
      case 'requestRoom':
        return(
          this.renderRequestRoomNotificationItem(element)
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