import React, {Component} from 'react';
import $ from 'jquery';
import * as firebase from 'firebase';


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
        this.props.emitter.emit('ReSendData', function(currentUser, targetUser, roomId){
          component.setState({currentUser: currentUser,targetUser: targetUser,currentRoomId: roomId})    
        });
        this.props.emitter.addListener('RoomChatHasChanged', function(currentUser, targetUser,roomId) {
          component.setState({currentUser: currentUser,targetUser: targetUser,currentRoomId: roomId})
        });
    }

    componentDidMount(){
        var component = this;
        var tempData = [];
        var currentUser = firebase.auth().currentUser.uid;
        firebase.database().ref(`tasks/${currentUser}`).once('value', (data) => {
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

    renderTodoList(){
        var component = this;
        if(component.state.todoList.length > 0){
          return(
              component.state.todoList.map((todoList, index) => {
                  return(
                      <div>
                          <button type="button" className="btn btn-info todo-list-lawyer" data-toggle="collapse" data-target={"#todo-list-lawyer" + index}>{todoList[0].targetuserdisplayname}</button>
                          <div id={"todo-list-lawyer" + index} class="collapse">
                          <ul id="myUL">
                              {todoList.map(content => (
                                  <li className={content.status ===1? 'checked' : 'uncheck'}>{content.text}</li>
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
            <div>
              Bạn chưa có công việc nào cần thực hiện !
            </div>
          )
        }
    }

    render(){
        var component = this
        return (
          <div id="myDIV" className="header">
              {component.renderTodoList()}
          </div>
        )
    }
}

export default TodoListLawyer;