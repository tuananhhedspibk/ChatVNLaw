import React from 'react';
import {Router, Route} from 'react-router';
import UserLogin from './components/user/login';
import Home from './components/static/home';

const Routes = props => (
  <Router {...props}>
    <Route path='/' component={Home} />
    <Route path='/login' component={UserLogin}/>
  </Router>
);

export default Routes;
