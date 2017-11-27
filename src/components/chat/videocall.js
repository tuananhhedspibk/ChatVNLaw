import React from 'react';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import
import $ from 'jquery';
import getStunServerList from '../../lib/getstunserverlist';

import * as Peer from 'peerjs';
import * as constant from '../constants';
import * as translate from 'counterpart';
import * as videoCall from '../../lib/streaming/videocall';
import {cantCreatePeer} from '../../lib/notification/toast';

import '../../assets/styles/common/chatWindow.css';

import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class VideoCall extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      showDialog: false,
      currentUser: null,
      targetUser:null,
      peer: null,
      currentRoomId: null
    };
    this.emitter=null;
  }

  componentWillMount(){
    this.setState({currentUser: this.props.currentUser,
                  targetUser: this.props.targetUser})
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
        peer = new  Peer(component.props.currentUser.uid,{key: constant.PEERJS_KEY,host: 'vnlaw-peerjs.herokuapp.com',secure:true,port: 443, config: stunServer});       
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
        console.log(component.state.peer);
        properties['rid'] = this.state.currentRoomId;
        properties['uid'] = this.state.currentUser.uid;
        videoCall.checkRequest(properties, function(issuccess){
          if(issuccess){
            component.props.emitter.emit('AddNewErrorToast', translate('app.system_notice.error.title'), translate('app.system_notice.error.text.already_been_used'), 5000, () =>{});
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
            <i className='fa fa-phone'
              aria-hidden='true'></i>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCall;