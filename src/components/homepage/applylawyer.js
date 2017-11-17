import React, { Component } from 'react';
import $ from 'jquery';
import Nav from './nav';
import NotFound from '../shared/notfound';
import Loading from '../shared/loading';

import * as constant from '../constants';
import * as firebase from 'firebase';
import * as Lawyers from '../../lib/user/lawyers'

class applyLawyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentLawyer: null,
      isLoading: true,
      roomId: ''
    }
  }

  componentWillMount(){
    var component = this
    var username = this.props.location.pathname.split('/applylawyer/')[1];
    Lawyers.findLawyersWithUserName(username, (data)=>{
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
      }else{
        this.setState({isLoading: false})
      }
    })
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        component.setState({currentUser: user})
      }else{
        window.location = constant.HOME_URI;
      }
    })
  }

  componentDidMount(){
  }

  handleClick(){
    // var uidLawyer = window.location.pathname.substring(13,window.location.pathname.length)
    // var username;
    // var component = this;
    // var data = [];
    // var fullname = $('.apply-lawyer-name').val();
    // var address = $('.apply-lawyer-address').val()
    // var phone = $('.apply-lawyer-phone').val();
    // var info = $('.apply-lawyer-info').val();
    // var age = $('.apply-lawyer-age').val();
    // if(fullname === ''|| address === ''|| phone === '' || age === ''|| info === ''){
    //     alert("You must write full info");
    // }
    // else {
    //   var fullInfo = 'Tên : ' + fullname + '<br />' + 'Địa chỉ : ' + address + '<br />' + phone + '<br />' + info + '<br />' + age + '<br />'
    //   var roomId = component.state.roomId
    //   var ref = firebase.database().ref(`rooms/`+roomId['roomId'])
    //   ref.set({description: fullInfo});
    //   firebase.database().ref(`users/${uidLawyer}/username`).once('value', data => {
    //     if(data){
    //       username = data.val()
    //       // window.location = constant.BASE_URL + '/chat/'+username
    //     }
    //   })
    //   //   this.props.emitter.emit('sendDataApplyLawyer', data);
    // }
    
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
              <input type="number" className="form-control apply-lawyer-phone" id="usr" placeholder='19008198' />
            </div>
            <div className="form-group apply-lawyer-contasearchct">
              <label for="usr">Tuổi</label>
              <input type="number" className="form-control apply-lawyer-age" id="usr" placeholder='19' />
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
    if(!this.state.isLoading){
      if(!! this.state.currentLawyer){
        return(
          <div className='main-content'>
                <Nav navStyle='inverse'/>
                {this.renderView()}
          </div>
        );
      }else{
        return(
          <NotFound />
        )
      }
    }else{
      return(
        <Loading />
      )
    } 
    
    
  }
}

export default applyLawyer;
