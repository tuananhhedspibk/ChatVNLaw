import React, { Component } from 'react';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: '',
            targetUser: '',
            currentRoomId :''
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
    render() {
        return (
            <div className='chat-setting'>
                
            </div>
        )
    }
}

export default UserInfo;
