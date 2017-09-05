export const STORAGE_ITEM = "rocket_chat_user";

export const BASE_URL = 'http://localhost:3000';
export const API_BASE_URL = 'http://localhost:4000';

export const HOME_URI = '/home';
export const SIGN_IN_URI = '/login';
export const SIGN_UP_URI = '/signup';

export const API_LOGIN_URL = '/api/v1/login';
export const API_LOGOUT_URL = '/api/v1/logout';
export const API_ME_URL = '/api/v1/me';

export const API_USER_CREATE_URL = '/api/v1/users.create';
export const API_USER_CREATE_TOKEN_URL = '/api/v1/users.createToken';
export const API_USER_DELETE_URL ='/api/v1/users.delete';
export const API_USER_GET_AVATAR_URL = '/api/v1/users.getAvatar';
export const API_USER_GET_PRESENCE_URL = '/api/v1/users.getPresence';
export const API_USER_INFORMATION_URL = '/api/v1/users.info';
export const API_USER_LIST = '/api/v1/users.list';
export const API_USER_REGISTER_URL = '/api/v1/users.register';
export const API_USER_RESET_AVATAR_URL = '/api/v1/users.resetAvatar';
export const API_USER_SET_AVATAR_URL = '/api/v1/users.setAvatar';
export const API_USER_UPDATE_URL = '/api/v1/users.update';

export const API_ARGUMENT_USERNAME = "username";
export const API_ARGUMENT_PASSWORD = "password";
export const API_ARGUMENT_PASS     = "pass";
export const API_ARGUMENT_EMAIL    = "email";
export const API_ARGUMENT_NAME     = "name";
export const API_ARGUMENT_USERID   = "userId";
export const API_ARGUMENT_FIELDS   = "fields";
export const API_ARGUMENT_QUERY    = "query";

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
    'X-Auth-Token': JSON.parse(localStorage.rocket_chat_user).auth_token,
    'X-User-Id': JSON.parse(localStorage.rocket_chat_user).user_id
  }
}

export const DEFAULT_FIELDS = {
  avatarOrigin: 0,
  emails: 0,
  phone: 0,
  statusConnection: 0,
  createdAt: 0,
  lastLogin: 0,
  services: 0,
  requirePasswordChange: 0,
  requirePasswordChangeReason: 0,
  roles: 0,
  statusDefault: 0,
  _updatedAt: 0,
  customFields: 0
}

export const DEFAULT_QUERY = {
  _id: [],
	type: [],
	status: [],
	active: [],
	name: [],
	roles: [],
	statusConnection: [],
  username: [],
  "emails.address" : []
}

export const DEFAULT_DATA = {
  "data.email": "",
  "data.name": "",
  "data.password": "",
  "data.username": "",
  "data.active": true,
  "data.roles": ['user'],
  "data.joinDefaultChannels": true,
  "data.requirePasswordChange": false,
  "data.sendWelcomeEmail": false,
  "data.verified": false,
  "data.customFields": "undefined"
}
export const headers = header;
export const ALERT_OPTIONS = alertOptions;
