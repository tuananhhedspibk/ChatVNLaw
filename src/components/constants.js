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
export const TODO_LIST_LAWYER_URI = '/todolistlawyer';
export const FILE_SHARED_URI = '/files-shared';
export const TODO_LAWYER_URI = '/todos';
export const SEARCH_TAG_DASH_URI = '/search_tag';
export const SEARCH_USER_DASH_URI = '/search_user';
export const CALENDAR_URI = '/calendar';
export const LAW_URI = '/articles/';
export const PROFILE_DASH_URI = '/profile';
export const APPLY_LAWYER_URI = '/applylawyer/';
export const NF_URI = '/404';

export const API_BASE_URL = 'http://localhost:4000';
export const API_SEARCH_ARTICLES_URI = '/api/search/articles';
export const API_SEARCH_LAWYERS_URI = '/api/search/lawyers';
export const API_TOP_LAWYERS_URI = '/api/search/top_lawyers';
export const API_ALL_LAWYERS_NAME_URI = '/api/search/lawyers_names';
export const API_ARTICLES_URI = '/api/articles';
export const API_LOGIN_URI = '/api/login';
export const API_SIGNUP_URI = '/api/signup';
export const API_LOGOUT_URI = '/api/logout';
export const API_USERS_URI = '/api/users/';
export const API_ROOMS_URI = '/api/rooms/';
export const API_LAWYERS_URI = '/api/lawyers/';
export const API_REVIEWS_URI = '/api/reviews/';
export const API_TASKS_URI = '/api/tasks/';
export const API_USER_NAME_URI = '/api/user_name/';
export const API_SPE_URI = '/api/lawyer_specializes';
export const API_ROOM_FILES_URI = '/room_files/';
export const API_DEPOSITS_URI ='/api/deposits/';
export const API_MONEY_ACCOUNT_URI = '/api/money_account';
export const API_CHECKDEPOSIT_URI ='/api/checkdeposit/';

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
  { key: 'spy', value: 'Hình sự', icon: 'spy', text: 'Hình Sự' },
  { key: 'registered', value: 'Sở hữu trí tuệ', icon: 'registered',
    text: 'Sở hữu trí tuệ' },
  { key: 'heart', value: 'Hôn nhân & gia đình', icon: 'heart',
    text: 'Hôn nhân & gia đình' },
  { key: 'building outline', value: 'Nhà đất - Xây dựng',
    icon: 'building outline', text: 'Nhà đất - Xây dựng' },
  { key: 'payment', value: 'Tài chính - Ngân hàng', icon: 'payment',
    text: 'Tài chính - Ngân hàng' },
  { key: 'users', value: 'Dân sự', icon: 'users', text: 'Dân sự' },
  { key: 'protect', value: 'Lao động - Bảo hiểm xã hội', icon: 'protect',
    text: 'Lao động - Bảo hiểm xã hội' },
  { key: 'suitcase', value: 'Doanh nghiệp', icon: 'suitcase', text: 'Doanh nghiệp' },
]
