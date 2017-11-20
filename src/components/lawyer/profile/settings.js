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

class SettingsLawyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      user: null,
      uid: null
    }
  }

  getUserProfile(key) {
		var component = this;
		firebase.database().ref(`lawyers/${key}`).once('value',
			function(snapshot) {
	    	component.setState({profile : snapshot.val()});
	    })
	}
		
	checkUserName(username){
		var component = this;
		firebase.database().ref('users').orderByChild('username') 
			.equalTo(username).once('value')
	    .then(function(snapshot){
	      if(!snapshot.exists()){
	        window.location = constant.BASE_URL;
	      }
	      else {
					firebase.database().ref('users').orderByChild('username')
					.equalTo(username).once('child_added')
	    		.then(function(snapshotUser) {
	    			if(snapshotUser.val().role != 'lawyer'){
              window.location = constant.BASE_URL;
            }
	        	else {
	        		component.setState({user: snapshotUser.val()});
	        		component.getUserProfile(snapshotUser.key);
	        	}
	    		})
	      }
      })
  }
  
  componentWillMount() {
    if(!firebase.apps.length){
      firebase.initializeApp(constant.APP_CONFIG);
    }
	  this.checkUserName(this.props.match.params.user_name);
  }

  handleUpdate(table, name, newValue) {
    if(table=='users' &&  name=='displayName'){
      this.handleUpdate('lawyers','fullname',newValue);
    }
    var update = eval('('+`{${name}:'${newValue}'}`+')');
    firebase.database().ref(`${table}/${this.state.uid}`).update(update);
  }
  
  render() {
    if(this.state.profile) {
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
                          handleUpdate={this.handleUpdate.bind(this)}
                          profile={this.state.profile}/>
                      </div>
                      <div className='tab-pane' id='tab-detail'>
                        <DetailInfoSettings user={this.state.user}
                          handleUpdate={this.handleUpdate.bind(this)}
                          profile={this.state.profile}/>
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

export default SettingsLawyer;
