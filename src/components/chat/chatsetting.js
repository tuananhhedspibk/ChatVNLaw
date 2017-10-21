import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, TextArea, Button, Image,
  Modal, Dropdown } from 'semantic-ui-react';
import AlertContainer from 'react-alert';
import '../../assets/styles/common/chatsetting.css';
import * as constant from '../constants';

const translate = require('counterpart');
const videoCall = require('../../lib/helper/video_call');
const streamEvent = require('../../lib/helper/streaming/listen_event_from_database');
const fileEvent = require('../../lib/helper/upfile/listen_event_from_database');
const firebase = require('firebase');
const $ = require('jquery');
// var {EventEmitter} = require('fbemitter');
// var emitter = new EventEmitter();
var upfileStyle = {
  display: 'none'
}

var uploadNewPicStyle = {
  base: {
    opacity: 1,
    zIndex: 2,
    display: 'inline-block',
    fontSize: '1.2em',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '60px',
    width: '100%',
    padding: '20px 20px',
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'none',
    backgroundColor: 'rgba(0, 0, 0, .5)'
  }
}

var faCameraStyle = {
  marginRight: '20px'
}

var imgColStyle = {
  base: {
    position: 'relative',
  }
}

class ChatSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user_type: '',
      current_room_id: '',
      images_list:[],
      files_list: []
    };
    this.currentUser;
    this.targetUser;
    this.currentRoomId;
    this.peer;
  }

  componentWillMount() {
    this.currentUser = this.props.currentUser;
    this.targetUser = this.props.targetChatUser;
    this.currentRoomId = this.props.currentRoomId;
    if(!(!!this.props.peer)){
      window.location = constant.BASE_URL+ '/chat/' + this.targetUser.username
    }
  }
  componentWillReceiveProps(nextProps){
    var component = this;
    if(component.currentRoom !== nextProps.currentRoomId){
      streamEvent.closeStream();
      streamEvent.closeRef();
      fileEvent.closeRef();
    }
    if(component.targetUser !== nextProps.targetChatUser){
      component.targetUser = nextProps.targetChatUser;    
    }
  }
  
  shouldComponentUpdate(nextProps, nextState){
    if(this.state !== nextState || this.currentRoomId !== nextProps.currentRoomId ||
      this.peer !== nextProps.peer ||
      (nextProps.currentRoomId && nextProps.currentUser
        && nextProps.targetChatUser)){
    
      return true;
    }

    return false;
  }
  componentDidMount(){
    
  }

  componentWillUpdate(nextProps, nextState){
    var component = this;
    if(component.peer !== nextProps.peer){
      component.peer = nextProps.peer;
    }
    if(component.currentRoomId !== nextProps.currentRoomId){
      component.currentRoomId = nextProps.currentRoomId;
      component.setState({
        current_room_id: nextProps.currentRoomId,
        images_list: [],
        files_list: []
      });
      
      let properties = {}
      properties['rid'] = nextProps.currentRoomId;
      properties['uid'] = component.currentUser.uid;
      properties['peer'] = component.peer;
      properties['vid'] = '#localStream';
      properties['imagesList'] = [];
      properties['filesList'] = [];
      properties['component'] = component;
      streamEvent.listenFromVideoCall(properties, function(ref){
      });
      

      fileEvent.listenFromImageFolder(properties, function(ref){
      })

      fileEvent.listenFromFilesFolder(properties,function(ref){
      })  
    }
    return true;
  }

  endCall(){
    let ref = firebase.database().ref(`rooms/${this.state.current_room_id}/video_call/end`).push()
    ref.set({
      end: true
    })
    ref.remove();
  }

  makeCallRequest(){
    let properties = {};
    properties['rid'] = this.state.current_room_id;
    properties['uid'] = this.currentUser.uid;
    videoCall.checkRequest(properties, function(issuccess){
      if(issuccess){
        alert('already been used');
      }else{
        videoCall.createRequest(properties,function(issuccess){
          
        });
      }
    });
    
  }  
  renderAva() {
    
      return(
        <div>     
          <img  src={this.currentUser.uid === this.targetUser.uid ? this.currentUser.photoURL : this.targetUser.photoURL} alt='ava-lawyer' id='current-user-ava'/>
        </div>
      )
    
  }
  
  renderVideo(){
    if(this.currentUser.uid !== this.targetUser.uid){
      return(
        <div>
          <video className='video' id='localStream' autoPlay></video>
            <button className='button-call' onClick={this.makeCallRequest
        .bind(this)} >Call</button>
            <button className='button-call' onClick={this.endCall.bind(this)} >End</button>
        </div>
      )
    }
  }

  upfile(event) {
    var component = this;
    event.preventDefault();
    $('#upfile-setting').trigger('click');
    var fileButton = document.getElementById('upfile-setting');
    fileButton.addEventListener('change', function(e){
      e.preventDefault();
      let file = e.target.files[0];
      var storeageRef = firebase.storage().ref(`avatar/${component.currentUser.uid}`);
      var task = storeageRef.put(file);
      task.on('state_changed', 
      function(snapshot){
      },
      function(err){
        console.log(err);
        
      },
      function(){
        $('#edit-user-ava').find('img').attr('src',task.snapshot.downloadURL);
      })
      
    })
  }

  editProfile() {
    var component = this;
    let photoURL = $('#edit-user-ava').find('img').attr('src');
    let displayName = $('#txtbox-username').val();
    this.currentUser.updateProfile({
      displayName: displayName,
      photoURL: photoURL
    }).then(function() {
      firebase.database().ref(`users/${component.currentUser.uid}`).update({
        photoURL:photoURL,
        displayName: displayName
      }).then(function(){

      })
    })
  }

  logout() {
    
  }
  showAlert = (text) => {
    this.msg.show(text, {
      time: 5000,
      type: 'success',
      icon: <img alt='warning' src={constant.warning} />
    })
  }
  renderConfig(){
    if (this.currentUser.uid === this.targetUser.uid) {
      return(
        <Dropdown icon='settings'>
          <Dropdown.Menu>
            <Modal id='edit-user-profile-box' trigger={
              <Dropdown.Item  text={translate('app.user.edit.profile')}/>
            } closeIcon>
              <Modal.Header>
                {translate('app.user.edit.profile')}
              </Modal.Header>
              <Modal.Content image>
                <div className='image-col' style={imgColStyle.base}>
                  <Image wrapped size='medium' id='edit-user-ava'
                    src={this.currentUser.photoURL}
                     />
                  <a href='#' onClick={this.upfile}
                    style={uploadNewPicStyle.base}>
                      <i className='fa fa-camera'
                      style={faCameraStyle} aria-hidden='true'></i>
                      {translate('app.user.upload.ava')}
                  </a>
                  <input type='file' id='upfile-setting' accept="image/*"
                    style={upfileStyle}/>
                </div>
                <Modal.Description>
                  <Header>{translate('app.user.name')}</Header>
                  <TextArea id='txtbox-username'
                    autoHeight onChange={this.handleInputChange}
                    rows={2} >{this.currentUser.displayName}</TextArea>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color='blue' onClick={this.editProfile}>
                  {translate('app.user.edit.profile')}
                </Button>
              </Modal.Actions>
            </Modal>
            <Dropdown.Item text={translate('app.identifier.logout')}
              onClick={this.logout.bind(this)}/>
          </Dropdown.Menu>
        </Dropdown>
      )
    }
  }

  render() {
    return(
      <div className='chat-setting'>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS}/>        

        <div className='header'>
          <div className='ava'>
            {this.renderAva()}
          </div>
          <div className='info'>
            <div className={'user-name'}>
              {this.currentUser.uid === this.targetUser.uid ? this.currentUser.displayName : this.targetUser.displayName}
            </div>
          </div>
          <div className='config'>
            {this.renderConfig()}
          </div> 
        </div>
        <div className='content'>
          <div className='shared shared-files'>
            <div className='content-title'>{translate('app.chat.shared_files')}</div>
            <div className='files-list'>
              {
                this.state.files_list.map(file => {
                  return(
                    <Link to={file.downloadURL}
                      target='_blank'>
                        {file.name}
                    </Link>
                  )
                })
              }
            </div>
          </div>
          <div className='shared shared-images'>
            <div className='content-title'>{translate('app.chat.shared_images')}</div>
            <div className='images-list'>
              {
                this.state.images_list.map(image => {
                  return(
                    <Link to={image.downloadURL}
                      target='_blank'>
                        {image.name}
                    </Link>
                  )
                })
              }
            </div>
          </div>
          {this.renderVideo()}
        </div>
      </div> 
    )
  }
}

export default ChatSetting;