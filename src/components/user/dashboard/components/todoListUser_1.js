import React, {Component} from 'react';
import $ from 'jquery';
import * as firebase from 'firebase';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state ={
            todoList :[],
            currentUser: null,
            targetUser: null,
        }
    }

    componentWillMount(){
        var component = this;
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                component.setState({currentUser: user});
                console.log(component.state.currentUser);
                firebase.database().ref(`tasks/${component.state.currentUser.uid}`).once('value', (data) => {
                    if(data) {
                        component.state.todoList = data.val();
                        component.loadElementTaskList();
                    }
                })
            }
        })
    }

    loadElementTaskList(){
        var component = this;
        for(let val of component.state.todoList){
            var li = document.createElement("li");
            var inputValue = val.text;
            var t = document.createTextNode(inputValue);
            if(val.status === 1){
                li.classList.toggle('checked');
            }
            li.appendChild(t);
            li.addEventListener('click', function(ev) {
                if (ev.target.tagName === 'LI') {
                    console.log('li');
                    ev.target.classList.toggle('checked');
                    var index = $( "#myUL li" ).index(ev.target);
                    if(component.state.todoList[index].status === 0) {
                        component.state.todoList[index].status = 1;
                        console.log('status = 0')
                        console.log(component.state.todoList);
                    }
                    else {
                        component.state.todoList[index].status = 0;
                        console.log('status = 1')
                        console.log(component.state.todoList);
                    }
                    firebase.database().ref(`tasks/${component.state.currentUser.uid}`).set(component.state.todoList);
                }
              }, false);
            document.getElementById("myUL").appendChild(li);
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            var close = document.getElementsByClassName("close");
            span.appendChild(txt);
            li.appendChild(span);
            for (var i = 0; i < close.length; i++) {
              close[i].onclick = function() {
                var div = this.parentElement;
                div.style.display = "none";
                var index = $( "#myUL li" ).index(div);
                component.state.todoList.splice(index,1);
                console.log(component.state.todoList);
                firebase.database().ref(`tasks/${component.state.currentUser.uid}`).set(component.state.todoList);
              }
            }
        }
    }

    createElementTaskList(){
        var component  = this;
        var content = [];
        var li = document.createElement("li");
        var inputValue = document.getElementById("myInput").value;
        component.state.todoList.push({'status': 0, 'text': inputValue});
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        li.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'LI') {
              ev.target.classList.toggle('checked');
            }
          }, false);
        if (inputValue === '') {
          alert("You must write something!");
        } else {
          document.getElementById("myUL").appendChild(li);
        }
        firebase.database().ref(`tasks/${component.state.currentUser.uid}`).set(component.state.todoList);
        console.log('add element')
        console.log(component.state.todoList);
        document.getElementById("myInput").value = "";
      
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        var close = document.getElementsByClassName("close");
        span.appendChild(txt);
        li.appendChild(span);
      
        for (var i = 0; i < close.length; i++) {
          close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
          }
        }
    }

    render(){
        return (
           <div>
               <div id="myDIV" className="header">
                    <h2>My To Do List</h2>
                    <input type="text" id="myInput" placeholder="Title..."/>
                    <span onClick={this.createElementTaskList.bind(this)} className="addBtn">Add</span>
                </div>
                
                <ul id="myUL">
                </ul>
            </div>
        )
    }
}
export default TodoList;
