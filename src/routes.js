import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';

import Home from './components/homepage/home';
import UserLogin from './components/user/login';
import UserSignUp from './components/user/signup';

import UserDashBoard from './components/lawyer/dashboard/main';
import Chat from './components/chat/chat';

import Attorney from './components/attorney/attorney';

import SearchLaw from './components/searchlaw/layout';
import Article from './components/law/main';

import Notifications from './components/notification/notifications';
import ApplyLawyer from './components/homepage/applylawyer';

import Settings from './components/user/settings';
import LawyerProfile from './components/lawyer/profile/main';
import CustomerProfile from './components/customer/profile/main';
import PaymentProcess from'./components/payments/paymentProcess';

import NotFoundPage from './components/shared/notfound';

const Routes = props => (
  <Router {...props}>
    <Switch>
      <Route path='/home' component={Home}/>
      <Route path='/login' render = {(props) => (
        <UserLogin {...props} />
      )}/>
      <Route path='/signup' component={UserSignUp}/>
      <Route path='/notifications' component={Notifications}/>
      <Route path='/dashboard' component={UserDashBoard}/>
      <Route path='/chat/:user_name?' component={Chat}/>
      <Route path='/attorney' component={Attorney}/>
      <Route path='/applylawyer/:user_name' component={ApplyLawyer} />
      <Route path='/searchlaw' component={SearchLaw} />
      <Route path='/settings' component={Settings}/>
      <Route path='/lawyers/:user_name' component={LawyerProfile}/>
      <Route path='/customers/:user_name' component={CustomerProfile}/>
      <Route path='/articles/:id' component={Article}/>
      <Route path='/deposit_process' component={PaymentProcess}/>
      <Route exact path='/' render={() => (
        <Redirect to='/home'/>  
      )}/>
      <Route path='/404' component={NotFoundPage}/>
    </Switch>
  </Router>
);


export default Routes;
