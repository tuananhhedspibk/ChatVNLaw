import React from 'react';
import {Router, Route, Redirect} from 'react-router';

import UserLogin from './components/user/login';
import UserSignUp from './components/user/signup';
import UserChat from './components/user/userchat';

import Home from './components/static/home';
import ChatLayout from './components/chat/chatlayout';

const Routes = props => (
  <Router {...props}>
    <Route path='/' component={Home}/>
    <Route path='chat' component={ChatLayout}>
      <Route path=':user_name' component={UserChat}/>
    </Route>
    <Route path='/login' component={UserLogin}/>
    <Route path='/signup' component={UserSignUp}/>
  </Router>
);

export default Routes;
