import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

import {EventEmitter} from 'fbemitter';
import firebase from 'firebase';

import Header from './components/header';
import Sidebar from './components/sidebar';
import DashBoard from './components/dashboard';
import Customer from './components/customer';
import Note from './components/note';
import TodoListLawyer from './components/todolistlawyer';
import Calendar from './components/calendar';
import Breadcrumb from './components/breadcrumb';
import SearchTag from './components/searchtag';
import SearchUser from './components/searchuser';
import TodoList from './components/todolist';
import {Container} from 'reactstrap';
import Chat from './components/chat';

import Loading from '../../shared/loading';
import {isLawyer} from '../../../lib/user/lawyers';
import Toast from '../../notification/toast';

import * as constant from '../../constants';

import '../../../assets/styles/dashboard/style.css';
import '../../../assets/styles/common/customDashboard.css';

class UserDashBoard extends Component {  
  constructor(props){
    super(props);
    this.state ={
      currentUser: '',
      isLoading: true
    }
    this.emitter = new EventEmitter();
  }

  componentWillMount(){
    var component = this;
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        firebase.database().ref(`users/${user.uid}/role`).once('value', data => {
          if(data.val() == 'lawyer'){
            component.setState({currentUser: user})
          }
          else {
            window.location = constant.BASE_URL
          }
        }) 
      }else{
        window.location = constant.BASE_URL + constant.SIGN_IN_URI;
      }
    })
  }
  componentWillUpdate(nextProps, nextState){
    var component = this;
    if(this.state.currentUser !== nextState.currentUser){
      isLawyer(nextState.currentUser.uid, (issuccess) =>{
        if(issuccess){
          component.setState({isLoading: false})
        }else{
          window.location = constant.BASE_URL;
        }
      })
    }
  }
  componentDidMount() {
    document.body.classList.add('chat-section-hidden');
  }

  renderView() {
    if(this.state.currentUser){
      return(
        <div className='app'>
          <Toast />
          <Header/>
          <div className='app-body'>
            <Sidebar {...this.props}/>
            <main className='main'>
              <Breadcrumb/>
              <Container fluid>
                <Switch>
                  <Route path='/dashboard/todolistlawyer' name="Todo List Lawyer" 
                    render={(props) => (
                      <TodoListLawyer emitter={this.emitter} {...props} />)}/>
                  <Route path='/dashboard/files-shared' name="Files Shared"
                    render={(props) => (
                      <Customer emitter={this.emitter} {...props} />)} />
                  <Route path='/dashboard/todos' name='Todo List'
                    render={(props) => (
                      <TodoList emitter={this.emitter} {...props} />)} />
                  <Route path='/dashboard/search_tag' name="SearchUser"
                    render={(props) => (
                      <SearchTag emitter={this.emitter} {...props} />)} />
                  <Route path="/dashboard/search_user" name="SearchUser"
                    render={(props) => (
                      <SearchUser emitter={this.emitter} {...props} />)} />
                  <Route path="/dashboard/dashboard" name="Dashboard"
                    component={DashBoard}/>
                  <Route path="/dashboard/notes" name="Notes"
                    component={Note}/>
                  <Route path="/dashboard/calendar" name="Calendar"
                    component={Calendar}/>
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
        <Loading />
      )
    }
  }
  render(){
    if(this.state.isLoading){
      return (
        <Loading />
      )
    }else{
      return(
        <div>
          {this.renderView()}
        </div>
      )
    }
  }
}

export default UserDashBoard;