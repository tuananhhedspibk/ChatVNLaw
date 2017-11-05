import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import {createBrowserHistory} from 'history';

import * as constant from './components/constants';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/common/main.css';

var firebase = require('firebase');

if(!firebase.apps.length){
  firebase.initializeApp(constant.APP_CONFIG);  
}

let translate = require('counterpart');
translate.registerTranslations('en', require('./locales/en'));
translate.registerTranslations('vi', require('./locales/vi'));
translate.registerTranslations('vn', require('./locales/vn'));

if (localStorage.locale == null) {
  localStorage.setItem('locale', 'vi');
  translate.setLocale('vi');
} else {
  translate.setLocale(localStorage.locale);
}

const history = createBrowserHistory();

ReactDOM.render(<Routes history={history}/>,
  document.getElementById('root'));
registerServiceWorker();
