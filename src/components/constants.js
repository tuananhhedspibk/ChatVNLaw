export const STORAGE_ITEM = 'chat_vnlaw_user';

export const BASE_URL = 'http://localhost:3000';
export const HOME_URI = '/home';
export const SIGN_IN_URI = '/login';
export const SIGN_UP_URI = '/signup';
export const CHAT_URI = '/chat';
export const SEARCH_LAW_URI = '/search-law';

export const API_BASE_URL = 'http://localhost:4000/api';
export const API_SEARCH_URI = '/searches';

export const DEFAULT_AVATAR_URL = 'https://image.ibb.co/i23jUF/default_ava.png';

let logo = require('../assets/images/flat-avatar.png');
let avaUser = require('../assets/images/default-ava-user.png');
let avaLawyer = require('../assets/images/default-ava-lawyer.png');
let avaBot = require('../assets/images/bot.png');
let warning = require('../assets/images/warning.png');
let notFound = require('../assets/images/error-img.png');
let logohome = require('../assets/images/logo.png');
let findLogo = require('../assets/images/home_pic_1.png');
let scheduleLogo = require('../assets/images/home_pic_2.png');
let connectLogo = require('../assets/images/home_pic_3.png');

let alertOptions = {
  offset: 14,
  position: 'top right',
  theme: 'dark',
  time: 5000,
  transition: 'scale'
}

let Flag = true;

let config = {
  'apiKey': 'AIzaSyBMem-ZKdVhPS2uwB3gXLPtD1YdQQthDK0',
  'authDomain': 'lkbc-chat.firebaseapp.com',
  'databaseURL': 'https://lkbc-chat.firebaseio.com',
  'projectId': 'lkbc-chat',
  'storageBucket': 'lkbc-chat.appspot.com',
  'messagingSenderId': '846136360643'
}

export const ROOM_FILES = 'room_files';
export const STUN_SERVER_LIST = 'stun_server_list'; 
export const APP_CONFIG = config;
export const ALERT_OPTIONS = alertOptions;
export const flag = Flag;

export const avaLawyerPic = avaLawyer;
export const avaUserPic = avaUser;
export const avaBotPic = avaBot;
export const warningPic = warning;
export const notFoundPic = notFound;
export const logoPic = logo;
export const connectLogoPic = connectLogo;
export const findLogoPic = findLogo;
export const scheduleLogoPic = scheduleLogo;
