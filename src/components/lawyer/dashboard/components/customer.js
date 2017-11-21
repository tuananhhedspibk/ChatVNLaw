import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import firebase from 'firebase';

import * as Files from '../../../../lib/upfile/files';
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
    $('main.main').addClass('main-customer');
  }

  componentWillMount(){
    console.log('mount')
    var component = this;
    this.props.emitter.emit('ReSendData', function(currentUser, targetUser, roomId){
      component.setState({currentUser: currentUser,targetUser: targetUser,currentRoomId: roomId})   
    });
    this.props.emitter.addListener('RoomChatHasChanged', function(currentUser, targetUser,roomId) {
      component.setState({currentUser: currentUser,targetUser: targetUser,currentRoomId: roomId})    
    });
  }

  componentWillUpdate(nextProps, nextState){
    console.log('update')
    var descrip = [];
    var component = this;
    if(component.state.currentRoomId != nextState.currentRoomId){
      $('.info-descrip').css('display', 'block');
      $('.edit-descrip').css('display', 'none');
      Files.closeRef();
      let properties ={};
      properties.component = component;
      properties.roomId = nextState.currentRoomId;
      component.setState({images:[], files: []});
      Files.showImagesAndFilesList(properties);
      firebase.database().ref(`rooms/${nextState.currentRoomId}/description`).once('value', (data) =>{
        component.setState({
          description: data.val()
        })
      });
    }
  }

  componentDidMount(){
    var component = this
    firebase.database().ref(`rooms/${this.state.currentRoomId}/description`).once('value', (data) =>{
      component.setState({
        description: data.val()
      })
    });
  }

  renderAva(){
    if(this.state.currentUser && this.state.targetUser){
      return(
        <div>
          <img  src={this.state.currentUser.uid === this.state.targetUser.uid ?
            this.state.currentUser.photoURL : this.state.targetUser.photoURL}
            alt='ava-lawyer' id='current-user-ava'/>
        </div>
      )
    }
  }

  handleInputChange(evt) {
    const target = evt.target;
    const value = target.value;
    this.setState({
        description: value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    firebase.database().ref(`rooms/${this.state.currentRoomId}`).set({
        description: this.state.description
    });
    $('.info-descrip').css('display', 'block');
    $('.edit-descrip').css('display', 'none');
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
              {this.renderAva()}
            </div>
            <div className='info'>
              <div className='user-name'>
                {this.state.currentUser.uid === this.state.targetUser.uid ?
                this.state.currentUser.displayName :
                this.state.targetUser.displayName}
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
                    <textarea rows="3" cols="50"
                      className="input-descrip" id="input-descrip"
                      onChange={this.handleInputChange.bind(this)}
                      value={this.state.description}></textarea>
                    <button type='submit'>{translate('app.dashboard.submit_des')}</button>
                </form>
              </div>
              <div className="info-descrip">
                <div className='text-descrip'>{this.state.description}</div>
                <button onClick={this.handleEdit}>
                  {translate('app.dashboard.edit_des')}
                </button>
              </div>
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
