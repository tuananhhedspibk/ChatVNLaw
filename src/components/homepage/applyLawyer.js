import React, { Component } from 'react';
import $ from 'jquery';
import * as constant from '../constants';
import * as firebase from 'firebase';

import Nav from './nav';

class applyLawyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      roomId: ''
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
    // var uidCurrentUser = firebase.auth().currentUser.uid;
    // var uidLawyer = window.location.pathname.substring(13,window.location.pathname.length)
    // var reference = uidCurrentUser + uidLawyer
    // firebase.database().ref(`reference/${reference}`).once('value', data =>{
    //   if(data) {
    //     component.setState({
    //       roomId: data.val()
    //     })
    //   }
    // })
  }


  handleClick(){
    var uidLawyer = window.location.pathname.substring(13,window.location.pathname.length)
    var username;
    var component = this;
    var data = [];
    var fullname = $('.apply-lawyer-name').val();
    var address = $('.apply-lawyer-address').val()
    var phone = $('.apply-lawyer-phone').val();
    var info = $('.apply-lawyer-info').val();
    var age = $('.apply-lawyer-age').val();
    if(fullname === ''|| address === ''|| phone === '' || age === ''|| info === ''){
        alert("You must write full info");
    }
    else {
      var fullInfo = 'Tên : ' + fullname + '<br />' + 'Địa chỉ : ' + address + '<br />' + phone + '<br />' + info + '<br />' + age + '<br />'
      var roomId = component.state.roomId
      var ref = firebase.database().ref(`rooms/`+roomId['roomId'])
      ref.set({description: fullInfo});
      firebase.database().ref(`users/${uidLawyer}/username`).once('value', data => {
        if(data){
          username = data.val()
          // window.location = constant.BASE_URL + '/chat/'+username
        }
      })
      //   this.props.emitter.emit('sendDataApplyLawyer', data);
    }
    
  }

  renderView(){
      return (
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
      )
  }

  render() {
    return(
      <div className='main-content'>
            <Nav />
            {this.renderView()}
      </div>
    );
  }
}

export default applyLawyer;
