import React, { Component } from 'react';
import $ from 'jquery';
import * as constant from '../constants';
import * as firebase from 'firebase';
import { Header, TextArea, Button, Image,
  Modal, Dropdown } from 'semantic-ui-react';
import Payment from '../payments/payMent'

import Nav from './nav';
import Footer from './footer';
const translate = require('counterpart');

class applyLawyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      roomId: '',
      modalOpen: false,
      info: []
    }
  }

  componentWillMount(){
    var component = this
    var uidLawyer = window.location.pathname.substring(13,window.location.pathname.length)
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        component.setState({currentUser: user});
        var reference = component.state.currentUser.uid + uidLawyer
        firebase.database().ref(`reference/${reference}`).once('value', data =>{
          if(data) {
            component.setState({
              roomId: data.val()
            })
          }
        })
      }
    })
  }

  handleOpenModal(){
    this.setState({
      modalOpen: true
    })
  }

  handleCloseModal(){
    this.setState({modalOpen: false})
  }

  connectLawyer(){
    console.log('done')
  }

  renderPaymentInfo(){
    console.log(this.state.info)
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
    var uidLawyer = window.location.pathname.substring(13,window.location.pathname.length)
    var reference = this.state.currentUser.uid + uidLawyer;
    var username;
    var component = this;
    var data = [];
    var fullname = $('.apply-lawyer-name').val();
    var address = $('.apply-lawyer-address').val()
    var phone = $('.apply-lawyer-phone').val();
    var age = $('.apply-lawyer-age').val();
    var fullInfo = [];
    if(fullname === ''|| address === ''|| phone === '' || age === ''){
        alert("Bạn cần điền đẩy đủ thông tin");
    }
    else {
      var info = 'Tên : ' + fullname + '<br />' + 'Địa chỉ : ' + address + '<br />' + phone + '<br />' + age + '<br />'
      fullInfo.push({
        info: info,
        uidLawyer: uidLawyer,
        reference: reference
      })
      this.setState({
        info: fullInfo,
        modalOpen: true
      })
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
                  <h1>Bảng nhập thông tin</h1>
              </header>
              <div className="form-group apply-lawyer-contact">
                <label for="usr">Tên đầy đủ</label>
                <input type="text" className="form-control apply-lawyer-name" id="usr" placeholder='Nguyễn Tiến Trường' />
              </div>
              <div className="form-group apply-lawyer-contact">
                <label for="usr">Quên quán</label>
                <input type="text" className="form-control apply-lawyer-address" id="usr" placeholder='Hà Nội' />
              </div>
              <div className="form-group apply-lawyer-contact">
                <label for="usr">Số điện thoại</label>
                <input type="text" className="form-control apply-lawyer-phone" id="usr" placeholder='19008198' />
              </div>
              <div className="form-group apply-lawyer-contasearchct">
                <label for="usr">Tuổi</label>
                <input type="text" className="form-control apply-lawyer-age" id="usr" placeholder='19' />
              </div>
              <div class="form-group">
                <label for="comment">Vấn đề gặp phải</label>
                <textarea class="form-control" rows="5" id="comment"></textarea>
              </div>
              <footer className='apply-lawyer-footer'>
                  <button type="button" class="btn btn-info apply-lawyer-button" onClick={this.handleClick.bind(this)}>Yêu cầu luật sư</button>
              </footer>
          </div>
        </div>
      )
  }

  render() {
    return(
      <div className='main-content'>
            <Nav navStyle='inverse'/>
            {this.renderView()}
            <Footer />
      </div>
    );
  }
}

export default applyLawyer;
