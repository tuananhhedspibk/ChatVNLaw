import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, TextArea, Button, Image,Modal, Dropdown } from 'semantic-ui-react';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';
import ChatSessionList from './chatsetting/chatsessionlist';

import * as constant from '../constants';
import * as Files from '../../lib/upfile/files';
import * as translate from 'counterpart';
import * as firebase from 'firebase';

import '../../assets/styles/common/chatSetting.css';

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
      currentRoomId: '',
      targetUser: null,
      currentUser: null,
      images:[],
      files: [],
      modalOpen: false,
      chatSettingHeight: ''
    };
  }

  setHeight(component) {
    var vh = Math.max(document.documentElement.clientHeight,
      window.innerHeight || 0);
    component.setState({chatSettingHeight: vh - 55});
  }

  componentDidMount() {
    var component = this;
    this.setHeight(this);
    $(window).resize(function() {
      component.setHeight(component);
    });
  }

  componentWillMount() {
    this.setState({currentRoomId : this.props.currentRoomId,
      targetUser: this.props.targetUser,
      currentUser: this.props.currentUser})
  }

  componentWillReceiveProps(nextProps){
    if(this.state.currentRoomId !== nextProps.currentRoomId && !! nextProps.currentRoomId){
      this.setState({currentRoomId: nextProps.currentRoomId})
    }
    if(this.state.currentUser !== nextProps.currentUser && !! nextProps.currentUser){
      this.setState({currentUser: nextProps.currentUser});
    }
    if(this.state.targetUser !== nextProps.targetUser && !!nextProps.targetUser){
      this.setState({targetUser: nextProps.targetUser});
    }
  }
  
  componentWillUpdate(nextProps, nextState){
    if(this.state.currentRoomId !== nextState.currentRoomId){
      let properties = {}
      properties.component = this;
      properties.roomId = nextState.currentRoomId;
      Files.showImagesAndFilesList(properties);
    }
  }

  renderAva() {
    return(
      <div>     
        <img  src={this.state.targetUser.photoURL}
          alt='ava-lawyer' id='current-user-ava'/>
      </div>
    )
  }

  upfile(event) {
    var component = this;
    event.preventDefault();
    $('#upfile-setting').trigger('click');
    var fileButton = document.getElementById('upfile-setting');
    fileButton.addEventListener('change', function(e){
      e.preventDefault();
      let file = e.target.files[0];
      var storeageRef = firebase.storage().ref(`avatar/${component.state.currentUser.uid}`);
      var task = storeageRef.put(file);
      task.on('state_changed', 
      function(snapshot){
      },
      function(err){
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
    this.state.currentUser.updateProfile({
      displayName: displayName,
      photoURL: photoURL
    }).then(function() {
      firebase.database().ref(`users/${component.state.currentUser.uid}`).update({
        photoURL:photoURL,
        displayName: displayName
      }).then(function(){
        component.handleCloseModal()
      })
    })
  }

  handleOpenModal() {
    this.setState({modalOpen: true});
  }

  handleCloseModal() {
    this.setState({modalOpen: false});
  }

  logout() {
    firebase.auth().signOut().then(function() {
      window.location = constant.BASE_URL + constant.HOME_URI;
    }).catch(function(error) {});
  }

  renderConfig(){
    if (this.state.currentUser.uid === this.state.targetUser.uid) {
      return(
        <Dropdown icon='settings'>
          <Dropdown.Menu>
            <Modal 
              onClose={this.handleCloseModal.bind(this)}
              open={this.state.modalOpen}
              id='edit-user-profile-box' closeIcon={true}>
              <Modal.Header>
                {translate('app.user.edit.profile')}
              </Modal.Header>
              <Modal.Content image>
                <div className='image-col' style={imgColStyle.base}>
                  <Image wrapped size='medium' id='edit-user-ava'
                    src={this.state.currentUser.photoURL}/>
                  <a href='#' onClick={this.upfile.bind(this)}
                    style={uploadNewPicStyle.base}>
                      <i className='fa fa-camera'
                      style={faCameraStyle} aria-hidden='true'></i>
                      {translate('app.user.upload.ava')}
                  </a>
                  <input type='file' id='upfile-setting'
                    accept='image/*' style={upfileStyle}/>
                </div>
                <Modal.Description>
                  <Header>{translate('app.user.name')}</Header>
                  <TextArea id='txtbox-username'
                    autoHeight onChange={this.handleInputChange}
                    rows={2} >{this.state.currentUser.displayName}</TextArea>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color='blue' onClick={this.editProfile.bind(this)}>
                  {translate('app.user.edit.profile')}
                </Button>
              </Modal.Actions>
            </Modal>
            <Dropdown.Item text={translate('app.user.edit.profile')}
              onClick={this.handleOpenModal.bind(this)}/>
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
        <Scrollbars style={{
          height: this.state.chatSettingHeight}}
          autoHide={true}
          autoHideTimeout={1500}
          thumbSize={100}
          hideTracksWhenNotNeeded={true}
          renderView={
            props =>
            <div {...props} className='custom-content'/>
          }
          renderTrackHorizontal={props =>
            <div {...props} className='track-horizontal'
              style={{display:'none'}}/>}>
              <div className='header'>
                <div className='ava'>
                  {this.renderAva()}
                </div>
                <div className='info'>
                  <div className={'user-name'}
                    title={this.state.targetUser.displayName}>
                    {this.state.targetUser.displayName}
                  </div>
                </div>
                <div className='config'>
                  {this.renderConfig()}
                </div> 
              </div>
              <div className='content'>
                <div className='shared'>
                  <div className='content-title'>
                    {translate('app.chat.lawyer_profile')}
                  </div>
                  {/*<a target='_blank' href={constant.BASE_URL +
                    '/lawyers/' + this.state.currentUser.username}>
                    {constant.BASE_URL + '/lawyers/'
                    + this.state.currentUser.username}</a>*/}
                </div>
                <div className='shared shared-files'>
                  <div className='content-title'>
                    {translate('app.chat.shared_files')}
                  </div>
                  <div className='files-list'>
                    {
                      this.state.files.map(file => {
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
                  <div className='content-title'>
                    {translate('app.chat.shared_images')}
                  </div>
                  <div className='images-list'>
                    {
                      this.state.images.map(image => {
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
                <ChatSessionList
                  currentUser={this.props.currentUser}
                  currentRoomId={this.props.currentRoomId} />
              </div>
        </Scrollbars>
      </div>
    )
  }
}

export default ChatSetting;
