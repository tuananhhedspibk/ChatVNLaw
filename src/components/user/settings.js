import React, {Component} from 'react';

import Nav from '../homepage/nav';
import Footer from '../homepage/footer';
import BasicSettings from './basicsettings';
import DetailSettings from './detailsettings';
import SideBar from './sidebar';
import Loading from '../shared/loading';
import Toast from '../notification/toast';
import {EventEmitter} from 'fbemitter';

import * as constant from '../constants';
import * as firebase from 'firebase';

import * as Lawyer from '../../lib/user/lawyers';
import * as User from '../../lib/user/users';

import '../../assets/styles/common/profileSettings.css';

let translate = require('counterpart');

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isloading: true,
      role: ''
    }
    this.emitter = new EventEmitter();    
  }
  
  componentWillMount() {
    if(localStorage.chat_vnlaw_user) {
      var component = this;
      var role = JSON.parse(localStorage.chat_vnlaw_user)['role'];
      var userName = JSON.parse(localStorage.chat_vnlaw_user)['userName'];
      this.setState({role: role});
      if(role == 'Lawyer') {
        Lawyer.loadProfilePage(userName, (success, response) => {
          if (success) {
            var user = {
              id: response.data.lawyer_info.id,
              achievement: response.data.lawyer_info.lawyer_profile.achievement,
              cardNumber: response.data.lawyer_info.lawyer_profile.cardNumber,
              certificate: response.data.lawyer_info.lawyer_profile.certificate,
              education: response.data.lawyer_info.lawyer_profile.education,
              intro: response.data.lawyer_info.lawyer_profile.intro,
              price: response.data.lawyer_info.lawyer_profile.price,
              exp: response.data.lawyer_info.lawyer_profile.exp,
              workPlace: response.data.lawyer_info.lawyer_profile.workPlace,
              displayName: response.data.lawyer_info.base_profile.displayName,
              birthday: response.data.lawyer_info.base_profile.birthday,
              avatar: response.data.lawyer_info.base_profile.avatar,
              specializes: response.data.lawyer_info.specializes,
              lawyer_specializes: response.data.lawyer_info.lawyer_specializes
            }
            component.setState({
              user: user,
              isloading: false
            });
          }
          else {
            component.errorAndRedirect(response);
          }
        })
      }
      else{
        User.loadProfilePage(userName, (success, response) => {
          if (success) {
            var user = {
              displayName: response.data.user_info.profile.displayName,
              avatar: response.data.user_info.profile.avatar,
              birthday: response.data.user_info.profile.birthday,
              mn_acc: response.data.user_info.mn_acc
            }
            component.setState({
              user: user,
              isloading: false
            });
          }
          else {
            component.errorAndRedirect(response);
          }
        })
      }
    }
    else {
      this.errorAndRedirect(translate('app.system_notice.unauthenticated.text'));
    }
  }

  errorAndRedirect(message) {
    this.setState({isloading :true});    
    this.emitter.emit('AddNewErrorToast',
      translate('app.system_notice.unauthenticated.title'),
      message, 5000, ()=>{
        window.location = constant.SIGN_IN_URI;
    })
    setTimeout(()=>{
      window.location = constant.SIGN_IN_URI;
    }, 5000);
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
                      <BasicSettings user={this.state.user}
                        role={this.state.role}
                        emitter={this.emitter}/>
                    </div>
                    <div className='tab-pane' id='tab-detail'>
                      <DetailSettings user={this.state.user}
                        role={this.state.role}
                        emitter={this.emitter}/>
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

export default Settings;
