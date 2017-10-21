import React, {Component} from 'react';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.currentUser = '';
    this.targetUser = '';
    this.currentRoomId = '';
  }  
  componentWillMount(){
    
  }
  componentWillReceiveProps(nextProps){
    var component = this;
    if(component.targetUser !== nextProps.targetUser && nextProps.targetUser){
      component.targetUser = nextProps.targetUser;
      
    }
  }

  render() {
    return(
      <div className='chat-box'>
        <h1>{this.props.targetUser || 'null'}</h1>
      </div>
    )
  }
}

export default ChatBox;
