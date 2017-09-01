import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import {browserHistory} from 'react-router';

let translate = require('counterpart');
translate.registerTranslations('en', require('./locales/en'));
translate.registerTranslations('vi', require('./locales/vi'));

if (localStorage.locale == null) {
  localStorage.setItem('locale', 'vi');
  translate.setLocale('vi');
} else {
  translate.setLocale(localStorage.locale);
}

ReactDOM.render(<Routes history={browserHistory}/>,
  document.getElementById('root'));
registerServiceWorker();
