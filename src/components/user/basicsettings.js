import React, {Component} from 'react';
import $ from 'jquery';
import * as Datetime from 'react-datetime';
import { Dropdown } from 'semantic-ui-react';

import * as translate from 'counterpart';
import * as constant from '../constants';

import * as Lawyer from '../../lib/user/lawyers';
import * as User from '../../lib/user/users';

class BasicSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      cardNumber: '',
      certificate: '',
      price: '',
      exp: '',
      userName: '',
      birthday: '',
      specializes: null
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
      
    })
  }

  componentWillMount() {
    var birthday = '';
    if (!!this.props.user.birthday) {
      birthday = new Date(this.props.user.birthday).toLocaleDateString('vn-VN');
    }
    this.setState({
      displayName: this.props.user.displayName,
      birthday: birthday,
      avatar: this.props.user.avatar,
      userName: JSON.parse(localStorage.chat_vnlaw_user)['userName']
    });
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
    if(this.props.role == 'Lawyer') {
      var properties = {
        cardNumber: this.state.cardNumber,
        exp: this.state.exp,
        price: this.state.price,
        certificate: this.state.certificate
      }
      Lawyer.updateLawyerBasicInfoRails(this.state.userName, properties,
        (success, response) => {
          if (success) {
            component.props.emitter.emit('AddNewSuccessToast', '',
              translate('app.system_notice.success.text.success_update_profile'),
              5000, ()=>{})
          }
          else {
            component.props.emitter.emit('AddNewErrorToast', '',
              translate('app.system_notice.error.text.some_thing_not_work'),
              5000, ()=>{})
          }
        })
    }
    else {

    }
  }

  renderUserSettings() {
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
              src={constant.API_BASE_URL + this.props.user.avatar.url}
              alt='upfile'/>
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
              <input name='displayName'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.settings.user_name')}
                type='text' value={this.state.displayName}/>
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
        <button onClick={this.editProfile.bind(this)}
          className='save-btn'>
          <i className='fa fa-floppy-o' aria-hidden='true'></i>
          {translate('app.settings.save')}
        </button>
      </div>
    )
  }

  renderLawyerSettings() {
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
              src={constant.API_BASE_URL + this.props.user.avatar}/>
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
                type='text' value={this.state.cardNumber}/>
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
            <Dropdown placeholder={translate('app.settings.category_ph')}
              fluid search multiple selection
              options={constant.LAW_CATEGORY}
              defaultValue={this.state.category}
              onChange={this.modifyCategory.bind(this)}/>
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
                type='text' value={this.state.exp}/>
              <i className='travel icon'></i>
            </div>
          </div>
        </div>
        <div className='info-block'>
          <div className='price'>
            <div className='title'>
              {translate('app.settings.price')}
            </div>
            <div className='ui left icon input'>
              <input name='expyear'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.settings.price')}
                type='text' value={this.state.price}/>
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

  render() {
    if(this.props.role == 'Lawyer') {
      return(
        this.renderLawyerSettings()
      )
    }
    else {
      return(
        this.renderUserSettings()
      )
    }
  }
}

export default BasicSettings;
