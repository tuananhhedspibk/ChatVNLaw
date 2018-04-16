import axios from 'axios';

export const ROOM_FILES = 'room_files';
export const STUN_SERVER_LIST = 'stun_server_list'; 
export const STUN_SERVER_OPTIONS = {
  host: "global.xirsys.net",
  path: "/_turn/MyFirstApp",
  method: "PUT",
  headers: {
      "Authorization": "Basic " + new Buffer("lkbcteam:54beba0c-a6d2-11e7-ae16-600b82d3c98a").toString("base64")
  }
};
export const TABLE = {
  users : 'users',
  tasks : 'tasks',
  rooms : 'rooms',
  role : 'roles',
  reference : 'reference',
  notes : 'notes',
  lawyers : 'lawyers',
  notifications: 'notifications',
  balance: 'moneyAccount'
};
export const BALANCE = {
  amount: 'amount'
}
export const ROLE = {
  user: 'user',
  lawyer: 'lawyer'
}
export const NOTIFICATIONS = {
  id :'id',
  sender: 'sender',
  senderDisplayName: 'displayName',
  senderRole: 'role',
  senderId : 'uid',
  type: 'type',
  //  value:
  //    'requestRoom': when ask lawyer,
  //    'acceptRoom': when lawyer accepted and create new room
  info: 'information',
  timeStamp: 'timeStamp'
}

export const NOTIFICATION_TYPE = {
  requestRoom: 'requestRoom',
  acceptRoomRequest: 'acceptRoomRequest',
  refuseRoomRequest: 'refuseRoomRequest'
}
export const USERS = {
  uid: 'uid',
  displayName: 'displayName',
  email: 'email',
  isDeleted: 'isDeleted',
  photoURL: 'photoURL',
  role: 'role',
  status: 'status',
  username: 'username'
}

export const ROOMS = {
  roomId: 'rid',
  members: 'members',
  unReadMessage: 'unReadMessage',
  description: 'description',
  messages : 'messages',
  sharedImages : 'sharedImages',
  sharedFiles : 'sharedFiles',
  videoCall : 'videoCall',
  chatSession: 'chatSession'
}

export const MEMBERS = {
  lawyer: 'lawyer',
  customer: 'customer'
}
export const MESSAGES = {
  messagesId : 'mid',
  timeStamp: 'msgTimeStamp',
  senderId: 'senderUid',
  content: 'content',
  tags : 'tags'
}

export const UNREAD_MESSAGES = {
  count : 'count',
  lastMessage : 'lastMessage',
  timeStamp : 'msgTimeStamp',
  receiverId : 'receiverUid',
  senderId : 'senderUid'
}
export const SHARED_FILES = {
  contentType : 'contentType',
  downloadURL : 'downloadURL',
  height : 'height',
  width : 'width',
  name : 'name',
  senderId : 'senderUid',
  size : 'size',
  timeStamp : 'filesTimeStamp'
}

export const LAWYER_INFO = {
  achievement : 'achievement',
  address : 'address',
  area : 'area',
  birthday : 'birthday',
  cardNumber : 'cardNumber',
  category : 'category',
  certificate: 'certificate',
  education: 'education',
  exp : 'exp',
  fullname : 'fullname',
  intro: 'intro',
  phoneNumber: 'phoneNumber',
  price: 'price',
  rate : 'rate',
  rateSum: 'rateSum',
  workPlace: 'workPlace'
}

export const VIDEO_CALL = {
  request: 'request',
  stream: 'stream',
  end: 'end',
  cancelRequest: 'cancel'
}

export const ax_ins = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'x-api-token': 'b1c7f840acdee887f402236e82736eba'
  }
});
