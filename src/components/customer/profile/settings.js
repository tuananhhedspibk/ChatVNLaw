import React, {Component} from 'react';

import Nav from '../../homepage/nav';
import Footer from '../../homepage/footer';
import BasicInfoSettings from './basicinfosettings';
import DetailInfoSettings from './detailinfosettings';
import SideBar from './sidebar';
import Loading from '../../shared/loading';
import Toast from '../../notification/toast';
import {EventEmitter} from 'fbemitter';
import {checkUserWithUserName} from '../../../lib/user/getuserinfo';

import * as constant from '../../constants';
import * as firebase from 'firebase';

import '../../../assets/styles/common/profileSettings.css';

let translate = require('counterpart');

class SettingsCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isloading: true
    }
    this.emitter = new EventEmitter();    
  }
  
  componentWillMount() {
    var component = this;
    var username = this.props.location.pathname.split('/settings/customers/')[1]
    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        checkUserWithUserName(username, data =>{
          if(data.exists()){
            for(var i in data.val()){
              if(data.val()[i].role === 'user'){
                component.setState({user: user, isloading:false});  
                return;                                             
              }
            }
          }
          component.setState({isloading :true})
          component.emitter.emit('AddNewErrorToast', translate('app.system_notice.permission_denied.title'),translate('app.system_notice.permission_denied.text'),5000, ()=>{
            window.location = constant.HOME_URI;
          })
          setTimeout(()=>{
            window.location = constant.HOME_URI;
          },5000);
          console.log(data.val());
        })
      }else{
        component.setState({isloading :true})        
        component.emitter.emit('AddNewErrorToast', translate('app.system_notice.unauthenticated.title'),translate('app.system_notice.unauthenticated.text'),5000, ()=>{
          window.location = constant.SIGN_IN_URI;
        })
        setTimeout(()=>{
          window.location = constant.SIGN_IN_URI;
        },5000);
      }
    })
  }

  handleUpdate() {
  }
  
  renderView() {
    return(
      <div>
        <Nav navStyle='inverse'/>
        <div className='container'>
          <div className='container-settings-wrapper'>
            <div className='row'>
              <div className='col-sm-0 col-md-4'>
                <SideBar/>
              </div>
              <div className='col-md-1'>
              </div>
              <div className='col-sm-12 col-md-6'>
                <div className='main-content'>
                  <div className='tab-content'>
                    <div className='tab-pane active' id='tab-basic'>
                      <BasicInfoSettings user={this.state.user}
                        handleUpdate={this.handleUpdate.bind(this)}/>
                    </div>
                    <div className='tab-pane' id='tab-detail'>
                      <DetailInfoSettings user={this.state.user}
                        handleUpdate={this.handleUpdate.bind(this)}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

  render(){
    return(
      <div>
        <Toast emitter={this.emitter}/>
        {this.state.isloading ? <Loading/> : <div>{this.renderView()}</div>}
      </div>
    )
  }
}

export default SettingsCustomer;
