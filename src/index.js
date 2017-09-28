import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import {createBrowserHistory} from 'history';

import './assets/styles/common/main.css';
var key = require('./key.json');
var firebase = require('firebase');
var config = {
  "apiKey": key.apiKey,
  "authDomain": key.authDomain,
  "databaseURL": key.databaseURL,
  "projectId": key.projectId,
  "storageBucket": key.storageBucket,
  "messagingSenderId": key.messagingSenderId
};

firebase.initializeApp(config);

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

