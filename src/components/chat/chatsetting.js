import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import '../../assets/styles/common/chatsetting.css';

import * as constant from '../constants';

let FontAwesome = require('react-fontawesome');
let translate = require('counterpart');
var firebase = require('firebase');
var imageRef;
var fileRef;
class ChatSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user_name: '',
      current_user_type: '',
      current_room_id: '',
      images_list:[],
      files_list: [],
      chat_target_uid:''
    }
  }
 
  shouldComponentUpdate(nextProps) {
    var component = this;
    if (nextProps.targetChatUserName !== this.state.current_user_name && nextProps.targetChatUserId && nextProps.currentRoomId){
      this.setState({
        chat_target_uid : nextProps.targetChatUserId,
        current_user_name: nextProps.targetChatUserName,
        current_room_id: nextProps.currentRoomId,
        images_list: [],
        files_list: []
      });
      var imagesList = [];
      var filesList = [];
      var roomId = nextProps.currentRoomId;
      if ( typeof imageRef !== 'undefined' && imageRef){
        imageRef.off();
      }
      if ( typeof fileRef !== 'undefined' && fileRef){
        fileRef.off();
      }
      imageRef = firebase.database().ref().child('rooms').child(roomId).child('room_images');
      fileRef = firebase.database().ref().child('rooms').child(roomId).child('room_files');

      imageRef.on('child_added',function(snapshot){
        if(snapshot.exists()){
          let item = {}
          snapshot.forEach(function(element){
            item[element.key] = element.val();
          })
          imagesList.push(item);
          component.setState({images_list: imagesList});
        }
      });

      fileRef.on('child_added', function(snapshot){
        if(snapshot.exists()){
          let item = {}
          snapshot.forEach(function(element){
            item[element.key] = element.val();
          })
          filesList.push(item);
          component.setState({files_list: filesList});
        }
      });

      return true;
    } else{
      return false;
    }
  }
     
  renderAva() {
    if(this.state.current_user_type === 'bot') {
      return(
        <img src={constant.avaBot} alt='ava-bot'/>
      )
    }
    else {
      return(
        <img src={constant.avaLawyer} alt='ava-lawyer'/>
      )
    }
  }

  renderConfig() {
  }

  render() {
    return(
      <div className='chat-setting'>
        <div className='header'>
          <div className='ava'>
            {this.renderAva()}
          </div>
          <div className='info'>
            <div className='user-name'>{this.state.current_user_name}</div>
          </div>
          {/* <div className='config'>
            {this.renderConfig()}
          </div> */}
        </div>
        <div className='content'>
          <div className='shared shared-files'>
            <div className='content-title'>{translate('app.chat.shared_files')}</div>
            <div className='files-list'>
              {
                this.state.files_list.map(file => {
                  return(
                    <Link to={file.downloadURL} target='_blank'>
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
                    <Link to={image.downloadURL} target='_blank'>
                      {image.name}
                    </Link>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div> 
    )
  }
}

export default ChatSetting;