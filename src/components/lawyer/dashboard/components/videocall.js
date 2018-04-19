import React from 'react'
import $ from 'jquery';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import { Checkbox } from 'semantic-ui-react';
import Loading from '../../../shared/loading';
import getStunServerList from '../../../../lib/getstunserverlist';
import {cantCreatePeer} from '../../../../lib/notification/toast';

import * as videoCall from '../../../../lib/streaming/videocall';
import * as translate from 'counterpart';
import * as Peer from 'peerjs';
import * as constant from '../../../constants';

import 'react-confirm-alert/src/react-confirm-alert.css';

class VideoCall extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      targetUser: null,
      currentUser: null,
      currentRoomId: null,
      showDialog: false,
      isLoading: true,
      peer : null
    }
    this.peer = null;
  }
  componentWillMount(){
    var component = this;
    this.setState({targetUser: this.props.targetUser,
      currentUser: this.props.currentUser,
      currentRoomId : this.props.currentRoomId},()=>{
        if(!!component.state.currentRoomId){
          let properties = {}
          properties['roomId'] = component.state.currentRoomId;
          properties['component'] = component;
          videoCall.closeRef();
          videoCall.closeStream();
          videoCall.listenFromVideoCall(properties, () =>{})
        }
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.state.currentUser !== nextProps.currentUser){
      this.setState({currentUser: nextProps.currentUser})
    }
    if(this.state.targetUser !== nextProps.targetUser){
      this.setState({targetUser: this.props.targetUser});
    }
    if(this.state.currentRoomId !== nextProps.currentRoomId){
      this.setState({currentRoomId: nextProps.currentRoomId});
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

  endCall(){
    $('.video-call').hide();
    var properties = {}
    properties['rid'] = this.state.currentRoomId;
    videoCall.endCall(properties, ()=>{

    })
  }

  renderVideo() {
    $('.video-call').show();
    if($('.video-call').find('.video').css('display') == 'none') {
      $('.video-call').find('.video').show();
      $('.video-call').find('.end-call-btn').show();
    }
  }

  renderView(){
    return (
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
        <div className='header'>
          {this.state.targetUser ?
              <div className='user-name'>
                {this.state.targetUser.displayName}
              </div> :
              translate('app.dashboard.chat_title')}
          <i onClick={this.makeCallRequest.bind(this)}
            className='fa fa-video-camera'
            aria-hidden='true'></i>
          <i className='fa fa-phone'
            aria-hidden='true'></i>
        </div>
      </div>
    )
  }
  render(){
    return(
      this.renderView()
    )
  }
}

export default VideoCall;
