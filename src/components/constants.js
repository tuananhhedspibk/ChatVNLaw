export const STORAGE_ITEM = "rocket_chat_user";

export const BASE_URL = 'http://localhost:3000';
export const API_BASE_URL = 'http://localhost:4000';

export const HOME_URI = '/home';
export const SIGN_IN_URI = '/login';
export const SIGN_UP_URI = '/signup';
export const CHAT_URI = '/chat';

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

export const API_CHANNELS_ADD_ALL = '/api/v1/channels.addAll';
export const API_CHANNELS_ADD_MODERATOR = '/api/v1/channels.addModerator';
export const API_CHANNELS_ADD_OWNER = '/api/v1/channels.addOwner';
export const API_CHANNELS_ARCHIVE = '/api/v1/channels.archive';
export const API_CHANNELS_CLEAN_HISTORY = '/api/v1/channels.cleanHistory';
export const API_CHANNELS_CLOSE = '/api/v1/channels.close';
export const API_CHANNELS_CREATE = '/api/v1/channels.create';
export const API_CHANNELS_GET_INTEGRATIONS = "/api/v1/channels.getIntegrations";
export const API_CHANNELS_HISTORY = "/api/v1/channels.history";
export const API_CHANNELS_INFO = "/api/v1/channels.info";
export const API_CHANNELS_INVITE = "/api/v1/channels.invite";
export const API_CHANNELS_KICK = "/api/v1/channels.kick";
export const API_CHANNELS_LEAVE = "/api/v1/channels.leave";
export const API_CHANNELS_LIST_JOINED = "/api/v1/channels.list.joined";
export const API_CHANNELS_LIST = "/api/v1/channels.list";
export const API_CHANNELS_OPEN = "/api/v1/channels.open";
export const API_CHANNELS_REMOVE_MODERATOR = "/api/v1/channels.removeModerator";
export const API_CHANNELS_REMOVE_OWNER = "/api/v1/channels.removeOwner";
export const API_CHANNELS_RENAME = "/api/v1/channels.rename";
export const API_CHANNELS_SET_DESCRIPTION = "/api/v1/channels.setDescription";
export const API_CHANNELS_SET_JOIN_CODE = "/api/v1/channels.setJoinCode";
export const API_CHANNELS_SET_PURPOSE = "/api/v1/channels.setPurpose";
export const API_CHANNELS_SET_READ_ONLY = "/api/v1/channels.setReadOnly";
export const API_CHANNELS_SET_TOPIC = "/api/v1/channels.setTopic";
export const API_CHANNELS_SET_TYPE = "/api/v1/channels.setType";
export const API_CHANNELS_UNARCHIVE = "/api/v1/channels.unarchive";

export const API_GROUPS_INFO = "/api/v1/groups.info"
export const API_GROUPS_HISTORY = "/api/v1/groups.history";
export const API_GROUPS_CREATE = '/api/v1/groups.create';

export const API_CHAT_DELETE = "/api/v1/chat.delete";
export const API_CHAT_POST_MESSAGE = "/api/v1/chat.postMessage";

export const API_IM_HISTORY = "/api/v1/im.history";
export const API_IM_OPEN = "/api/v1/im.open";
export const API_IM_CREATE = "/api/v1/im.create";

export const API_ARGUMENT_USERNAME = "username";
export const API_ARGUMENT_PASSWORD = "password";
export const API_ARGUMENT_PASS     = "pass";
export const API_ARGUMENT_EMAIL    = "email";
export const API_ARGUMENT_NAME     = "name";
export const API_ARGUMENT_USERID   = "userId";
export const API_ARGUMENT_FIELDS   = "fields";
export const API_ARGUMENT_QUERY    = "query";
export const API_ARGUMENT_ROOMID   = "roomId";
export const API_ARGUMENT_ACTIVE_USER_ONLY = "activeUsersOnly";
export const API_ARGUMENT_LATEST = "latest";
export const API_ARGUMENT_OLDEST = "oldest";
export const API_ARGUMENT_INCLUSIVE = "inclusive";
export const API_ARGUMENT_MEMBERS = "members";
export const API_ARGUMENT_COUNT = "count";
export const API_ARGUMENT_UNREADS = "unreads";
export const API_ARGUMENT_ROOM_NAME = "roomName";
export const API_ARGUMENT_DESCRIPTION = "description";
export const API_ARGUMENT_JOIN_CODE = "joinCode";
export const API_ARGUMENT_PURPOSE = "purpose";
export const API_ARGUMENT_READ_ONLY = "readOnly";
export const API_ARGUMENT_TOPIC = "topic";
export const API_ARGUMENT_TYPE = "type";
export const API_ARGUMENT_MSGID = "msgId";
export const API_ARGUMENT_AS_USER = "asUser";
export const API_ARGUMENT_CHANNEL = "channel";
export const API_ARGUMENT_TEXT = "text";
export const API_ARGUMENT_ALIAS = "alias";
export const API_ARGUMENT_EMOJI = "emoji";
export const API_ARGUMENT_AVATAR = "avatar";
export const API_ARGUMENT_AVATAR_URL = "avatarUrl";
export const API_ARGUMENT_ATTACHMENTS = "attachments";
export const API_ARGUMENT_IMAGE = "image";
export const DEFAULT_AVATAR_URL = "https://image.ibb.co/i23jUF/default_ava.png";

let logoPicture = require('../assets/images/flat-avatar.png');
let avaUserPic = require('../assets/images/default-ava-user.png');
let avaLawyerPic = require('../assets/images/default-ava-lawyer.png');
let avaBotPic = require('../assets/images/bot.png');

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

export const DEFAULT_ATTACHMENTS = {
  "color": "",
  "text": "",
  "ts": "",
  "thumb_url": "",
  "message_link": "",
  "collapsed": "",
  "author_name":"",
  "author_link":"",
  "author_icon":"",
  "title":"",
  "title_link":"",
  "title_link_download":"",
  "image_url":"",
  "audio_url":"",
  "video_url":"",
  "fields":[]
}
export const DEFAULT_ATTACHMENTS_FIELDS = {
  "short": false,
  "title": "",
  "value": "",
}

export const headers = header;
export const ALERT_OPTIONS = alertOptions;
export const DEFAULT_MY_CHAT_CHANEL = "my.chat";
export const logoPic = logoPicture;
export const avaLawyer = avaLawyerPic;
export const avaUser = avaUserPic;
export const avaBot = avaBotPic;
