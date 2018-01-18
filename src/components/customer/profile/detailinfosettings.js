import React, {Component} from 'react';
import * as firebase from 'firebase';
import { Header, TextArea,
  Button, Image,Modal, Dropdown } from 'semantic-ui-react';
import * as $ from 'jquery';
import axios from 'axios';
import * as constant from '../../constants';
var dateFormat = require('dateformat');

let translate = require('counterpart');

class DetailInfoSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 10000,
      type: 'VND',
      modalOpen: false,
      history: []
    }
  }

  componentWillMount() {
    var history = []
    var component = this
    firebase.database()
      .ref(`moneyAccount/${this.props.user.uid}`)
      .once('value', data=> {
        if(data.exists()){
          component.setState({
            balance: data.val().amount,
            type: data.val().type
          })
        }
    })
    firebase.database().ref(`depositeHistory/${component.props.user.uid}`).once('value', data => {
      if(data.exists()){
        for(let i in data.val()){
          history.push(data.val()[i])
        }
        component.setState({
          history: history
        })
      }
    })
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

  paymentProcess(){
    var component = this;
    var instance = axios.create({
      baseURL: constant.API_BASE_URL
    });
    var amount = $('#input_payment').val()
    var param = {
      amount: amount,
      uid: component.props.user.uid
    }
    instance.get('/payments', { params: param 
    })
    .then(function (response) {
      console.log(response.data.url)
      component.handleCloseModal();
      window.location = response.data.url;      
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  renderViewHistoryPayment(){
    var component = this 
    if(component.state.history.length > 0 ){
      return (
        component.state.history.map((history, index) => {
          return (
            <tr>
              <td>{history.amount}</td>
              <td>{history.date}</td>
            </tr>
          )
        })
      )
    }
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

  render() {
    return(
      <div>
        <div className='detail-info-settings'>
          {this.renderViewPayment()}
          <div className='info-block'>
            <div className='title'>
              {translate('app.settings.acc_balance')}:
              <p className='money-value'>
                {this.state.balance} {this.state.type}
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
            Lịch sử thanh toán
          </div>
          <hr />
          <div className='content'>
            <table class="ui single line table">
              <thead>
                <tr>
                  <th>
                    Số tiền nạp
                  </th>
                  <th>
                    Thời gian
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
}

export default DetailInfoSettings;
