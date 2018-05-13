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
      id: '',
      displayName: '',
      cardNumber: '',
      certificate: '',
      price: '',
      exp: '',
      userName: '',
      birthday: '',
      avatar: '',
      avatarFileName: '',
      specializes: [],
      specializes_id: [],
      all_spe: []
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
      let fileName = file.name;
      var reader = new FileReader();

      reader.onload = function(e) {
        $('.avatar').find('img').attr('src', e.target.result);
        component.setState({
          avatar: file,
          avatarFileName: fileName
        });
      }
      reader.readAsDataURL(file);
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
    if(this.props.role === 'Lawyer') {
      this.setState({
        exp: this.props.user.exp,
        cardNumber: this.props.user.cardNumber,
        certificate: this.props.user.certificate,
        price: this.props.user.price,
        id: this.props.user.id,
        all_spe: constant.LAW_CATEGORY.map(obj => obj.value),
      });
      this.makeSpecializes(this.props.user.specializes, this.props.user.lawyer_specializes);
    }
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

  makeBaseProfileProperties() {
    var properties_keys = [];
    var properties_values = [];
    if(this.state.displayName !== this.props.user.displayName) {
      properties_keys.push('displayName');
      properties_values.push(this.state.displayName);
    }
    if(this.state.birthday !== this.props.user.birthday) {
      properties_keys.push('birthday');
      properties_values.push(this.state.birthday);
    }
    if(this.state.avatar !== this.props.user.avatar) {
      properties_keys.push('avatar');
      properties_values.push({
        file: this.state.avatar,
        fileName: this.state.avatarFileName
      })
    }
    var properties = {
      keys: properties_keys,
      values: properties_values
    }
    return properties;
  }

  makeLawyerProfileProperties() {
    var properties_keys = [];
    var properties_values = [];
    if(this.state.certificate !== this.props.user.certificate) {
      properties_keys.push('certificate');
      properties_values.push(this.state.certificate);
    }
    if(this.state.exp !== this.props.user.exp) {
      properties_keys.push('exp');
      properties_values.push(this.state.exp);
    }
    if(this.state.cardNumber !== this.props.user.cardNumber) {
      properties_keys.push('cardNumber');
      properties_values.push(this.state.cardNumber);
    }
    if(this.state.price !== this.props.user.price) {
      properties_keys.push('price');
      properties_values.push(this.state.price);
    }
    var properties = {
      keys: properties_keys,
      values: properties_values
    }
    return properties;
  }

  editProfile() {
    var component = this;
    var base_profile_pro = this.makeBaseProfileProperties();
    if(this.props.role === 'Lawyer') {
      var lawyer_profile_pro = this.makeLawyerProfileProperties();
      if(lawyer_profile_pro.keys.length > 0) {
        Lawyer.updateLawyerInfoRails(this.state.userName, lawyer_profile_pro,
          (success, response) => {
            if (success) {
              if(base_profile_pro.keys.length > 0) {
                User.updateUserInfoRails(this.state.userName, base_profile_pro,
                  (success, response) => {
                    if (success) {
                      component.props.emitter.emit('AddNewSuccessToast', '',
                      translate('app.system_notice.success.text.success_update_profile'),
                      5000, ()=>{});
                    }
                    else {
                      component.props.emitter.emit('AddNewErrorToast', '',
                      translate('app.system_notice.error.text.some_thing_not_work'),
                      5000, ()=>{});
                    }
                  })
              }
              else {
                component.props.emitter.emit('AddNewSuccessToast', '',
                translate('app.system_notice.success.text.success_update_profile'),
                5000, ()=>{});
              }
            }
            else {
              component.props.emitter.emit('AddNewErrorToast', '',
              translate('app.system_notice.error.text.some_thing_not_work'),
              5000, ()=>{});
            }
          })
      }
      else {
        if(base_profile_pro.keys.length > 0) {
          User.updateUserInfoRails(this.state.userName, base_profile_pro,
            (success, response) => {
              if (success) {
                component.props.emitter.emit('AddNewSuccessToast', '',
                translate('app.system_notice.success.text.success_update_profile'),
                5000, ()=>{});
              }
              else {
                component.props.emitter.emit('AddNewErrorToast', '',
                translate('app.system_notice.error.text.some_thing_not_work'),
                5000, ()=>{});
              }
            })
        }
      }
    }
    else {
      if(base_profile_pro.keys.length > 0) {
        User.updateUserInfoRails(this.state.userName, base_profile_pro,
          (success, response) => {
            if (success) {
              component.props.emitter.emit('AddNewSuccessToast', '',
              translate('app.system_notice.success.text.success_update_profile'),
              5000, ()=>{});
            }
            else {
              component.props.emitter.emit('AddNewErrorToast', '',
              translate('app.system_notice.error.text.some_thing_not_work'),
              5000, ()=>{});
            }
          })
      }
    }
  }

  makeSpecializes(specializes, lawyer_specializes) {
    var temp_specializes = [];
    var temp_specializes_id = [];

    specializes.map((spe, idx) => {
      temp_specializes.push(spe.name);
    });
    lawyer_specializes.map((l_sp, idx) => {
      temp_specializes_id.push(l_sp.id);
    });

    this.setState({
      specializes: temp_specializes,
      specializes_id: temp_specializes_id
    });
  }
  
  onChange(event, data) {
    var new_value = data.value;
    var exc_element = '';
    var component = this;

    if (new_value.length > this.state.specializes.length) {
      exc_element = new_value.filter(item => {
        return this.state.specializes.indexOf(item) < 0;
      });
      var properties = {
        lawyer_id: this.state.id,
        specialization_id: this.state.all_spe.indexOf(exc_element[0]) + 1
      }
      Lawyer.createSpecialize(properties, (success, response) => {
        if (success) {
          var tmp_spe_id = component.state.specializes_id;
          tmp_spe_id.push(response.data.n_l_sp.id);
          component.setState({
            specializes: new_value,
            specialization_id: tmp_spe_id
          });
        }
        else {
          component.props.emitter.emit('AddNewErrorToast', '',
          translate('app.system_notice.error.text.some_thing_not_work'),
          5000, ()=>{});
        }
      })
    }
    else if(new_value.length < this.state.specializes.length) {
      exc_element = this.state.specializes.filter(item => {
        return new_value.indexOf(item) < 0;
      });
      var id = this.state.specializes_id[this.state.specializes.indexOf(exc_element[0])];
      var tmp_spe_id = this.state.specializes_id;
      tmp_spe_id.splice(this.state.specializes.indexOf(exc_element[0]), 1);
      Lawyer.destroySpecialize(id, (success, response) => {
        if(success) {
          component.setState({
            specializes: new_value,
            specialization_id: tmp_spe_id
          });
        }
        else {
          component.props.emitter.emit('AddNewErrorToast', '',
          translate('app.system_notice.error.text.some_thing_not_work'),
          5000, ()=>{});
        }
      })
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
            <img onClick={this.upfile.bind(this)} alt='ava'
              src={constant.API_BASE_URL + this.props.user.avatar.url}/>
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
        <div className='info-block'>
          <div className='cardNumber'>
            <div className='title'>
              {translate('app.settings.card_number')}
            </div>
            <div className='ui left icon input'>
              <input name='cardNumber'
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
              onChange={this.onChange.bind(this)}
              options={constant.LAW_CATEGORY}
              defaultValue={this.state.specializes}/>
          </div>
        </div>
        <div className='info-block'>
          <div className='experience'>
            <div className='title'>
              {translate('app.settings.experience')}
            </div>
            <div className='ui left icon input'>
              <input name='exp'
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
              <input name='price'
                onChange={this.handleInputChange.bind(this)}
                placeholder={translate('app.settings.price')}
                type='text' value={this.state.price}/>
              <i className='money icon'></i>
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
    if(this.props.role === 'Lawyer') {
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
