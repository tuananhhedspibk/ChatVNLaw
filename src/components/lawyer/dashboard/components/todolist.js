import React, {Component} from 'react';
import $ from 'jquery';
import {NotificationManager} from 'react-notifications';
import firebase from 'firebase';

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
      function(currentUser, targetUser,roomId) {
        component.setState({currentUser: currentUser,
          targetUser: targetUser,
          currentRoomId: roomId})      
    });
  }

  componentWillUpdate(nextProps, nextState){
    var component = this;
    if(component.state.currentRoomId !== nextState.currentRoomId){
      firebase.database()
        .ref(`tasks/${component.state.currentUser.uid}/${nextState.currentRoomId}`)
        .once('value', (data) => {
          if(data){
            component.setState({
              todoList: data.val()
            })
          }
          else {
            component.setState({
              todoList: []
            })
          }
      })
    }
  }

  componentDidMount(){
    $('main.main').removeClass('main-customer');
    var component = this;
    if(!!this.state.currentRoomId){
      firebase.database()
        .ref(`tasks/${component.state.currentUser.uid}/${component.state.currentRoomId}`)
        .once('value', (data) => {
          component.setState({
            todoList: data.val()
          })
      })
    }
  }

  componentDidUpdate(){
    this.loadCSS();
  }

  createElementTaskList(e){
    e.preventDefault();
    var TimeCreate = (new Date()).getTime();
    if(this.state.todoList !== null){
      var data = this.state.todoList
    }
    else {
      var data = [];
    }
    if(this.state.currentRoomId){
      var component = this;
      var inputValue = document.getElementById('form-input').value;
      if(inputValue === '') {
        NotificationManager.warning(
          translate('app.dashboard.todo_list_warning'));
      }
      else {
        data.push({'status' : 0,
          'text' : inputValue,
          'target_uid': component.state.targetUser.uid,
          'timecreate': TimeCreate,
          'targetuserdisplayname' :
            component.state.targetUser.displayName })
              component.setState({
                todoList: data
              })
            firebase.database()
              .ref(`tasks/${component.state.currentUser.uid}/${component.state.currentRoomId}`)
              .set(data);
        $('#form-input').val('');
      }
    }
  }

  handleClick(ev){
    var component = this;
    var time = (new Date()).getTime();
    var data = this.state.todoList;
    var index = data.indexOf(ev);
    if(data[index]){
      if(data[index].status === 1){
        $('#todo-list-ul li').eq(index).removeClass('checked')
        data[index].status = 0;
        data[index].TimeCreate = time;
      }
      else {
        $('#todo-list-ul li').eq(index).addClass('checked')
        data[index].status = 1;
        data[index].TimeCreate = time;
      }
      this.setState({
          todoList: data
      })
      firebase.database()
        .ref(`tasks/${component.state.currentUser.uid}/${component.state.currentRoomId}`)
        .set(this.state.todoList);
    }
  }

  handleClickDelete(ev){
    var component = this;
    var data = this.state.todoList;
    var index = data.indexOf(ev);
    data.splice(index, 1);
    this.setState({
        todoList: data
    })
    firebase.database()
      .ref(`tasks/${component.state.currentUser.uid}/${component.state.currentRoomId}`)
      .set(this.state.todoList);
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
              this.state.todoList.map(content => (
                <li onClick={this.handleClick.bind(this, content)}>
                  {content.text}
                  <span className='close'
                    onClick={this.handleClickDelete.bind(this, content)}>
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
