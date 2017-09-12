import React from 'react';
import {Router, Route} from 'react-router';

import UserLogin from './components/user/login';
import UserSignUp from './components/user/signup';
import ChatView from './components/chat/chatview';

import Home from './components/static/home';

const Routes = props => (
  <Router {...props}>
    <Route path='/' component={Home}/>
    <Route path='chat/:user_name' component={ChatView}/>
    <Route path='/login' component={UserLogin}/>
    <Route path='/signup' component={UserSignUp}/>
  </Router>
);

export default Routes;
