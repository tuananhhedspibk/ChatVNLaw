import React, {Component} from 'react';
import $ from 'jquery';
import * as firebase from 'firebase';

class TodoListLawyer extends Component {
  constructor(props) {
    super(props);
    this.state ={
      todoList :[]
    }
  }

  componentDidMount(){
    var component = this;
    var tempData = [];
    var currentUser = firebase.auth().currentUser.uid;
    $('main.main').removeClass('main-customer');
    firebase.database().ref(`tasks/${currentUser}`).once(
      'value', (data) => {
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
          $('#todo-list-ul li').eq(i).addClass('checked')
        }
      }
    }
  }

  renderTodoList(){
    return(
      this.state.todoList.map((todoList, index) => {
        return(
          <div className='todo-list-lawyer'>
            <button type='button'
              className='btn btn-header-todo-list collapsed'
              data-toggle='collapse' data-target={'#todo-list-lawyer' + index}>
              {todoList[0].targetuserdisplayname}
            </button>
            <div id={'todo-list-lawyer' + index} className='collapse'>
              <ul id='todo-list-ul'>
                {todoList.map(content => (
                  <li className={content.status === 1 ?
                    'checked' : 'uncheck'}>
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

  render(){
    return (
      <div id='todo-list-div' className='header'>
        {this.renderTodoList()}
      </div>
    )
  }
}

export default TodoListLawyer;
