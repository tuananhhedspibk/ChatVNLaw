import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';

import UserLogin from './components/user/login';
import UserSignUp from './components/user/signup';
import UserDashBoard from './components/user/dashboard/main';
import ChatView from './components/chat/chatview';
import Home from './components/homepage/home';
import Attorney from './components/attorney/Attorney';
import Payment from './components/payments/payMent';
import CustomerProfile from './components/customer/profile/main'
import SearchLaw from './components/search_law/layout'
import NotFoundPage from './components/shared/notfound';
import ApplyLawyer from './components/homepage/applyLawyer'
import LawyerProfile from './components/lawyer/main'

const Routes = props => (
  <Router {...props}>
    <Switch>
      <Route path='/dashboard' component={UserDashBoard}/>
      <Route path='/chat/:user_name' component={ChatView}/>
      <Route path='/login' render = {(props) => (
        <UserLogin {...props} />
      )}/>
      <Route path='/signup' component={UserSignUp}/>
      <Route path='/attorney' component={Attorney}/>
      <Route path='/payment' component={Payment} />
      <Route path='/applylawyer/:uid' component={ApplyLawyer} />
      <Route path='/home' component={Home}/>
      <Route path='' component={Home} />
      <Route path='/lawyers/:user_name' component={LawyerProfile}/>
      <Route path='/my-profile' component={CustomerProfile}/>
      <Route path='/search-law' component={SearchLaw} />
      <Route exact path='/' render={() => (
        <Redirect to='/home'/>
      )}/>
      <Route path='*' component={NotFoundPage}/>
      <Route path='' component={Home}/>
    </Switch>
  </Router>
);


export default Routes;
