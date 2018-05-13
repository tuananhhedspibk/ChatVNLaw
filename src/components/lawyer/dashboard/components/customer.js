import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import { updateRoom, getRoomFilesAndImages } from '../../../../lib/room/rooms'

import * as constant from '../../../constants';
import * as translate from 'counterpart';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      targetUser: '',
      currentRoomId :'',
      files: [],
      images: [],
      description:''
    };
  }

  componentDidMount() {
    var component = this;
    $('main.main').addClass('main-customer');
    this.props.emitter.addListener('fetch_files', () => {
      component.fetchFiles(component, this.state.currentRoomId);
    });
    this.fetchFiles(component, this.state.currentRoomId);
  }

  componentWillMount(){
    var component = this;
    this.props.emitter.emit('ReSendData', function(currentUser, targetUser, roomId){
      component.setState({currentUser: currentUser,targetUser: targetUser,currentRoomId: roomId})   
    });
    this.props.emitter.addListener('RoomChatHasChanged', function(currentUser, targetUser,roomId,roomDes) {
      component.setState({currentUser: currentUser,targetUser: targetUser,currentRoomId: roomId,description: roomDes}) 
    });
  }

  fetchFiles(component, currentRoomId) {
    var properties = {
      roomId: currentRoomId
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

  componentWillUpdate(nextProps, nextState){
    var component = this;
    if(component.state.currentRoomId !== nextState.currentRoomId){
      $('.info-descrip').css('display', 'block');
      $('.edit-descrip').css('display', 'none');
      this.fetchFiles(component, nextState.currentRoomId);
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    var component = this;
    var desc = $('textarea.input-descrip').val();
    var properties = {
      roomId: this.state.currentRoomId,
      desc: desc
    };
    updateRoom(properties, (success,respon) => {
      if (success) {
        $('.info-descrip').css('display', 'block');
        $('.edit-descrip').css('display', 'none');
        component.setState({description: desc});
      }
    });
    
  }

  handleEdit(){
    $('.info-descrip').css('display', 'none');
    $('.edit-descrip').css('display', 'block');
    $('.input-descrip').focus();
  }
    
  render() {
    if(this.state.currentUser && this.state.targetUser && this.state.currentRoomId){
      return (
        <div className='chat-setting'>
          <div className='header'>
            <div className='ava'>
              <img id='current-user-ava' alt='ava'
                src={constant.API_BASE_URL + this.state.targetUser.avatar.url}/>
            </div>
            <div className='info'>
              <div className='user-name'>
                {this.state.targetUser.displayName}
              </div>
            </div>
          </div>
          <div className='content'>
            <div className='description'>
              <div className='title'>
                {translate('app.dashboard.chat_setting_des_title')}
              </div>
              <div className='edit-descrip'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <textarea rows='3' cols='50'
                      className='input-descrip' id='input-descrip'
                      >{this.state.description}</textarea>
                    <button type='submit'>{translate('app.dashboard.submit_des')}</button>
                </form>
              </div>
              <div className='info-descrip'>
                <div className='text-descrip'>{this.state.description}</div>
                <button onClick={this.handleEdit}>
                  {translate('app.dashboard.edit_des')}
                </button>
              </div>
            </div>
            <div className='shared shared-files'>
              <button className='content-title collapsed'
                data-toggle='collapse'
                data-target='#files-list'>
                  {translate('app.chat.shared_files')}
              </button>
              <div className='files-list collapse' id='files-list'>
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
            <div className='shared shared-images'>
              <button className='collapsed content-title'
                data-toggle='collapse'
                data-target='#images-list'>
                {translate('app.chat.shared_images')}
              </button>
              <div className='images-list collapse' id='images-list'>
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
          </div>
				</div>
      )
    }
    else{
      return(
        <div>
        </div>
      )
    }
  }
}

export default Customer;
