import React, {Component} from 'react';
import $ from 'jquery';
import { NotificationManager } from 'react-notifications';

import { getTasksByRoom, createTask,
  deleteTask, updateTask } from '../../../../lib/user/lawyers';

import * as translate from 'counterpart';

class TodoList extends Component {
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
        component.setState({
          currentUser: currentUser,
          targetUser: targetUser,
          currentRoomId: roomId
        });      
    });
  }

  componentWillUpdate(nextProps, nextState){
    var component = this;
    if(component.state.currentRoomId !== nextState.currentRoomId){
      getTasksByRoom(nextState.currentRoomId, (success,response) => {
        var tempData = []
        if(success && response){ 
          for(var i in response.data.tasks){
            tempData.push(response.data.tasks[i])
          }
        }
        component.setState({
          todoList: tempData
        });
      });
    }
  }

  componentDidMount(){
    $('main.main').removeClass('main-customer');
    var component = this;
    getTasksByRoom(component.state.currentRoomId, (success,response) => {
      var tempData = [];
      if(success && response){ 
        for(var i in response.data.tasks){
          tempData.push(response.data.tasks[i]);
        }
      }
      component.setState({
        todoList: tempData
      });
    });
  }

  componentDidUpdate(){
    this.loadCSS();
  }

  createElementTaskList(e){
    e.preventDefault();
    var data = [];
    var component = this;
    if(this.state.todoList !== null){
      data = this.state.todoList
    }
    if(this.state.currentRoomId){
      var inputValue = document.getElementById('form-input').value;
      if(inputValue === '') {
        NotificationManager.warning(
          translate('app.dashboard.todo_list_warning'));
      }
      else {
        createTask(component.state.currentRoomId, inputValue, (success,response) => {
          if(success && response){
            $('#form-input').val('');
            data.push(response.data.task);
            component.setState({todoList: data});
          } 
        });
      }
    }
  }

  handleClick(ev){
    var component = this;
    var data = this.state.todoList;
    var index = data.indexOf(ev);
    if(data[index]){
      if(data[index].status === 'Doing')
        updateTask(component.state.currentRoomId, ev.id,ev.content,"Done", (success,response) => {
          if(success && response){
              $('#todo-list-ul li').eq(index).removeClass('Doing');
              $('#todo-list-ul li').eq(index).addClass('Done');
              data[index].status = 'Done';
              this.setState({todoList: data});
            }
          });
      else
        updateTask(component.state.currentRoomId, ev.id,ev.content,"Doing", (success,response) => {
          if(success && response){
              $('#todo-list-ul li').eq(index).removeClass('Done');
              $('#todo-list-ul li').eq(index).addClass('Doing');
              data[index].status = 'Doing';
              this.setState({todoList: data});
            }
      });
    }
    return false;
  }

  handleClickDelete(ev){
    var component = this;
    var data = this.state.todoList;
    var index = data.indexOf(ev);
    deleteTask(component.state.currentRoomId, ev.id, (success,response) => {
      if(success && response){
        data.splice(index, 1);
        component.setState({todoList: data});
      } 
    });
    return false;
  }

  loadCSS(){
    var data = this.state.todoList;
    if(data){
      for(var i = 0; i < data.length; i++){
        if(data[i].status === 1) {
          $('#todo-list-ul li').eq(i).addClass('checked')
        }
      }
    }
  }

  renderAddTodoList(){
    if(this.state.currentRoomId){
      return(
        <form className='add-todo-list-form'
          onSubmit={this.createElementTaskList.bind(this)}>
          <input type='text' id='form-input'
            placeholder={translate('app.dashboard.todo_title')}/>
          <button onClick={this.createElementTaskList.bind(this)}
            className='add-btn'>
              {translate('app.dashboard.todo_add')}
          </button>
        </form>
      )   
    }
    else {
      return(
        <div></div>
      )
    }  
  }

  render(){
    return (
      <div className='my-work-with'>
        <h2>
          {translate('app.dashboard.todo_list_with')}
          <div className='user-name'>
            {this.state.targetUser ? this.state.targetUser.displayName : ''}
          </div>
        </h2>
        <div>
          <ul id='todo-list-ul'>
          {
            this.state.targetUser && this.state.todoList !== null ? 
            (
              this.state.todoList.map(task => (
                <li className={task.status}>
                  <span className='task-content' onClick={this.handleClick.bind(this, task)}>{task.content}</span> 
                  <span className='close'
                    onClick={this.handleClickDelete.bind(this, task)}>
                      x
                  </span>
                </li>
              ))
            )
            :
            (
              <div>
              </div>
            )
          }
          </ul>
        </div>
        {this.renderAddTodoList()}
      </div>
    )
  }
}

export default TodoList;
