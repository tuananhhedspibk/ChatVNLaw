import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import { Dropdown } from 'semantic-ui-react';
import $ from 'jquery';
import ReactStars from 'react-stars';
import * as Peer from 'peerjs';

import * as constant from '../constants';
import * as translate from 'counterpart';
import getStunServerList from '../../lib/getstunserverlist';
import * as videoCall from '../../lib/streaming/videocall';
import { cantCreatePeer } from '../../lib/notification/toast';
import { getUserRoleByUid } from '../../lib/user/getuserinfo';
import { reviewLawyer } from '../../lib/user/users';

import '../../assets/styles/common/chatWindow.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
      userRole: '',
      star_value: 0,
      content: ''
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

  componentDidMount() {
    var component = this;
    getUserRoleByUid((user_role) => {
      component.setState({userRole: user_role});
    });
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
    });
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

  handleOpenModal() {
    this.setState({modalOpen: true});
  }

  handleCloseModal() {
    var component = this;
    this.setState({modalOpen: false});
    var properties = {
      lawyer_id: this.props.targetUser.id,
      user_id: this.props.currentUser.uid,
      content: this.state.content,
      star: this.state.star_value
    }
    reviewLawyer(properties, (success, response) => {
      if (success) {
        component.props.finishSession();
      }
      else {
        console.log(response);
      }
    })
  }

  finishSession() {
    var component = this;
    this.handleOpenModal();
  }

  handleInputChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  ratingChanged(newRating) {
    this.setState({star_value: newRating});
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
            {
              this.props.talking ?
              (
                this.state.userRole === 'User' ?
                (
                  <div>
                    <Dropdown icon='list layout'>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={this.finishSession.bind(this)}>
                          {translate('app.settings.job_done')}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <i onClick={this.makeCallRequest.bind(this)}
                      className='fa fa-video-camera'
                      aria-hidden='true'></i>
                  </div>
                )
                :
                (
                  <i onClick={this.makeCallRequest.bind(this)}
                    className='fa fa-video-camera'
                    aria-hidden='true'></i>
                )
              )
              :
              (
                ''
              )
            }
            <Modal size='tiny'
              open={this.state.modalOpen}
              id='rate-box'>
              <Modal.Content>
                <div className='rate-form'>
                  <div className='time-stamp'>
                    8:31 A.M 19 tháng 1 năm 2018
                  </div>
                  <div className='cost-money'>
                    <p className='title'>
                      {translate('app.rate.cost_money')}
                    </p>
                    <p className='value'>
                      14,000 VND
                    </p>
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
                      <input className='input' name='content'
                        value={this.state.content}
                        onChange={this.handleInputChange.bind(this)}
                        placeholder={translate('app.rate.rate_tips')} />
                      <div className='stars'>
                        <ReactStars count={5}
                          value={this.state.star_value}
                          size={24} onChange={this.ratingChanged.bind(this)}
                          color1={'white'}
                          color2={'#ffd700'} />
                      </div>
                      <button className='rate-submit'
                        onClick={this.handleCloseModal.bind(this)}>
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