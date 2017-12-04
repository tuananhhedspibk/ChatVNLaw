import React, {Component} from 'react';
import * as firebase from 'firebase';
import { Header, TextArea, Button, Image,Modal, Dropdown } from 'semantic-ui-react';

let translate = require('counterpart');

class DetailInfoSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: '',
      type: '',
      modalOpen: false
    }
  }

  componentWillMount() {
    var component = this
    firebase.database().ref(`moneyAccount/${this.props.user.uid}`).once('value', data=> {
      if(data.exists()){
        component.setState({
          balance: data.val().amount,
          type: data.val().type
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
          <label for="input_payment"> Nhập số tiền cần nạp </label>
          <input type="number" className="form-control" id="input_payment"/> VNĐ
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
      <div className='detail-info-settings'>
        {this.renderViewPayment()}
        <p>Số dư tài khoản: {this.state.balance} {this.state.type}</p>
        <button type="button" class="btn btn-primary" onClick={this.showDialog.bind(this)}>
          {translate('app.payment.recharge')}
        </button>
      </div>
    )
  }
}

export default DetailInfoSettings;
