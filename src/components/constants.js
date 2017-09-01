export const BASE_URL = 'http://localhost:8000';
export const API_BASE_URL = 'http://localhost:3000';
export const SIGN_IN_URI = '/login';
export const HOME_URI = '/home';
export const API_SIGN_IN = '/api/v1/login';
export const API_SIGN_OUT = '/api/v1/logout';
export const API_USER_INFO = '/api/v1/users.info';

let alertOptions = {
  offset: 14,
  position: 'top right',
  theme: 'dark',
  time: 5000,
  transition: 'scale'
}

let header = {};

if(localStorage.rocket_chat_user != null) {
  header = {
    headers: {
      'X-Auth-Token': JSON.parse(localStorage.rocket_chat_user).auth_token,
      'X-User-Id': JSON.parse(localStorage.rocket_chat_user).user_id
    }
  }
}

export const headers = header;
export const ALERT_OPTIONS = alertOptions;
