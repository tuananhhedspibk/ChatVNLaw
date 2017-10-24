import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import UserLogin from './components/user/login';
import UserSignUp from './components/user/signup';
import UserDashBoard from './components/user/dashboard/main';
// import Home from './components/static/home';
import ChatView from './components/chat/chatview';
import Home from './components/homepage/App';
import Attorney from './components/attorney/Attorney';
import Payment from './components/payments/App';
import CustomerProfile from './components/customer/profile/main'

import NotFoundPage from './components/shared/notfound';

// let targetLocation = window.targetLocation
// let target = targetLocation.target

const Routes = props => (
  <Router {...props}>
    <Switch>
      <Route path='/lawyers' component={UserDashBoard}/>
      <Route path='/chat/:user_name' component={ChatView}/>
      <Route path='/login' render = {(props) => (
        <UserLogin {...props} />
      )}/>
      <Route path='/signup' component={UserSignUp}/>
      <Route path='/attorney' component={Attorney}/>
      <Route path='/payment' component={Payment} />
      <Route path='/home' component={Home}/>
      <Route path='/my-profile' component={CustomerProfile}/>
      <Route path='' component={Home} />
      <Route path='*' component={NotFoundPage}/>
    </Switch>
  </Router>
);


export default Routes;
