import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {EventEmitter} from 'fbemitter';
import { Scrollbars } from 'react-custom-scrollbars';
import {Container} from 'reactstrap';
import {NotificationContainer} from 'react-notifications';
import $ from 'jquery';
import * as translate from 'counterpart';

import Header from './components/header';
import Sidebar from './components/sidebar';
import DashBoard from './components/dashboard';
import Customer from './components/customer';
import TodoListLawyer from './components/todolistlawyer';
import Calendar from './components/calendar';
import Breadcrumb from './components/breadcrumb';
import SearchTag from './components/searchtag';
import SearchUser from './components/searchuser';
import TodoList from './components/todolist';
import Chat from './components/chat';

import Loading from '../../shared/loading';
import {isLawyer} from '../../../lib/user/lawyers';
import Toast from '../../notification/toast';
import getStunServerList from '../../../lib/getstunserverlist';
import {checkPermission, checkAuthen} from '../../../lib/notification/toast';
import {onAuthStateChanged} from '../../../lib/user/authentication';
import {getUserRoleByUid} from '../../../lib/user/getuserinfo';
import Settings from '../../user/settings';

import * as constant from '../../constants';
import * as tableContant from '../../../lib/constants';

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
      if(user){
        getUserRoleByUid(user.uid, data =>{
          if(data.val() == tableContant.ROLE.lawyer){
            component.setState({currentUser: user})
            component.setState({isLoading: false})                
          }
          else {
            component.setState({isLoading : true})
            checkPermission(component.emitter,
              constant.HOME_URI, () =>{
              
            })
          }
        }) 
      }else{
        component.setState({isLoading : true})
        checkAuthen(component.emitter,constant.HOME_URI
          + constant.SIGN_IN_URI, () =>{

        })
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
        <Header/>
        <div className='app-body'>
          <Sidebar {...this.props}/>
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
                    <Route path='/dashboard/todolistlawyer' name='Todo List Lawyer' 
                      render={(props) => (
                        <TodoListLawyer emitter={this.emitter} {...props} />)}/>
                    <Route path='/dashboard/files-shared' name='Files Shared'
                      render={(props) => (
                        <Customer emitter={this.emitter} {...props} />)}/>
                    <Route path='/dashboard/todos' name='Todo List'
                      render={(props) => (
                        <TodoList emitter={this.emitter} {...props} />)}/>
                    <Route path='/dashboard/search_tag' name='SearchUser'
                      render={(props) => (
                        <SearchTag emitter={this.emitter} {...props} />)}/>
                    <Route path='/dashboard/search_user' name='SearchUser'
                      render={(props) => (
                        <SearchUser emitter={this.emitter} {...props} />)}/>
                    <Route path='/dashboard/dashboard' name='Dashboard'
                      component={DashBoard}/>
                    <Route path='/dashboard/calendar' name='Calendar'
                      component={Calendar}/>
                    <Route path="/dashboard/profile" name="Profile" 
                      component={Settings} />
                  </Switch>
              </Scrollbars>
            </Container>
          </main>
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
