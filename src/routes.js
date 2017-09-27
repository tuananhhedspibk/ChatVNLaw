import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import UserLogin from './components/user/login';
import UserSignUp from './components/user/signup';
import UserDashBoard from './components/user/dashboard/main';

import ChatView from './components/chat/chatview';

import NotFoundPage from './components/shared/notfound';

const Routes = props => (
  <Router {...props}>
    <Switch>
      <Route path='/lawyers' component={UserDashBoard}/>
      <Route path='/chat/:user_name' component={ChatView}/>
      <Route path='/login' component={UserLogin}/>
      <Route path='/signup' component={UserSignUp}/>
      <Route path='*' component={NotFoundPage}/>
    </Switch>
  </Router>
);

export default Routes;
