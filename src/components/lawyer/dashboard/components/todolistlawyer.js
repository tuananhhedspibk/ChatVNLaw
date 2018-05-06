import React, {Component} from 'react';
import $ from 'jquery';

import { getAllTasks } from '../../../../lib/user/lawyers';

import * as translate from 'counterpart';

class TodoListLawyer extends Component {
  constructor(props) {
    super(props);
    this.state ={
      todoList :[],
      currentUser: '',
      targetUser: '',
      currentRoomId: ''
    }
  }

  componentWillMount(){
    var component = this;
    this.props.emitter.emit('ReSendData',
      function(currentUser, targetUser, roomId){
      component.setState({currentUser: currentUser,
        targetUser: targetUser,
        currentRoomId: roomId})    
    });
    this.props.emitter.addListener('RoomChatHasChanged',
      function(currentUser, targetUser,roomId,roomDes) {
        component.setState({currentUser: currentUser,
          targetUser: targetUser,
          currentRoomId: roomId})
    });
  }

  componentDidMount(){
    var component = this;
    var tempData = [];
    getAllTasks(this.props.currentUser.lawyer_id, (success,response) => {
      if(success && response){   
        for(var i in response.data.rooms){
            tempData.push(response.data.rooms[i])
        }
      }
      else {
        console.log("ciaaaa")
        console.log(response)
      }
      component.setState({
          todoList: tempData
      })
    });
  }

  renderTodoList(){
    var component = this;
    if(component.state.todoList.length > 0){
      return(
        component.state.todoList.map((todoList, index) => {
          return(
            <div className='todos-list'>
              <button type='button' className=
                'btn toggle-btn collapsed' data-toggle='collapse'
                data-target={'#todo-list-lawyer' + index}>
                  <div>{translate('app.dashboard.with')}</div>
                  {todoList.targetUser}
              </button>
              <div id={'todo-list-lawyer' + index} className='collapse'>
                <ul id='myUL'>
                  {todoList.tasks.map(content => (
                    <li className={content.status} >
                        {content.content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })
      )
    } 
    else {
      return (
        <div className='nothing-todo-title'>
          {translate('app.dashboard.todo_list_none')}
        </div>
      )
    }
  }

  render(){
    var component = this
    return (
      <div id='myDIV' className='header'>
        {component.renderTodoList()}
      </div>
    )
  }
}

export default TodoListLawyer;
