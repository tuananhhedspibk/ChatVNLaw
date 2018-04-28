import React, { Component}  from 'react';
import { EventEmitter } from 'fbemitter';
import ReactConfirmAlert from 'react-confirm-alert';

import RequestRoomItem from './notification_item/requestroom';
import AcceptRoomItem from './notification_item/acceptroom';
import RefuseRoomItem from './notification_item/refuseroom';
import Nav from '../homepage/nav';
import Footer from '../homepage/footer';
import Toast from './toast';
import Loading from '../shared/loading';

import { onAuthStateChanged } from '../../lib/user/authentication';
import { getAllNotification } from '../../lib/notification/notifications';
import { checkAuthen } from '../../lib/notification/toast';
import { getAllRooms } from '../../lib/room/rooms';

import * as constant from '../constants';
import * as translate from 'counterpart';
import * as tableConstant from '../../lib/constants';

import '../../assets/styles/common/notification.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Notifications extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
      isLoading: true,
      permission: false,
      showDialog: false,
      rooms: [],
      notifications: []
    }
    this.emitter = new EventEmitter();
  }

  componentWillMount(){
    var component= this;
    onAuthStateChanged(user =>{
      if(user){
        getAllRooms((success, response) => {
          if (success) {
            component.setState({rooms: response.data.rooms});
          }
          else {
            console.log(response);
          }
        })
        component.setState({currentUser: user, permission: true}, ()=>{
          component.setState({isLoading: false})
          var properties = {}
          properties['currentUser'] = component.state.currentUser;
          var notificationsArr = [];
          getAllNotification(properties, (event, data)=>{
            switch(event){
              case 'value':
                component.setState({notifications: notificationsArr});
                break;
              case 'child_added':
                notificationsArr.unshift(data);
                component.setState({notifications: notificationsArr});
                break;
              case 'child_removed':
                notificationsArr.every(function(element,index){           
                  if (element.id === data.id){
                    notificationsArr.splice(index,1);
                    component.setState({notifications: notificationsArr});
                    return false;
                  }
                  else{
                    return true;
                  }
                })
                break;
            }
          })
        })
      }
      else{
        checkAuthen(component.emitter,constant.HOME_URI, ()=>{

        })
      }
    })
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
          onCancel={this.onCancel.bind(this)}/>
      }
      </div>
    )
  }
 
  renderNotificationItem(element){
    switch(element.type){
      case tableConstant.NOTIFICATION_TYPE.requestRoom:
        return(
          <RequestRoomItem element={element}
            currentUser={this.state.currentUser}
            rooms={this.state.rooms}/>
        )
      case tableConstant.NOTIFICATION_TYPE.refuseRoomRequest:
        return(
          <RefuseRoomItem element={element}
            currentUser={this.state.currentUser}/>
        )
      case tableConstant.NOTIFICATION_TYPE.acceptRoomRequest:
        return(
          <AcceptRoomItem element={element} 
            currentUser={this.state.currentUser}/>
        )
    }
  }

  renderView(){
    if(this.state.notifications) {
      if(this.state.notifications.length > 0){
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
            <Footer/>
          </div>
        )
      }
      else {
        return (
          <div>
            <Nav navStyle='inverse'/>
            <div className='notifi-wrapper'>
              <div className='no-notifi-content'>
                <i className='fa fa-bell'></i>
                <div>{translate('app.notification.no_noti')}</div>
              </div>
            </div>
            <Footer/>
          </div>  
        )
      }
    }
  }

  render(){
    return (
      <div>
        <Toast emitter={this.emitter}/>
        {
          !this.state.isLoading && this.state.permission ? 
          this.renderView() : <Loading/>
        }
      </div>
    )
  }
}

export default Notifications;
