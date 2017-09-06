import React from 'react';
import {Router, Route} from 'react-router';

import UserLogin from './components/user/login';
import UserSignUp from './components/user/signup';
import Home from './components/static/home';

const Routes = props => (
  <Router {...props}>
    <Route path='/' component={Home} />
    <Route path='/login' component={UserLogin}/>
    <Route path='/signup' component={UserSignUp}/>
  </Router>
);

export default Routes;
