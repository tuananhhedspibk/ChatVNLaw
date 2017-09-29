export const STORAGE_ITEM = "rocket_chat_user";

export const BASE_URL = 'http://localhost:3000';

export const HOME_URI = '/home';
export const SIGN_IN_URI = '/login';
export const SIGN_UP_URI = '/signup';
export const CHAT_URI = '/chat';

export const DEFAULT_AVATAR_URL = "https://image.ibb.co/i23jUF/default_ava.png";

let logoPicture = require('../assets/images/flat-avatar.png');
let avaUserPic = require('../assets/images/default-ava-user.png');
let avaLawyerPic = require('../assets/images/default-ava-lawyer.png');
let avaBotPic = require('../assets/images/bot.png');
let warningPic = require('../assets/images/warning.png');
let notFoundPic = require('../assets/images/error-img.png');

let alertOptions = {
  offset: 14,
  position: 'top right',
  theme: 'dark',
  time: 5000,
  transition: 'scale'
}

let config = {
  "apiKey": "AIzaSyBMem-ZKdVhPS2uwB3gXLPtD1YdQQthDK0",
  "authDomain": "lkbc-chat.firebaseapp.com",
  "databaseURL": "https://lkbc-chat.firebaseio.com",
  "projectId": "lkbc-chat",
  "storageBucket": "lkbc-chat.appspot.com",
  "messagingSenderId": "846136360643"
}
export const ROOM_FILES = 'room_files';
 
export const APP_CONFIG = config;
export const ALERT_OPTIONS = alertOptions;
export const logoPic = logoPicture;
export const avaLawyer = avaLawyerPic;
export const avaUser = avaUserPic;
export const avaBot = avaBotPic;
export const warning = warningPic;
export const notFound = notFoundPic;

