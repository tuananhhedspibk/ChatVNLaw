import React, {Component} from 'react';
import { Header, TextArea,
  Button, Image,Modal, Dropdown } from 'semantic-ui-react';

import * as constant from '../constants';
import * as translate from 'counterpart';

import * as Lawyer from '../../lib/user/lawyers';
import * as User from '../../lib/user/users';

class DetailSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: null,
      achievement: null,
      education: null,
      workPlace: null,
      balance: 0,
      history: []
    }
  }

  componentWillMount() {
    this.setState({userName: JSON.parse(localStorage.chat_vnlaw_user)['userName']});

    if(this.props.role == 'Lawyer'){
      this.setState({
        intro: this.props.user.intro,
        achievement: this.props.user.achievement,
        education: this.props.user.education,
        workPlace: this.props.user.workPlace
      });
    }
    else {

    }
  }

  handleInputChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleCloseModal(){
    this.setState({
      modalOpen: false
    })
  }

  showDialog() {
    this.setState({
      modalOpen: true
    })
  }

  makeLawyerProfileProperties() {
    var properties_keys = [];
    var properties_values = [];
    if(this.state.intro != this.props.user.intro) {
      properties_keys.push('intro');
      properties_values.push(this.state.intro);
    }
    if(this.state.achievement != this.props.user.achievement) {
      properties_keys.push('achievement');
      properties_values.push(this.state.achievement);
    }
    if(this.state.education != this.props.user.education) {
      properties_keys.push('education');
      properties_values.push(this.state.education);
    }
    if(this.state.workPlace != this.props.user.workPlace) {
      properties_keys.push('workPlace');
      properties_values.push(this.state.workPlace);
    }
    var properties = {
      keys: properties_keys,
      values: properties_values
    }
    return properties;
  }

  editProfile(){
    var component = this;
    if(this.props.role == 'Lawyer') {
      var lawyer_profile_pro = this.makeLawyerProfileProperties();
      console.log(lawyer_profile_pro);
      if(lawyer_profile_pro.keys.length > 0) {
        Lawyer.updateLawyerInfoRails(this.state.userName, lawyer_profile_pro,
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
    else {

    }
  }

  renderViewHistoryPayment(){
    var component = this 
    if(component.state.history.length > 0 ){
      return (
        component.state.history.map((history, index) => {
          return (
            <tr>
              <td>{history.amount.toLocaleString()} VNĐ</td>
              <td>{history.date}</td>
            </tr>
          )
        })
      )
    }
  }

  paymentProcess() {

  }

  renderViewPayment(){
    return(
      <Modal 
        onClose={this.handleCloseModal.bind(this)}
        open={this.state.modalOpen}
        id='edit-user-profile-box' closeIcon={true} 
        size='mini'>
          <Modal.Header>
            {translate('app.payment.title_recharge')}
          </Modal.Header>
          <Modal.Content>
            <label for='input_payment'>
              {translate('app.settings.input_money')}
            </label>
            <div className='input-group'>
              <input type='number' className='form-control'
                id='input_payment'/>
              <span className='input-group-addon'>
                {translate('app.settings.money_unit')}
              </span>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color='blue' onClick={this.paymentProcess.bind(this)}>
              {translate('app.payment.process')}
            </Button>
          </Modal.Actions>
      </Modal>
    )
  }

  renderUserSettings() {
    return(
      <div>
        <div className='detail-info-settings'>
          {this.renderViewPayment()}
          <div className='info-block'>
            <div className='title'>
              {translate('app.settings.acc_balance')}:
              <p className='money-value'>
                {this.state.balance.toLocaleString()} {translate('app.settings.money_unit')}
              </p>
            </div>
            <button className='save-btn'
              onClick={this.showDialog.bind(this)}>
                <i className='fa fa-credit-card' aria-hidden='true'></i>
                {translate('app.payment.recharge')}
            </button>
          </div>
        </div>
        <div className="info-block">
          <div className="title">
            {translate('app.settings.payment_his')}
          </div>
          <hr />
          <div className='content'>
            <table className="ui single line table">
              <thead>
                <tr>
                  <th>
                    {translate('app.settings.mn_ipt')}
                  </th>
                  <th>
                    {translate('app.settings.time')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.renderViewHistoryPayment()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  renderLawyerSettings() {
    return(
      <div className='detail-info-settings'>
        <div className='info-block'>
          <div className='intro ui form'>
            <div className='title'>
              {translate('app.settings.intro')}
            </div>
            <textarea name='intro' 
              onChange={this.handleInputChange.bind(this)}
              value={this.state.intro}/>
          </div>
        </div>
        <div className='info-block'>
          <div className='achievements ui form'>
            <div className='title'>
              {translate('app.settings.achievements')}
            </div>
            <textarea 
              name='achievement'
              onChange={this.handleInputChange.bind(this)}
              value={this.state.achievement}/>
          </div>
        </div>
        <div className='info-block'>
          <div className='education ui form'>
            <div className='title'>
              {translate('app.settings.education')}
            </div>
            <textarea 
              name='education'
              onChange={this.handleInputChange.bind(this)}
              value={this.state.education}/>
          </div>
        </div>
        <div className='info-block'>
          <div className='work-place ui form'>
            <div className='title'>
              {translate('app.settings.work_place')}
            </div>
            <textarea 
              name='workPlace'
              onChange={this.handleInputChange.bind(this)}
              value={this.state.workPlace}/>
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

export default DetailSettings;
