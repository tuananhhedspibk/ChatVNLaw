export const STORAGE_ITEM = "rocket_chat_user";

export const BASE_URL = 'http://localhost:8000';
export const API_BASE_URL = 'http://localhost:4000';
export const SIGN_IN_URI = '/login';
export const HOME_URI = '/home';
export const BASE_URL = 'http://localhost:8000';
export const API_BASE_URL = 'http://localhost:4000';

// API URL
// Authentication
export const API_LOGIN_URL = '/api/v1/login';
export const API_LOGOUT_URL = '/api/v1/logout';
export const API_ME_URL = '/api/v1/me';
// User
export const API_USER_CREATE_URL = '/api/v1/users.create';
export const API_USER_CREATE_TOKEN_URL = '/api/v1/users.createToken';
export const API_USER_DELETE_URL ='/api/v1/users.delete';
export const API_User_GET_AVATAR_URL = '/api/v1/users.getAvatar';
export const API_USER_GET_PRESENCE_URL = '/api/v1/users.getPresence';
export const API_USER_INFORMATION_URL = '/api/v1/users.info';
export const API_USER_LIST = '/api/v1/users.list';
export const API_USER_REGISTER_URL = '/api/v1/users.register';
export const API_USER_RESET_AVATAR_URL = '/api/v1/users.resetAvatar';
export const API_USER_SET_AVATAR_URL = '/api/v1/users.setAvatar';
export const API_USER_UPDATE_URL = '/api/v1/users.update';

// API ARGUMENT
// Authentication
export const API_ARGUMENT_USERNAME = "username";
export const API_ARGUMENT_PASSWORD = "password";
export const API_ARGUMENT_PASS     = "pass";
export const API_ARGUMENT_EMAIL    = "email";
export const API_ARGUMENT_NAME     = "name";

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
