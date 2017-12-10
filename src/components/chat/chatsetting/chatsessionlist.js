import React from 'react';

import {getChatSession} from '../../../lib/room/chatsession';
import * as translate from 'counterpart';
import * as constant from '../../constants';

import '../../../assets/styles/common/chatSession.css';

class ChatSessionList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      currentUser: null,
      currentRoomId: null
    };
  }

  componentWillMount(){
    this.setState({currentUser: this.props.currentUser,
      currentRoomId : this.props.currentRoomId})
  }

  componentDidMount(){
    var tmp = [];
    var component = this;
    getChatSession(this,{}, (event, data) =>{
      switch(event){
        case 'child_added':
          var item = data.val();
          item.id = data.key;
          tmp.push(item);
          component.setState({list : tmp});
          break;
        case 'child_changed':
          tmp.every((element, index) =>{
            if(element.id === data.key){
              tmp[index] = data.val();
              tmp[index].id = data.key;
              component.setState({list: tmp})
              console.log(tmp);
              return false;
            }    
            return true;
          })
          break;
        case 'child_removed':
          break;
      }
    })
  }

  convertDateToHour(date){
    date = new Date(parseInt(date))
    return date.getUTCHours() + ':' + date.getUTCMinutes();
  }

  convertDateToSecond(date){
    date = new Date(parseInt(date))
    return date.getUTCHours() + ':' + date.getUTCMinutes() +
      ':' + date.getUTCSeconds();
  }

  convertDateToDay(date){
    date = new Date(parseInt(date))
    return date.getUTCDate() + '/' +
      (date.getUTCMonth() + 1) + '/' + date.getUTCFullYear();
  }

  renderSessionList(){
    return(
      this.state.list.map(element =>{
        return(
          <div className='item-content'>
            <div className='time-start'>
              <img src={constant.openIcon}/>
              {this.convertDateToDay(element.startTime) +
                ' - ' + this.convertDateToHour(element.startTime)}
            </div>
            <div className='time-close'>
              <img src={constant.closeIcon}/>
              {this.convertDateToDay(element.closeTime) +
                ' - ' + this.convertDateToHour(element.closeTime)}
            </div>
            <div className='time-total'>
              <div className='icon-container'>
                <i className="fa fa-clock-o" aria-hidden="true"></i>
              </div>
              {this.convertDateToSecond(element.totalTime)}
            </div>
            <div className='cart'>
              <img src={constant.cartIcon}/>
              {element.cart}
            </div>
            {
              !element.payment ?
              <button className='payment'>
                {translate('app.chat.pay')}
              </button> : <div></div>
            }
          </div>
        )
      })
    )
  }

  render(){
    return(
      <div className='shared session-infor'>
        <button className='collapsed content-title'
          data-toggle='collapse'
					data-target='#session-chat-content'>
          {translate('app.chat.chat_session_list')}
        </button>
        <div className='items-list collapse'
          id='session-chat-content'>
            {this.renderSessionList()}
        </div>
      </div>
    )  
  }
}

export default ChatSessionList;