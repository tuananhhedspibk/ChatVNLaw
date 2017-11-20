import React, {Component} from 'react';
import $ from 'jquery';

import * as firebase from 'firebase';

let translate = require('counterpart');

class BasicInfoSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: null
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
      })
    })
  }

  componentWillMount() {
    this.setState({displayName: this.props.user.displayName});
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
                type='text' value={this.state.displayName}/>
              <i className='users icon'></i>
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
