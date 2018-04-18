import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Image,
  Modal } from 'semantic-ui-react';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';

import ChatSessionList from './chatsetting/chatsessionlist';

import { getRoomFilesAndImages } from '../../lib/room/rooms';

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
      chatSettingHeight: null
    };
  }

  setHeight(component) {
    var vh = Math.max(document.documentElement.clientHeight,
      window.innerHeight || 0);
    component.setState({chatSettingHeight: vh - 55});
  }

  componentWillMount() {
    this.setState({currentRoomId : this.props.currentRoomId,
      targetUser: this.props.targetUser,
      currentUser: this.props.currentUser})
  }

  fetchFiles(component) {
    var properties = {
      roomId: this.props.currentRoomId
    };
    var files = [];
    var images = [];
    getRoomFilesAndImages(properties, (success, response) => {
      if (success) {
        response.data.list_files.map((item, idx) => {
          var url = item.file.url;

          if(item.content_type_id === 1) {
            images.push({
              url: constant.API_BASE_URL + url,
              name: response.data.list_files_names[idx]
            });
          }
          else {
            files.push({
              url: constant.API_BASE_URL + url,
              name: response.data.list_files_names[idx]
            });
          }
        });
        component.setState({
          images: images,
          files: files
        });
      }
      else {}
    });
  }

  componentDidMount(){
    var component = this;    
    this.setHeight(this);
    $(window).resize(function() {
      component.setHeight(component);
    });
    this.props.emitter.addListener('fetch_files', () => {
      component.fetchFiles(component);
    });
    this.fetchFiles(component);
  }

  handleOpenModal() {
    this.setState({modalOpen: true});
  }

  handleCloseModal() {
    this.setState({modalOpen: false});
  }

  renderAva() {
    return(
      <div>     
        <img  src={constant.API_BASE_URL + this.state.targetUser.avatar.url}
          alt='ava-lawyer' id='current-user-ava'/>
      </div>
    )
  }

  renderSharedFile(){
    return(
      <div className='shared session-infor shared-files'>
        <button className='collapsed content-title'
          data-toggle='collapse'
					data-target='#files-list-content'>
          {translate('app.chat.shared_files')}
        </button>
        <div className='files-list collapse' id='files-list-content'>
          {
            this.state.files.map(file => {
              return(
                <Link to={file.url}
                  target='_blank'>
                    {file.name}
                </Link>
              )
            })
          }
        </div>
      </div>
    )
  }

  renderSharedImage(){
    return(
      <div className='shared session-infor shared-images'>
        <button className='collapsed content-title'
          data-toggle='collapse'
					data-target='#images-list-content'>
          {translate('app.chat.shared_images')}
          </button>
        <div className='images-list collapse' id='images-list-content'>
          {
            this.state.images.map(image => {
              return(
                <Link to={image.url}
                  target='_blank'>
                    {image.name}
                </Link>
              )
            })
          }
        </div>
      </div>
    )
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
              </div>
              <div className='content'>
                <div className='shared session-infor'>
                  {
                    JSON.parse(localStorage.chat_vnlaw_user)['role'] === 'User' ?
                    (
                      <button className='profile-btn content-title no-icon'
                        onClick={ () =>{
                          window.open(constant.BASE_URL + constant.LAWYER_PROFILE_URI + '/'
                            + this.state.targetUser.userName)}}>
                            {translate('app.chat.lawyer_profile')}
                      </button>
                    ):
                    (
                      <button className='profile-btn content-title no-icon'
                        onClick={ () =>{
                          window.open(constant.BASE_URL + constant.CUSTOMER_PROFILE_URI + '/'
                            + this.state.targetUser.userName)}}>
                            {translate('app.chat.customer_profile')}
                      </button>
                    )
                  }
                </div>
                {this.renderSharedFile()}
                {this.renderSharedImage()}
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
