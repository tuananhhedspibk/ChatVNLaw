import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Aside from './components/aside';
import Footer from './components/footer';
import DashBoard from './components/dashboard';
import UserInfo from './components/userinfo';
import Note from './components/note';
import Calendar from './components/calendar';
import Breadcrumb from './components/breadcrumb';
import {Container} from 'reactstrap';
import Chat from './components/chat';
import {EventEmitter} from 'fbemitter';

import '../../../assets/styles/dashboard/style.css';
// var emitter = new EventEmitter();
class UserDashBoard extends Component {  
  constructor(props){
    super(props);
    this.emitter = new EventEmitter();
  }

  render() {
    return(
      <div className='app'>
        <Header/>
        <div className='app-body'>
          <Sidebar {...this.props}/>
          <main className='main'>
            <Breadcrumb/>
            <Container fluid>
              <Switch>
                <Route path="/lawyers/userinfo" name="UserInfo"
                  render={(props) => (
                    <UserInfo emitter={this.emitter} {...props} />)} />
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
}

export default UserDashBoard;
