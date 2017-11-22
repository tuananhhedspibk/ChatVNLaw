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
import getStunServerList from '../../../lib/getstunserverlist';

import * as constant from '../../constants';
import * as Peer from 'peerjs';
import * as translate from 'counterpart';

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
    this.peer=null;
  }

  componentWillMount(){
    var component = this;
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        firebase.database().ref(`users/${user.uid}/role`).on('value', data => {
          if(data.val() == 'lawyer'){
            component.setState({currentUser: user})
            getStunServerList(() =>{
              var stunServer = JSON.parse(localStorage.stun_server_list);      
              // component.peer = Peer(nextState.currentUser.uid,{key: constant.PEERJS_KEY, config: stunServer})
              do{
                component.peer = new  Peer(user.uid,{key: constant.PEERJS_KEY,host: 'vnlaw-peerjs.herokuapp.com',secure:true,port: 443, config: stunServer}); 
                if(!!component.peer.id){
                  component.setState({isLoading: false})                
                }
                console.log(component.peer);
              }while(!!!(component.peer.id));
            })
          }
          else {
            component.setState({isLoading : true})
            component.emitter.emit('AddNewErrorToast',
            translate('app.system_notice.permission_denied.title'),
            translate('app.system_notice.permission_denied.text'),
              5000, () => {
              window.location = constant.HOME_URI;
            })
            setTimeout(() => {
              window.location = constant.HOME_URI;
            },5000);
          }
        }) 
      }else{
        component.setState({isLoading : true})
        component.emitter.emit('AddNewErrorToast',
        translate('app.system_notice.unauthenticated.title'),
        translate('app.system_notice.unauthenticated.text'),
        5000, () => {
          window.location = constant.HOME_URI+constant.SIGN_IN_URI;
        })
        setTimeout(() => {
          window.location = constant.HOME_URI+constant.SIGN_IN_URI;
        },5000);
      }
    })
  }
  // componentWillUpdate(nextProps, nextState){
  //   var component = this;
  //   if(this.state.currentUser !== nextState.currentUser){
      
  //   }
  // }
  componentDidMount() {
    document.body.classList.add('chat-section-hidden');
  }

  renderView() {
    return(
      <div className='app'>
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
          <Chat emitter={this.emitter}
                peer={this.peer}
                currentUser={this.state.currentUser}/>
        </div>
      </div>
    )
  }
  renderMain(){
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
  render(){
    return(
      <div>
        <Toast emitter={this.emitter} />
        {this.renderMain()}
      </div>
    )
  }
}

export default UserDashBoard;