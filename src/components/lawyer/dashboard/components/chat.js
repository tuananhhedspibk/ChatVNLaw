import React, {Component} from 'react';
import ChatBox from './chatbox';
import { Modal, Button } from 'semantic-ui-react';
import firebase from 'firebase';
import {getAllRoom} from '../../../../lib/room/rooms';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';

import * as constant from '../../../constants';
import * as translate from 'counterpart';
import { runInNewContext } from 'vm';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetUser:null,
      currentUser: null,
      users: [],
      unread: [],
      listUsersHeight: 0,
      review: {},
      modalOpen: false,
      closeUser: null,
      date: null
    };
  }

  componentWillMount(){
    var component = this;
    this.setState({
      currentUser : this.props.currentUser
    });
    let properties = {}
    properties['component'] = this;
    properties['currentUser'] = this.props.currentUser;
    getAllRoom(properties, (userArr) =>{
      component.setState({users :userArr})
    })
    this.props.emitter.addListener('getUserSearch', function(targetUser){
      component.state.users.every((element)=>{
        if(element.uid === targetUser.uid){
          targetUser.rid = element.rid;
          component.setState({targetUser: targetUser})
          return false;
        }
        return true;
      })
     
    })
  }
  
 
  componentWillUpdate(nextProps, nextState) {
    var component = this;
    var date = new Date();
    if(this.state.review !== nextState.review && nextState.users.length>0){
      for(var i in nextState.review){
        if(!!component.state.review[i]){
          if(component.state.review[i].created_at !== nextState.review[i].created_at){
            this.setState({
              closeUser: i,
              modalOpen: true,
              date: component.changeTypeDate(date)
            })
          }
        }
        else {
          this.setState({
            closeUser: i,
            modalOpen: true,
            date: component.changeTypeDate(date)
          })
        }
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.state.currentUser !== nextProps.currentUser){
      this.setState({currentUser: nextProps.currentUser});
    }
  }

  setHeight(component) {
    var vh = Math.max(document.documentElement.clientHeight,
      window.innerHeight || 0);
    var listUsersHeight = vh - $('.app-header').height();
    component.setState({listUsersHeight: listUsersHeight});
  }

  componentDidMount() {
    var component = this;
    firebase.database().ref(`lawyers/${this.props.currentUser.uid}/reviews`).on('value', data => {
      if(data.exists()){
        component.setState({
          review: data.val()
        })
      }
    })
    this.setHeight(this);
    $(window).resize(function() {
      component.setHeight(component);
    });
  }

  changeUserChat(user){
    document.body.classList.remove('chat-section-hidden');
    this.setState({targetUser: user});
    if ($('.chat-box-wrapper').css('display') == 'none') {
      $('.chat-box-wrapper').toggle();
      if($('.video-call').css('display') !== 'none') {
        $('.video-call').find('.video').toggle();
        $('.video-call').find('.end-call-btn').toggle();
      }
    }
  }

  changeTypeDate(date){
    var options = {
      weekday: 'long', year: 'numeric', month: 'short',
      day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    var dateFormatted = date.toLocaleDateString('vi-VN', options);
    return dateFormatted
  }

  handleCloseModal() {
    this.setState({modalOpen: false});
  }

  handleOpenModal() {
    var review = this.state.review;
    var component = this
    var date = new Date();
    this.setState({
      modalOpen: true,
      date: component.changeTypeDate(date)
    });
  }

  submitOk(){
    this.setState({
      modalOpen: false
    })
  }

  render() { 
    return(
      <div className='chat-section'>
        <div className='chat-users-list-wrapper'>
          <Scrollbars style={{
            height: this.state.listUsersHeight}}
            autoHide={true}
            autoHideTimeout={1500}
            thumbSize={100}
            renderView={
              props =>
              <div {...props} className='custom-content'/>
            }>
            <div className='chat-users-list'>
              {
                this.state.users.map(user => {
                  if(JSON.stringify(this.state.targetUser) === JSON.stringify(user)){
                  
                    return(
                      <div className='chat-user active-link'
                        onClick={this.changeUserChat.bind(this,user)}
                        key={user.uid}>
                        <div className='user-ava'>
                          <img src={user.photoURL} title={user.displayName}/>
                        </div>
                      </div>
                    )
                  
                  } else{
                    return(
                      <div className='chat-user'
                        onClick={this.changeUserChat.bind(this,user)}
                        key={user.uid}>
                        <div className='user-ava'>
                          <img src={user.photoURL} title={user.displayName}/>
                        </div>
                      </div>
                    )
                  }         
                })
              }
            </div>
          </Scrollbars>
        </div>
        <ChatBox
          targetUser={this.state.targetUser}
          currentUser={this.state.currentUser}
          emitter={this.props.emitter}/>
        <Modal size='tiny'
          onClose={this.handleCloseModal.bind(this)}
          open={this.state.modalOpen}
          id='rate-box' closeIcon={true}>
          <Modal.Content>
            <div className='rate-form'>
              <div className='time-stamp'>
                {this.state.date}
              </div>
              <footer>
                <div className='thanks'>
                 {this.state.closeUser} {translate('app.close_chat.close')}
                </div>
                <div className='lawyer-pic'>
                  <img src={constant.avaLawyerPic} />
                </div>
                <div className='rate'>
                  <button className='rate-submit' onClick = {this.submitOk.bind(this)}>
                    {translate('app.close_chat.submit')}
                  </button>
                </div>
              </footer>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default Chat;
