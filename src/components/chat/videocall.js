import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import $ from 'jquery';
import ReactStars from 'react-stars';
import getStunServerList from '../../lib/getstunserverlist';

import * as Peer from 'peerjs';
import * as constant from '../constants';
import * as translate from 'counterpart';
import * as videoCall from '../../lib/streaming/videocall';
import {cantCreatePeer} from '../../lib/notification/toast';

import firebase from 'firebase';

import '../../assets/styles/common/chatWindow.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Time from 'react-time'

class VideoCall extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      showDialog: false,
      currentUser: null,
      targetUser:null,
      peer: null,
      currentRoomId: null,
      modalOpen: false,
      lawyer: null,
      review : {
        avatar: null,
        username: null,
        date : null,
        star : 0,
        comment: null
      }
    };
    this.emitter=null;
  }

  componentWillMount(){
    this.setState({currentUser: this.props.currentUser,
                  targetUser: this.props.targetUser,
                  date: new Date()
                })
  }
  componentWillReceiveProps(nextProps){
    if(this.state.currentRoomId !== nextProps.currentRoomId){
      this.setState({currentRoomId: nextProps.currentRoomId})
    }
  }

  componentWillUpdate(nextProps, nextState){
    if(this.state.currentRoomId !== nextState.currentRoomId){
      let properties = {}
      properties['roomId'] = nextState.currentRoomId;
      properties['component'] = this;
      videoCall.closeRef();
      videoCall.closeStream();
      videoCall.listenFromVideoCall(properties, () =>{})
    } 
  }  

  createPeer(callback){
    var component = this;
    if(!!this.state.peer){
      if(!!this.state.peer.id)
        return callback(true);
    }
    var counter = 0;
    getStunServerList(() =>{
      var stunServer = JSON.parse(localStorage.stun_server_list);
      let peer = null;      
      do{
        counter ++;
        peer = new  Peer(component.props.currentUser.uid,
          {key: constant.PEERJS_KEY,host: 'vnlaw-peerjs.herokuapp.com',
          secure:true,port: 443, config: stunServer});       
      } while(!!!(peer.id) && counter < 10);
      if(!!peer.id){
        component.setState({peer : peer});
        return callback(true);       
      }
      return callback(false);
    })  
  }

  renderVideo() {
    $('.video-call').show();
  }

  onConfirm(){
    var component = this;
    let properties ={}
  
    properties.component = this;
    videoCall.onConfirm(properties, () =>{
      component.setState({showDialog: false})
      component.renderVideo();
    })
  }
  onCancel(){
    var component = this;
    let properties ={}
    properties.component = this;
    videoCall.onCancel(properties, () =>{
      component.setState({showDialog: false})
    })
  }
  endCall(){
    var properties = {}
    properties['rid'] = this.state.currentRoomId;
    videoCall.endCall(properties, ()=>{

    })
  }
  makeCallRequest(){
    let properties = {};
    var component = this;

    this.createPeer( (isValidPeer)=>{
      if(isValidPeer){
        properties['rid'] = this.state.currentRoomId;
        properties['uid'] = this.state.currentUser.uid;
        videoCall.checkRequest(properties, function(issuccess){
          if(issuccess){
            component.props.emitter.emit('AddNewErrorToast',
              translate('app.system_notice.error.title'),
              translate('app.system_notice.error.text.already_been_used'),
              5000, () =>{});
          }else{
            videoCall.createRequest(properties,function(issuccess){
              if(issuccess){
                component.renderVideo();
              }
            });
          }
        });
      }else{
        cantCreatePeer(component.props.emitter,()=>{
          $('.video-call').hide();
        })
      }
    })
  }

  changeTypeDate(date){
    var options = {
      weekday: 'long', year: 'numeric', month: 'short',
      day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    var dateFormatted = date.toLocaleDateString('vi-VN', options);
    return dateFormatted
  }

  handleOpenModal() {
    var review = this.state.review;
    var date = new Date();
    this.setState({
      modalOpen: true,
      review : {
        date : this.changeTypeDate(date),
        star: review.star,
        comment: review.comment
      }
    });
  }

  handleCloseModal() {
    this.setState({modalOpen: false});
  }

  submitEndCall(){
    var comment = $('.comment').val();
    var review = this.state.review
    this.setState({
      review:{
        avatar: review.avartar,
        username: review.username,
        star: review.star,
        date: Date.now(),
        comment: comment
      },
      modalOpen: false
    })
    firebase.database().ref(`lawyers/${this.state.targetUser.uid}/reviews/${this.state.currentUser.uid}`).set({
      avartar: this.state.currentUser.photoURL,
      username: this.state.currentUser.displayName,
      star: review.star,
      content: comment,
      created_at: Date.now(),
    })
  }

  ratingChanged(newRating, value){
    var review = this.state.review
    this.setState({
      review: {
        avatar: review.avartar,
        username: review.username,
        star: newRating,
        date: review.date,
        comment: review.comment
      }
    })
  }


  render(){
    return(
      <div>
        <div>
        {
          this.state.showDialog &&
          <ReactConfirmAlert
            title={translate('app.confirm_dialog.title')}
            message={translate('app.confirm_dialog.message')}
            confirmLabel={translate('app.confirm_dialog.confirm_label')}
            cancelLabel={translate('app.confirm_dialog.cancel_label')}
            onConfirm={this.onConfirm.bind(this)}
            onCancel={this.onCancel.bind(this)}
          />
        }
        </div>
        <div className='video-call'>
          <video className='video'
            id='localStream' autoPlay></video>
            <button onClick={this.endCall.bind(this)}
              className='end-call-btn'>
                <i className='fa fa-phone'
                  aria-hidden='true'></i>
            </button>
        </div>
        <div className='title'>
          <div className={'user-name'}>
            {this.state.targetUser.displayName}
          </div>
          <div className='call-section'>
            <i onClick={this.makeCallRequest.bind(this)}
              className='fa fa-video-camera'
              aria-hidden='true'></i>
            <i className='fa fa-unlink'
              aria-hidden='true'
              onClick={this.handleOpenModal.bind(this)}></i>
              <Modal size='tiny'
                onClose={this.handleCloseModal.bind(this)}
                open={this.state.modalOpen}
                id='rate-box' closeIcon={true}>
                <Modal.Content>
                  <div className='rate-form'>
                    <div className='time-stamp'>
                      {this.state.review.date}
                    </div>
                    <div className='tips'>
                      {translate('app.rate.tips')}
                    </div>
                    <footer>
                      <div className='thanks'>
                        {translate('app.rate.thanks')}
                      </div>
                      <div className='lawyer-pic'>
                        <img src={constant.avaLawyerPic} />
                      </div>
                      <div className='rate'>
                        <div className='title'>
                          {translate('app.rate.rate_tips')}
                        </div>
                        <div className='stars'>
                          <ReactStars count={5}
                            value={this.state.review.star} size={24}
                            onChange={this.ratingChanged.bind(this)}
                            color1={'white'}
                            color2={'#ffd700'} />
                        </div>
                        <div class="form-group">
                          <label for="comment">Đánh giá luật sư:</label>
                          <textarea className="form-control comment" rows="3" id="comment"></textarea>
                        </div>
                        <button className='rate-submit' onClick = {this.submitEndCall.bind(this)}>
                          {translate('app.rate.rate_done')}
                        </button>
                      </div>
                    </footer>
                  </div>
                </Modal.Content>
              </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCall;