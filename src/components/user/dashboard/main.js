import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import DashBoard from './components/dashboard';
import Customer from './components/customer';
import Note from './components/note';
import TodoListLawyer from './components/todoListLawyer';
import Calendar from './components/calendar';
import Breadcrumb from './components/breadcrumb';
import SearchTag from './components/searchtag';
import SearchUser from './components/searchuser';
import TodoList from './components/todoList';
import {Container} from 'reactstrap';
import Chat from './components/chat';
import {EventEmitter} from 'fbemitter';
import * as constant from '../../constants';

import '../../../assets/styles/dashboard/style.css';
import '../../../assets/styles/common/customDashboard.css';
var firebase = require('firebase');

class UserDashBoard extends Component {  
  constructor(props){
    super(props);
    this.state ={
      currentUser: ''
    }
    this.emitter = new EventEmitter();
  }

  componentWillMount(){
    var component = this;
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        component.setState({currentUser: user})  
      }else{
        window.location = constant.BASE_URL + constant.SIGN_IN_URI;
      }
    })
  }

  componentDidMount() {
    document.body.classList.add('chat-section-hidden');
  }

  render() {
    if(this.state.currentUser){
      return(
        <div className='app'>
          <Header/>
          <div className='app-body'>
            <Sidebar {...this.props}/>
            <main className='main'>
              <Breadcrumb/>
              <Container fluid>
                <Switch>
                  <Route path='/lawyers/todolistlawyer' name="Todo List Lawyer" 
                    render={(props) => (
                      <TodoListLawyer emitter={this.emitter} {...props} />)}/>
                  <Route path='/lawyers/files-shared' name="Files Shared"
                    render={(props) => (
                      <Customer emitter={this.emitter} {...props} />)} />
                  <Route path='/lawyers/todos' name='Todo List'
                    render={(props) => (
                      <TodoList emitter={this.emitter} {...props} />)} />
                  <Route path='/lawyers/search_tag' name="SearchUser"
                    render={(props) => (
                      <SearchTag emitter={this.emitter} {...props} />)} />
                  <Route path="/lawyers/search_user" name="SearchUser"
                    render={(props) => (
                      <SearchUser emitter={this.emitter} {...props} />)} />
                  <Route path="/lawyers/dashboard" name="Dashboard"
                    component={DashBoard}/>
                  <Route path="/lawyers/notes" name="Notes"
                    component={Note}/>
                  <Route path="/lawyers/calendar" name="Calendar"
                    component={Calendar}/>
                  <Redirect from="/lawyers" to="/lawyers/dashboard"/>
                </Switch>
              </Container>
            </main>
            <Chat emitter={this.emitter}/>
          </div>
        </div>
      )
    }
    else{
      return (
        <div></div>
      )
    }
  }
}

export default UserDashBoard;