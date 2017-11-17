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
  lawyers : 'lawyers'
};

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
  videoCall : 'videoCall'
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
  receiverId : 'receiverId',
  senderId : 'senderId'
}
export const SHARED_FILES = {
  contentType : 'contentType',
  downloadURL : 'downloadURL',
  height : 'height',
  width : 'width',
  name : 'name',
  senderId : 'senderId',
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