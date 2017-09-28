import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

import '../../assets/styles/common/chatsetting.css';

import * as constant from '../constants';

let authen = require('../../lib/api/authentication.js');
let FontAwesome = require('react-fontawesome');
let translate = require('counterpart');
var firebase = require('firebase');
var upfile_helper = require('../../lib/helper/upfile_helper');

class ChatSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user_name: '',
      current_user_type: '',
      current_room_id: '',
      image_list:[],
      file_list: [],
      chat_target_uid:''
    }
  }

  logout() {
    authen.logout(function(response){
      if(response.status === 200) {
        window.location = constant.BASE_URL + constant.SIGN_IN_URI;
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.targetChatUserName != this.state.current_user_name){
      this.setState({
        chat_target_uid : nextProps.targetChatUserId,
        current_user_name: nextProps.targetChatUserName
        // current_user_type: nextProps.targetChatUserType,
        // current_room_id: nextProps.currentRoomId,
        // image_list: [],
        // file_list: []
      });
    }
  //     var roomId = component.state.current_room_id;
  //     console.log(roomId);
      
  //     if( roomId){
  //       console.log(roomId);
  //       var imageList = component.state.image_list;
  //       // var ref = 'room_images/'+roomId.toString()+'/';
  //       upfile_helper.getItemList('room_images',roomId.toString(), function(type, item){
  //         if(type ===1){
  //           imageList.push(item);
  //           component.setState({image_list : imageList});
  //         }
  //       })
  //     }  
  //     // var fileList = component.state.file_list;
  //     // upfile_helper.getItemList('room_files/'+roomId, function(type, item){
  //     //   if(type === 1){
  //     //     fileList.push(item);
  //     //     component.setState({file_list : fileList});
  //     //     console.log(fileList);
  //     //   }
  //     // })
  //   }
  }

  shouldComponentUpdate(nextProps){
    if (nextProps.targetChatUserName != this.state.current_user_name){
      this.setState({
        chat_target_uid : nextProps.targetChatUserId,
        current_user_name: nextProps.targetChatUserName,
        // current_user_type: nextProps.targetChatUserType,
        current_room_id: nextProps.currentRoomId
        // image_list: [],
        // file_list: []
      });
      return true;
    }
    else {
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
    var currentUser = firebase.auth().currentUser;
    // if(this.state.chat_target_uid === currentUser.uid) {
    //   return(
    //     <Dropdown icon='setting'>
    //       <Dropdown.Menu>
    //         <Dropdown.Item text={translate('app.identifier.logout')}
    //           onClick={this.logout.bind(this)}/>
    //       </Dropdown.Menu>
    //     </Dropdown>
    //   )
    // }
    // return null;
  }

  render() {
    console.log("222");
    return(
      <div className='chat-setting'>
        <div className='header'>
          <div className='ava'>
            {this.renderAva()}
          </div>
          <div className='info'>
            <div className='user-name'>{this.state.current_user_name}</div>
          </div>
          <div className='config'>
            {this.renderConfig()}
          </div>
        </div>
        <div className='content'>
          <div className='shared shared-files'>
            <div className='content-title'>{translate('app.chat.shared_files')}</div>
          </div>
          <div className='shared shared-images'>
            <div className='content-title'>{translate('app.chat.shared_images')}</div>
          </div>
        </div>
      </div> 
    )
  }
}

export default ChatSetting;
