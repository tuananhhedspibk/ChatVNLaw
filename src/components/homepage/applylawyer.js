import React, { Component } from 'react';
import $ from 'jquery';
import Nav from './nav';
import NotFound from '../shared/notfound';
import Loading from '../shared/loading';
import { Header, TextArea, Button, Image,Modal, Dropdown } from 'semantic-ui-react';
import Payment from '../payments/payment'
import {createNewNotification,noticeWhenNewNotiComing} from '../../lib/notification/notifications';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ThankLayoutContent from '../shared/thanklayoutcontent';
import Toast from '../notification/toast';
import {EventEmitter} from 'fbemitter';

import * as constant from '../constants';
import * as firebase from 'firebase';
import * as Lawyers from '../../lib/user/lawyers'
import * as translate from 'counterpart';

import 'react-notifications/lib/notifications.css';

class applyLawyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentLawyer: null,
      isLoading: true,
      roomId: '',
      modalOpen: false,
      info: [],
      done: false,
      permission: false
    };
    this.emitter = new EventEmitter();
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
        component.setState({currentUser: user, permission: true})
      }else{
        component.emitter.emit('AddNewErrorToast', translate('app.system_notice.unauthenticated.title'),translate('app.system_notice.unauthenticated.text'),5000, ()=>{
          window.location = constant.HOME_URI;
        })
        setTimeout(()=>{
          window.location = constant.HOME_URI;
        },5000);
      }
    })
  }

  componentDidMount(){
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
    var component = this;
    var fullname = $('.apply-lawyer-name').val();
    var address = $('.apply-lawyer-address').val()
    var phone = $('.apply-lawyer-phone').val();
    var age = $('.apply-lawyer-age').val();
    var problem = $('textarea#problem').val();
    var fullInfo = [];
    if(fullname === ''|| address === ''|| phone === '' || age === '' || problem === ''){
      this.emitter.emit('AddNewWarningToast',translate('app.system_notice.warning.title'),translate('app.system_notice.warning.text.please_fill_the_form'), 5000, ()=>{} )
    }
    else {
      var info = fullname + '<br />' + address + '<br />' + phone + '<br />' + age + '<br />' + problem
      var properties = {}
      properties['targetUser'] = this.state.currentLawyer;
      properties['currentUser'] = this.state.currentUser;
      properties['type'] = 'requestRoom';
      properties['info'] = info;
      
      createNewNotification(properties, () =>{

      })
      this.setState({done: true},()=>{
        component.emitter.emit('AddNewSuccessToast', '',translate('app.system_notice.success.text.submit_form_to_request_room'), 5000, ()=>{
          window.location = constant.HOME_URI;
        })
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
                <label for="usr">Quê quán</label>
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
                <textarea class="form-control apply-lawyer-problem" rows="5" id="problem"></textarea>
              </div>
              <footer className='apply-lawyer-footer'>
                  <button type="button" class="btn btn-info apply-lawyer-button" onClick={this.handleClick.bind(this)}>Yêu cầu luật sư</button>
              </footer>
          </div>
        </div>
      )
  }

  renderMain() {
    if(!this.state.isLoading && this.state.permission){
      if(!! this.state.currentLawyer){
        return(
          <div className='main-content'>
            <Nav navStyle='inverse'/>
            {this.state.done ? <ThankLayoutContent/> : this.renderView()}
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
  render(){
    return(
      <div>
        <Toast emitter={this.emitter}/>
        {this.renderMain()}
      </div>
    )
  }
}

export default applyLawyer;
