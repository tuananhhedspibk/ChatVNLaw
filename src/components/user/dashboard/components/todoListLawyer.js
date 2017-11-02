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

    componentWillUpdate(nextProps, nextState){
        var component = this;
        console.log(this.state.currentUser)
        if(component.state.currentRoomId !== nextState.currentRoomId){
            firebase.database().ref(`tasks/${nextState.currentRoomId}`).once('value', (data) => {
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
        var component = this;
        console.log('test')

        var currentUser = firebase.auth().currentUser.uid;
        console.log(currentUser)
        // console.log(this.state.currentUser);
        firebase.database().ref(`tasks`).on('child_added', (data) => {
            console.log(data.val())
            // component.setState({
            //     todoList: data.val()
            // })
        })
    }

    // componentDidUpdate(){
    //     this.loadCSS();
    // }

    // createElementTaskList(){
    //     if(this.state.todoList !== null){
    //         var data = this.state.todoList
    //     }
    //     else {
    //         var data = [];
    //     }
    //     if(this.state.currentRoomId){
    //         var component = this;
    //         var inputValue = document.getElementById("myInput").value;
    //         if(inputValue === '') {
    //             alert("You must write something!");
    //         }
    //         else {
    //             data.push({'status' : 0, 'text' : inputValue})
    //             component.setState({
    //                 todoList: data
    //             })
    //             firebase.database().ref(`tasks/${component.state.currentRoomId}`).set(data);
    //         }
    //     }
    // }

    // handleClick(ev){
    //     var data = this.state.todoList;
    //     var index = data.indexOf(ev);
    //     if(data[index]){
    //         if(data[index].status === 1){
    //             $('#myUL li').eq(index).removeClass('checked')
    //             data[index].status = 0
    //         }
    //         else {
    //             $('#myUL li').eq(index).addClass('checked')
    //             data[index].status = 1;
    //         }
    //         this.setState({
    //             todoList: data
    //         })
    //         firebase.database().ref(`tasks/${this.state.currentRoomId}`).set(this.state.todoList);
    //     }
    // }

    // handleClickDelete(ev){
    //     var data = this.state.todoList;
    //     var index = data.indexOf(ev);
    //     data.splice(index, 1)
    //     // data.remove(ev);
    //     this.setState({
    //         todoList: data
    //     })
    //     firebase.database().ref(`tasks/${this.state.currentRoomId}`).set(this.state.todoList);
    // }

    // loadCSS(){
    //     var data = this.state.todoList;
    //     if(data){
    //         for(var i = 0; i < data.length; i++){
    //             if(data[i].status === 1) {
    //                 $('#myUL li').eq(i).addClass('checked')
    //             }
    //         }
    //     }
    // }

    renderAddTodoList(){
        if(this.state.currentRoomId){
            return(
                <div>
                    <h2>My To Do List</h2>
                    <input type="text" id="myInput" placeholder="Title..."/>
                    {<span onClick={this.createElementTaskList.bind(this)} className="addBtn">Add</span>}
                </div>
            )   
        }
        else {
            return(
                <div></div>
            )
        }      
    }

    renderTodoList(){
        var component = this
        if(this.state.currentUser && this.state.targetUser && this.state.todoList !== null){
            return(
                <div>
                    {/* <ul id="myUL">
                    {this.state.todoList.map(content => (
                            <li onClick={this.handleClick.bind(this, content)}>{content.text}<span className='close' onClick={this.handleClickDelete.bind(this, content)}>x</span></li>
                    ))}
                    </ul> */}
                </div>
            )
        }
    }

    render(){
        return (
            <div id="myDIV" className="header">
                {this.renderTodoList()}
            </div>
        )
    }
}

export default TodoListLawyer;