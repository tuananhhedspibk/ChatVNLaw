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
export const LAW_URI = '/articles/'
export const PROFILE_URI = '/my-profile';
export const LAWYER_URI = '/lawyer';

export const API_BASE_URL = 'http://localhost:4000/api';
export const API_SEARCH_URI = '/searches';
export const API_ARTICLES_URI = '/articles';

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
export const handShakePic = require('../assets/images/handshake.png');
export const offStickyPic = require('../assets/images/sticky_off.png');
export const onStickyPic = require('../assets/images/sticky_on.png');
export const pencilCursorPic = require('../assets/images/pencil_cursor.png');
export const openIcon = require('../assets/images/open.png')
export const closeIcon = require('../assets/images/close.png')
export const cartIcon = require('../assets/images/cart.png')
export const totalTimeIcon = require('../assets/images/total_time.png')

export const PEERJS_KEY = 'peerjs';

export const LAW_CATEGORY = [
  { key: 'heart', value: 'heart', icon: 'heart', text: 'Hôn Nhân & Gia Đình' },
  { key: 'spy', value: 'spy', icon: 'spy', text: 'Hình Sự' },
  { key: 'registered', value: 'registered', icon: 'registered', text: 'Sở Hữu Trí Tuệ' },
  { key: 'building outline', value: 'building outline', icon: 'building outline', text: 'Nhà Đất - Xây Dựng' },
  { key: 'payment', value: 'payment', icon: 'payment', text: 'Tài Chính - Ngân Hàng' },
  { key: 'users', value: 'users', icon: 'users', text: 'Dân Sự' },
  { key: 'protect', value: 'protect', icon: 'protect', text: 'Lao Động - Bảo Hiểm Xã Hội' },
  { key: 'ax', value: 'ax', icon: 'ax', text: 'Doanh Nghiệp' },
  { key: 'ax', value: 'ax', icon: 'ax', text: 'Hộ Tịch - Tư Pháp' },
  { key: 'ax', value: 'ax', icon: 'ax', text: 'Di Chúc - Thừa Kế' },
  { key: 'trademark', value: 'trademark', icon: 'trademark', text: 'Cạnh Tranh' },
  { key: 'ax', value: 'ax', icon: 'ax', text: 'Đầu Tư' },
  { key: 'world', value: 'world', icon: 'world', text: 'Quốc Tế' },
  { key: 'money', value: 'money', icon: 'money', text: 'Kế Toán - Thuế' },
  { key: 'ax', value: 'ax', icon: 'ax', text: 'Môi Trường' },
  { key: 'ax', value: 'ax', icon: 'ax', text: 'Hành Chính' },
  { key: 'ax', value: 'ax', icon: 'ax', text: 'Bất Động Sản' }
]