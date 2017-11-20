import React, {Component} from 'react';

import Nav from '../../homepage/nav';
import Footer from '../../homepage/footer';
import BasicInfoSettings from './basicinfosettings';
import DetailInfoSettings from './detailinfosettings';
import SideBar from './sidebar';

import * as constant from '../../constants';
import * as firebase from 'firebase';

import '../../../assets/styles/common/profileSettings.css';

let translate = require('counterpart');

class SettingsCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  
  componentWillMount() {
    var component = this;
    if(!firebase.apps.length){
      firebase.initializeApp(constant.APP_CONFIG);
    }
    firebase.auth().onAuthStateChanged(function(user){
      component.setState({user: user}); 
    })
  }

  handleUpdate() {
  }
  
  render() {
    if(this.state.user) {
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
    else {
      return(
        <div>
        </div>
      )
    }
  }
}

export default SettingsCustomer;
