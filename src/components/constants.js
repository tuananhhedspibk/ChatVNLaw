export const STORAGE_ITEM = 'chat_vnlaw_user';

export const APP_NAME = 'VNLaw-Tư vấn pháp luật';
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
export const LAW_URI = '/articles/';

export const API_BASE_URL = 'http://localhost:4000/api';
export const API_SEARCH_ARTICLES_URI = '/search/articles';
export const API_SEARCH_LAWYERS_URI = '/search/lawyers';
export const API_TOP_LAWYERS_URI = '/lawyers/top';
export const API_ALL_LAWYERS_NAME_URI = '/lawyers/names';
export const API_ARTICLES_URI = '/articles';

export const DEFAULT_AVATAR_URL = 'https://image.ibb.co/i23jUF/default_ava.png';

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
export const openIcon = require('../assets/images/open.png');
export const closeIcon = require('../assets/images/close.png');
export const cartIcon = require('../assets/images/cart.png');
export const totalTimeIcon = require('../assets/images/total_time.png');
export const hammerIcon = require('../assets/images/hammer.png');
export const anvilIcon = require('../assets/images/anvil.png');
export const tingIcon = require('../assets/images/ting.png');

export const PEERJS_KEY = 'peerjs';

export const LAW_CATEGORY = [
  { key: 'spy', value: 'Hình Sự', icon: 'spy', text: 'Hình Sự' },
  { key: 'registered', value: 'Sở Hữu Trí Tuệ', icon: 'registered',
    text: 'Sở Hữu Trí Tuệ' },
  { key: 'heart', value: 'Hôn Nhân & Gia Đình', icon: 'heart',
    text: 'Hôn Nhân & Gia Đình' },
  { key: 'building outline', value: 'Nhà Đất - Xây Dựng',
    icon: 'building outline', text: 'Nhà Đất - Xây Dựng' },
  { key: 'payment', value: 'Tài Chính - Ngân Hàng', icon: 'payment',
    text: 'Tài Chính - Ngân Hàng' },
  { key: 'users', value: 'Dân Sự', icon: 'users', text: 'Dân Sự' },
  { key: 'protect', value: 'Lao Động - Bảo Hiểm Xã Hội', icon: 'protect',
    text: 'Lao Động - Bảo Hiểm Xã Hội' },
  { key: 'suitcase', value: 'Doanh Nghiệp', icon: 'suitcase', text: 'Doanh Nghiệp' },
]
