import React, {Component} from 'react';
import $ from 'jquery';
import {storeLawyerData} from '../../../lib/user/lawyers';
import {updatePhotoURL} from '../../../lib/user/getuserinfo';

import firebase from 'firebase';
import 'react-datetime/css/react-datetime.css';

let Datetime = require('react-datetime');

let translate = require('counterpart');

class BasicInfoSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: null,
      fullname: null,
      cardnumber: null,
      certificate: null,
      category: null,
      expyear: null
    }
  }

  upfile(event) {
    var component = this;
    event.preventDefault();
    $('#upfile-setting').trigger('click');
    var fileButton = document.getElementById('upfile-setting');
    fileButton.addEventListener('change', function(e){
      e.preventDefault();
      let file = e.target.files[0];
      var storeageRef = firebase.storage().ref(`avatar/${component.props.user.uid}`);
      var task = storeageRef.put(file);
      task.on('state_changed', 
      function(snapshot){
      },
      function(err){
        console.log(err);
      },
      function(){
        $('.avatar').find('img').attr('src', task.snapshot.downloadURL);
        updatePhotoURL(task.snapshot.downloadURL);
      })
    })
  }

  componentWillMount() {
    this.setState({birthday: this.props.profile.birthday});
    this.setState({fullname: this.props.profile.fullname});
    this.setState({cardnumber: this.props.profile.cardNumber});
    this.setState({certificate: this.props.profile.certificate});
    this.setState({category: this.props.profile.category});
    this.setState({expyear: this.props.profile.exp});
  }

  handleDateChange(date) {
    this.setState({birthday: date.format('DD/MM/YYYY')});
  }

  handleInputChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  editProfile() {
    var component = this;
    var properties = {}
    properties.curentUser = this.props.user;
    properties.fullname = this.state.fullname;
    properties.birthday = this.state.birthday;
    properties.cardNumber = this.state.cardnumber
    properties.certificate = this.state.certificate
    properties.category = this.state.category
    properties.exp = this.state.expyear
    storeLawyerData(properties, (issuccess) =>{
      if(issuccess){
        component.props.emitter.emit('AddNewSuccessToast', '',translate('app.system_notice.success.text.success_update_profile'),5000, ()=>{})
      }else{
        component.props.emitter.emit('AddNewErrorToast', '',translate('app.system_notice.error.text.some_thing_not_work'),5000, ()=>{})        
      }
    })
  }

  render() {
    return(
      <div className='basic-info-settings'>
        <div className='info-block'>
          <div className='avatar'>
            <div className='title'>
              {translate('app.settings.avatar')}
            </div>
            <input type='file' id='upfile-setting'
              accept='image/*'/>
            <img onClick={this.upfile.bind(this)}
              src={this.props.user.photoURL}/>
            <div className='change-ava-guide'>
              {translate('app.settings.change_ava_guide')}
            </div>
          </div>
        </div>
        <div className='info-block'>
          <div className='name'>
            <div className='title'>
              {translate('app.settings.name')}
            </div>
            <div className='ui left icon input'>
              <input name='fullname'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.settings.user_name')}
                type='text' value={this.state.fullname}/>
              <i className='users icon'></i>
            </div>
          </div>
        </div>
        <div className='info-block'>
          <div className='birthday'>
            <div className='title'>
              {translate('app.settings.birthday')}
            </div>
            <Datetime
              value={this.state.birthday}
              timeFormat={false}
              onChange={this.handleDateChange.bind(this)}/>
          </div>
        </div>
        <div className='info-block'>
          <div className='cardNumber'>
            <div className='title'>
              {translate('app.settings.card_number')}
            </div>
            <div className='ui left icon input'>
              <input name='cardnumber'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.settings.card_number')}
                type='text' value={this.state.cardnumber}/>
              <i className='address card icon'></i>
            </div>
          </div>
        </div>
        <div className='info-block'>
          <div className='certificate'>
            <div className='title'>
              {translate('app.settings.certificate')}
            </div>
            <div className='ui left icon input'>
              <input name='certificate'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.settings.certificate')}
                type='text' value={this.state.certificate}/>
              <i className='address card outline icon'></i>
            </div>
          </div>
        </div>
        <div className='info-block'>
          <div className='category'>
            <div className='title'>
              {translate('app.settings.category')}
            </div>
            <div className='ui left icon input'>
              <input name='category'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.settings.category')}
                type='text' value={this.state.category}/>
              <i className='browser icon'></i>
            </div>
          </div>
        </div>
        <div className='info-block'>
          <div className='experience'>
            <div className='title'>
              {translate('app.settings.experience')}
            </div>
            <div className='ui left icon input'>
              <input name='expyear'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.settings.experience')}
                type='text' value={this.state.expyear}/>
              <i className='travel icon'></i>
            </div>
          </div>
        </div>
        <button onClick={this.editProfile.bind(this)}
          className='save-btn'>
          <i className='fa fa-floppy-o' aria-hidden='true'></i>
          {translate('app.settings.save')}
        </button>
      </div>
    )
  }
}

export default BasicInfoSettings;
