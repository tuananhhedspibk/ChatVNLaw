import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import registerServiceWorker from './registerserviceworker';
import {createBrowserHistory} from 'history';

import * as constant from './components/constants';
import $ from 'jquery';

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

$(window).on("blur focus", function (e) {
  var prevType = $(this).data("prevType");

  if (prevType != e.type) {   //  reduce double fire issues
    switch (e.type) {
      case "blur":
        // $('div').text("Blured");
        localStorage.setItem('isFocused', false);
        if(!!firebase.auth().currentUser){
          firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update({status: 'away'});
        }
        console.log(firebase.auth().currentUser);

        break;
      case "focus":
        // $('div').text("Focused");
        localStorage.setItem('isFocused', true);  
        console.log(firebase.auth().currentUser);
        if (!!firebase.auth().currentUser) {
          firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update({ status: 'online' });
        }
        break;
    }
  }

  $(this).data("prevType", e.type);
})

const history = createBrowserHistory();

ReactDOM.render(<Routes history={history}/>,
  document.getElementById('root'));
registerServiceWorker();
