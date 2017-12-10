import React, { Component } from 'react';
import $ from 'jquery';
import firebase from 'firebase';

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
    this.props.emitter.emit('ReSendData', function(currentUser,
      targetUser, roomId){
        component.setState({currentUser: currentUser,
          targetUser: targetUser,currentRoomId: roomId})    
    });
    this.props.emitter.addListener('RoomChatHasChanged',
      function(currentUser, targetUser, roomId) {
        component.setState({currentUser: currentUser,
          targetUser: targetUser, currentRoomId: roomId})
    });
  }

  componentWillUpdate(nextProps, nextState){
    var component = this;
    if(component.state.currentRoomId !== nextState.currentRoomId){
      firebase.database().ref(`tasks/${nextState.currentRoomId}`)
        .once('value', (data) => {
          if(data){
            component.setState({
              todoList: data.val()
            })
          }
          else {
            component.setState({
              todoList: []
            });
          }
      })
    }
  }

  componentDidMount(){
    var component = this;
    var tempData = [];
    var currentUser = firebase.auth().currentUser.uid;
    firebase.database().ref(`tasks/${currentUser}`)
      .once('value', (data) => {
        if(data){
          for(var i in data.val()){
            tempData.push(data.val()[i])
          }
        }
        component.setState({
          todoList: tempData
        })
    })
  }

  loadCSS(){
    var data = this.state.todoList;
    if(data){
      for(var i = 0; i < data.length; i++){
        if(data[i].status === 1) {
          $('#list-works li').eq(i).addClass('checked')
        }
      }
    }
  }

  renderTodoList(){
    var component = this;
    if(component.state.todoList){
      return(
        component.state.todoList.map((todoList, index) => {
          return(
            <div className='todo-list-lawyer'>
              <button
                className='btn btn-info'
                data-toggle='collapse' data-target={'#todo-list-lawyer' + index}>
                {todoList[0].targetuserdisplayname}
              </button>
              <div id={'todo-list-lawyer' + index} className='collapse'>
                <ul id='list-works'>
                  {todoList.map(content => (
                    <li className={content.status
                      === 1 ? 'checked' : 'uncheck'}>
                        {content.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })
      )
    } 
  }

  render(){
    var component = this
    return (
      component.renderTodoList()
    )
  }
}

export default TodoListLawyer;
