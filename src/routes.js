import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';

import Home from './components/homepage/home';
import UserLogin from './components/user/login';
import UserSignUp from './components/user/signup';

import UserDashBoard from './components/lawyer/dashboard/main';
import ChatView from './components/chat/chatview';

import Attorney from './components/attorney/attorney';
import Payment from './components/payments/payment';

import SearchLaw from './components/searchlaw/layout';

import Notifications from './components/notification/notifications';
import ApplyLawyer from './components/homepage/applylawyer';
import SettingsLawyer from './components/lawyer/profile/settings';
import SettingsCustomer from './components/customer/profile/settings';
import LawyerProfile from './components/lawyer/profile/main';
import CustomerProfile from './components/customer/profile/main';

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
      <Route path='/chat/:user_name' component={ChatView}/>
      <Route path='/attorney' component={Attorney}/>
      <Route path='/payment' component={Payment} />
      <Route path='/applylawyer/:user_name' component={ApplyLawyer} />
      <Route path='/searchlaw' component={SearchLaw} />
      <Route path='/settings/lawyers/:user_name' component={SettingsLawyer}/>
      <Route path='/lawyers/:user_name' component={LawyerProfile}/>
      <Route path='/settings/customers/:user_name' component={SettingsCustomer}/>
      <Route path='/customers/:user_name' component={CustomerProfile}/>
      <Route exact path='/' render={() => (
        <Redirect to='/home'/>  
      )}/>
      <Route path='*' component={NotFoundPage}/>
    </Switch>
  </Router>
);


export default Routes;
