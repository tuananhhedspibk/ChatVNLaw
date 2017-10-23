import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as Translate from 'counterpart';
import * as Files from '../../../../lib/helper/upfile/files';
class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: '',
            targetUser: '',
            currentRoomId :'',
            files: [],
            images: []
        };

    }
    componentWillMount(){
        var component = this;
        this.props.emitter.emit('ReSendData', function(currentUser, targetUser, roomId){
            component.setState({currentUser: currentUser})
            component.setState({targetUser: targetUser})
            component.setState({currentRoomId: roomId})
        });
        this.props.emitter.addListener('RoomChatHasChanged', function(currentUser, targetUser,roomId) {
            component.setState({currentUser: currentUser})
            component.setState({targetUser: targetUser})
            component.setState({currentRoomId: roomId})
        });
    }
    componentWillUpdate(nextProps, nextState){
        var component = this;
        if(component.state.currentRoomId != nextState.currentRoomId){
            Files.closeRef();
            let properties ={};
            properties.component = component;
            properties.roomId = nextState.currentRoomId;
            component.setState({images:[], files: []});
            Files.showImagesAndFilesList(properties);
        }
    }
    renderAva(){
        if(this.state.currentUser && this.state.targetUser){
            return(
                <div>
                    <img  src={this.state.currentUser.uid === this.state.targetUser.uid ? this.state.currentUser.photoURL : this.state.targetUser.photoURL} alt='ava-lawyer' id='current-user-ava'/>
                </div>
            )
        }
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
                                {this.state.currentUser.uid === this.state.targetUser.uid ? this.state.currentUser.displayName : this.state.targetUser.displayName}
                            </div>
                        </div>
                    </div>
                    <div className='content'>
                        <div className='shared shared-files'>
                            <div className='content-title'>{Translate('app.chat.shared_files')}</div>
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
                            <div className='content-title'>{Translate('app.chat.shared_images')}</div>
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
        }else{
            return(
                <div>
                </div>
            )
        }
    }
}

export default UserInfo;
