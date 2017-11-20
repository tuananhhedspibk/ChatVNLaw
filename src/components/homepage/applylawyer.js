import React, { Component } from 'react';
import $ from 'jquery';
import { Header, TextArea, Button, Image,
  Modal, Dropdown } from 'semantic-ui-react';
import Payment from '../payments/payment'

import Nav from './nav';
import NotFound from '../shared/notfound';
import Loading from '../shared/loading';

import * as constant from '../constants';
import * as firebase from 'firebase';
import * as Lawyers from '../../lib/user/lawyers'

let translate = require('counterpart');

class ApplyLawyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentLawyer: null,
      isLoading: true,
      roomId: '',
      modalOpen: false,
      info: []
    }
  }

  componentWillMount(){
    var component = this
    var username = this.props.location.pathname.split('/applylawyer/')[1];
    Lawyers.findLawyersWithUserName(username, (data) => {
      if(data.exists()){
        for( var i in data.val()){
          var item = {
            username: data.val()[i].username,
            displayName: data.val()[i].displayName,
            uid : i,
            photoURL: data.val()[i].photoURL
          }
        }
        this.setState({isLoading: false,currentLawyer: item})
      }
      else{
        this.setState({isLoading: false})
      }
    });
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        component.setState({currentUser: user})
      }
      else{
        window.location = constant.HOME_URI;
      }
    });
  }

  componentDidMount(){
  }

  handleOpenModal(){
    this.setState({
      modalOpen: true
    });
  }

  handleCloseModal(){
    this.setState({modalOpen: false})
  }

  connectLawyer(){
    console.log('done')
  }

  renderPaymentInfo(){
    return(
      <Modal 
        onClose={this.handleCloseModal.bind(this)}
        open={this.state.modalOpen}
        id='edit-user-profile-box' closeIcon={true}>
        <Modal.Header>
          {translate('app.payment.title')}
        </Modal.Header>
        <Modal.Content>
          <Payment fullInfo={this.state.info}/>
        </Modal.Content>
      </Modal>
    )
  }

  handleClick(){
    var uidLawyer = window.location
      .pathname.substring(13,window.location.pathname.length)
    var reference = this.state.currentUser.uid + uidLawyer;
    var username;
    var component = this;
    var data = [];
    var fullname = $('.apply-lawyer-name').val();
    var address = $('.apply-lawyer-address').val()
    var phone = $('.apply-lawyer-phone').val();
    var age = $('.apply-lawyer-age').val();
    var problem = $('textarea#problem').val();
    var fullInfo = [];

    if(fullname === ''|| address === ''|| phone === ''
      || age === '' || problem === ''){
        alert('Bạn cần điền đẩy đủ thông tin');
    }
    else {
      var info = 'Tên : ' + fullname + '<br />' + 'Địa chỉ : ' +
        address + '<br />' + phone + '<br />' +
        age + '<br />' + problem;
      fullInfo.push({
        info: info,
        uidLawyer: uidLawyer,
        reference: reference
      });
      this.setState({
        info: fullInfo
      });
    }
  }

  renderView(){
    return (
      <div>
        <div>
          {this.renderPaymentInfo()}
        </div>
        <div className='apply-lawyer-container'>
          <header className='apply-lawyer-header'>
            <h1>{translate('app.payment.table_input_info')}</h1>
          </header>
          <div className='form-group apply-lawyer-contact'>
            <label for='usr'>
              {translate('app.payment.full_name')}
            </label>
            <input className='form-control apply-lawyer-name'
              id='usr' type='text'
              placeholder={translate('app.payment.placeholder_name')} />
          </div>
          <div className='form-group apply-lawyer-contact'>
            <label for='usr'>{translate('app.payment.country')}</label>
            <input type='text' id='usr'
              className='form-control apply-lawyer-address'
              placeholder={translate('app.payment.placeholder_country')} />
          </div>
          <div className='form-group apply-lawyer-contact'>
            <label for='usr'>
              {translate('app.payment.phone_number')}
            </label>
            <input type='number' id='usr'
              className='form-control apply-lawyer-phone'
              placeholder={translate('app.payment.placeholder_phone')} />
          </div>
          <div className='form-group apply-lawyer-contasearchct'>
            <label for='usr'>{translate('app.payment.age')}</label>
            <input type='number' id='usr'
              className='form-control apply-lawyer-age'
              placeholder={translate('app.payment.placeholder_age')} />
          </div>
          <div class='form-group'>
            <label for='comment'>{translate('app.payment.problem')}</label>
            <textarea
              class='form-control apply-lawyer-problem'
              rows='5' id='problem'>
            </textarea>
          </div>
          <div className='apply-lawyer-footer'>
            <button type='button'
              class='btn btn-info apply-lawyer-button'
              onClick={this.handleClick.bind(this)}>
                {translate('app.payment.apply_lawyer')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    if(!this.state.isLoading){
      if(!! this.state.currentLawyer){
        return(
          <div>
            <Nav navStyle='inverse'/>
            {this.renderView()}
          </div>
        )
      }
      else{
        return(
          <NotFound />
        )
      }
    }
    else{
      return(
        <Loading />
      )
    }
  }
}

export default ApplyLawyer;
