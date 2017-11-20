export const STORAGE_ITEM = 'chat_vnlaw_user';

export const BASE_URL = 'http://localhost:3000';
export const HOME_URI = '/home';
export const SIGN_IN_URI = '/login';
export const SIGN_UP_URI = '/signup';
export const CHAT_URI = '/chat';
export const SEARCH_LAW_URI = '/searchlaw';
export const SETTINGS_URI = '/settings';
export const ATTORNEY_URI = '/attorney';
export const CUSTOMER_PROFILE_URI = '/customers';
export const LAWYER_PROFILE_URI = '/lawyers';
export const DASHBOARD_URI = '/dashboard';

export const API_BASE_URL = 'http://localhost:4000/api';
export const API_SEARCH_URI = '/searches';
export const DEFAULT_AVATAR_URL = 'https://image.ibb.co/i23jUF/default_ava.png';

let alertOptions = {
  offset: 14,
  position: 'top right',
  theme: 'dark',
  time: 5000,
  transition: 'scale'
}


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
export const flag = true;

export const avaLawyerPic = require('../assets/images/default-ava-lawyer.png');
export const avaUserPic = require('../assets/images/default-ava-user.png');
export const avaBotPic = require('../assets/images/bot.png');
export const warningPic = require('../assets/images/warning.png');
export const notFoundPic = require('../assets/images/error-img.png');
export const appLogoPic = require('../assets/images/app_logo.png');
export const chatBannerPic = require('../assets/images/onlinechaticon.png');
export const handShakePic = require('../assets/images/handshake.png');
