import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { EventEmitter } from 'fbemitter';
import { Scrollbars } from 'react-custom-scrollbars';
import { Container } from 'reactstrap';
import $ from 'jquery';

import Header from './components/header';
import Sidebar from './components/sidebar';
import Customer from './components/customer';
import TodoListLawyer from './components/todolistlawyer';
import Calendar from './components/calendar';
import Breadcrumb from './components/breadcrumb';
import SearchTag from './components/searchtag';
import SearchUser from './components/searchuser';
import TodoList from './components/todolist';
import Chat from './components/chat';

import Loading from '../../shared/loading';
import Toast from '../../notification/toast';
import { checkPermission, checkAuthen } from '../../../lib/notification/toast';
import { onAuthStateChanged } from '../../../lib/user/authentication';
import  { getUserRoleByUid } from '../../../lib/user/getuserinfo';
import Settings from '../../user/settings';

import * as constant from '../../constants';

import '../../../assets/styles/dashboard/style.css';
import '../../../assets/styles/common/customDashboard.css';

class UserDashBoard extends Component {  
  constructor(props){
    super(props);
    this.state ={
      currentUser: '',
      isLoading: true,
      mainDashboardHeight: 0
    }
    this.emitter = new EventEmitter();
  }

  componentWillMount(){
    var component = this;
    onAuthStateChanged(user =>{
      if (user) {
        if(localStorage.chat_vnlaw_user){
          getUserRoleByUid( data =>{
            if(data === 'Lawyer'){
              var currentUser = {
                avatar: JSON.parse(localStorage.chat_vnlaw_user)['avatar'],
                displayName: JSON.parse(localStorage.chat_vnlaw_user)['displayName'],
                email: JSON.parse(localStorage.chat_vnlaw_user)['email'],
                uid: JSON.parse(localStorage.chat_vnlaw_user)['id'],
                lawyer_id: JSON.parse(localStorage.chat_vnlaw_user)['lawyer_id'],
                userName: JSON.parse(localStorage.chat_vnlaw_user)['userName']
              }
              component.setState({currentUser: currentUser});
              component.setState({isLoading: false});             
            }
            else {
              component.setState({isLoading : true});
              checkPermission(component.emitter,
                constant.HOME_URI, () =>{
                
                })
            }
          }) 
        }
        else{
          component.setState({isLoading : true});
          localStorage.setItem('redirect_uri', constant.DASHBOARD_URI);
          checkAuthen(component.emitter, constant.SIGN_IN_URI,
            () =>{});
        }
      }
      else {
        component.setState({isLoading : true});
        localStorage.setItem('redirect_uri', constant.DASHBOARD_URI);
        checkAuthen(component.emitter, constant.SIGN_IN_URI,
          () =>{});
      }
    })
  }

  setHeight(component) {
    var vh = Math.max(document.documentElement.clientHeight,
      window.innerHeight || 0);
    component.setState({mainDashboardHeight: vh - 132});
  }

  componentDidMount() {
    var component = this;
    document.body.classList.add('chat-section-hidden');
    this.setHeight(this);
    $(window).resize(function() {
      component.setHeight(component);
    });
  }

  renderView() {
    return(
      <div className='app'>
        <Header currentUser={this.state.currentUser}/>
        <div className='app-body'>
          <Sidebar {...this.props} currentUser={this.state.currentUser}/>
          <main className='main'>
            <Breadcrumb/>
            <Container fluid>
              <Scrollbars
                style={{
                height: this.state.mainDashboardHeight}}
                autoHide={true}
                autoHideTimeout={1500}
                thumbSize={100}
                hideTracksWhenNotNeeded={true}
                renderView={
                  props =>
                  <div {...props} className='custom-content'/>
                }>
                  <Switch>
                    <Route path={constant.DASHBOARD_URI + constant.TODO_LIST_LAWYER_URI}
                      name='Todo List Lawyer' 
                      render={(props) => (
                        <TodoListLawyer currentUser = {this.state.currentUser}
                          emitter={this.emitter} {...props} />)}/>
                    <Route path={constant.DASHBOARD_URI + constant.FILE_SHARED_URI}
                      name='Files Shared'
                      render={(props) => (
                        <Customer emitter={this.emitter} {...props} />)}/>
                    <Route path={constant.DASHBOARD_URI + constant.TODO_LAWYER_URI}
                      name='Todo List'
                      render={(props) => (
                        <TodoList emitter={this.emitter} {...props} />)}/>
                    <Route path={constant.DASHBOARD_URI + constant.SEARCH_TAG_DASH_URI}
                      name='SearchTag'
                      render={(props) => (
                        <SearchTag emitter={this.emitter} {...props} />)}/>
                    <Route path={constant.DASHBOARD_URI + constant.SEARCH_USER_DASH_URI}
                      name='SearchUser'
                      render={(props) => (
                        <SearchUser emitter={this.emitter} {...props} />)}/>
                    <Route path={constant.DASHBOARD_URI + constant.CALENDAR_URI}
                      name='Calendar'
                      component={Calendar}/>
                    <Route path={constant.DASHBOARD_URI + constant.PROFILE_DASH_URI}
                      name='Profile' 
                      component={Settings} />
                  </Switch>
              </Scrollbars>
            </Container>
          </main>
          <Toast emitter = {this.emitter}/>
          <Chat emitter={this.emitter}
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
