var firebase = require('firebase');
var constantLib = require('../constants');
var constantUI = require('../../components/constants');

var translate = require('counterpart');

let img_exts = ['png', 'jpg', 'jpeg', 'gif'];
let file_exts = ['pdf', 'txt', 'doc'];

function createNewRoomFb(properties, callback){
  let ref = firebase.database().ref(`${constantLib.TABLE.rooms}/${properties.roomId}`);

  let item = {}
  let members = {};
  members[constantLib.MEMBERS.lawyer] = properties.lawyerId;
  members[constantLib.MEMBERS.customer] = properties.customerId;

  let unread = {};
  unread[constantLib.UNREAD_MESSAGES.count] = 0;
  item[constantLib.ROOMS.members] = members;
  item[constantLib.ROOMS.messages] = [];
  item[constantLib.ROOMS.unReadMessage] = unread;

  ref.set(item).then(()=>{
    return callback();
  })
}

function getAllRooms(callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.get(constantUI.API_ROOMS_URI)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function updateRoom(properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  let formData = new FormData();
  if (properties.desc) {
    formData.append('rooms[description]', properties.desc);
  }
  if (properties.opening !== null) {
    formData.append('rooms[opening]', properties.opening);
  }
  instance.patch(constantUI.API_ROOMS_URI + properties.roomId , formData )
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function createNewRoom(properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  var formData = new FormData();
  formData.append('rooms[user_id]', properties.user_id);
  formData.append('rooms[description]', properties.description);
  instance.post(constantUI.API_ROOMS_URI, formData)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function getRoomFilesAndImages(properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  if(properties.roomId) {
    instance.get(constantUI.API_ROOMS_URI + properties.roomId + constantUI.API_ROOM_FILES_URI)
      .then(response => {
        return callback(true, response);
      })
      .catch(error => {
        return callback(false, error);
    })
  }
}

function roomUpFiles(properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  var formData = new FormData();
  formData.append('room_files[room_id]', properties.room_id);
  formData.append('room_files[file]', properties.file.data, properties.file.name);
  formData.append('room_files[content_type_id]', properties.content_type_id);

  instance.post('/api' + constantUI.API_ROOM_FILES_URI, formData)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    });
}

function getRoomById(roomId, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.get(constantUI.API_ROOMS_URI + roomId)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function getFileType(fileName) {
  var f_ext = fileName.split('.')[1];
  if (img_exts.indexOf(f_ext) > -1) {
    return 1;
  }
  else if(file_exts.indexOf(f_ext) > -1) {
    return 2;
  }
  else {
    return 3;
  }
}

function upFile(component, currentRoomId, e, chat) {
  let file = e.target.files[0];
  if (file.size > 25000000) {
    alert(translate('app.chat.warning_file_size'));
    return ;
  }
  let fileName = file.name;
  let ct_t_id = getFileType(fileName);
  if (ct_t_id === 3) {
    alert(translate('app.chat.warning_file_ext'));
    return ;
  }
  var width, height;
  if (ct_t_id === 1) {
    var _URL = window.URL || window.webkitURL;
    var img = new Image();
    img.onload = function() {
      width = this.width;
      height = this.height;
    }
    img.src = _URL.createObjectURL(file);
  }
  var properties = {
    room_id: currentRoomId,
    file: {
      name: fileName,
      data: file
    },
    content_type_id: ct_t_id
  }
  roomUpFiles(properties, (success, response) => {
    if (success) {
      var ct_t = 'image';
      var mess_properties = null;

      if (ct_t_id === 2) {
        ct_t = 'file'
      }

      if(ct_t === 'image') {
        mess_properties = {
          contentType: ct_t,
          downloadURL: response.data.file_infor.file.url,
          width: width,
          height: height,
          component: component,
          timeStamp: response.data.file_infor.created_at
        }
      }
      else {
        mess_properties = {
          contentType: ct_t,
          downloadURL: response.data.file_infor.file.url,
          name: fileName,
          component: component,
          timeStamp: response.data.file_infor.created_at
        }
      }
      chat(mess_properties, () => {
        component.props.emitter.emit('fetch_files', currentRoomId);
      });
    }
    else {
      console.log(response);
    }
  });
}

function userGetRoom(properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  var query = {
    lawyer_id: properties.lawyer_id
  }
  instance.get(constantUI.API_USER_GET_ROOM_URI, {params: query})
    .then(response => {
      callback(true, response);
    })
    .catch(error => {
      callback(false, error);
    });
}

module.exports = {
  createNewRoom: function(properties, callback) {
    createNewRoom(properties, callback);
  },
  updateRoom: function(properties, callback) {
    updateRoom(properties, callback);
  },
  getAllRooms: function(callback) {
    getAllRooms(callback);
  },
  getRoomFilesAndImages: function(properties, callback) {
    getRoomFilesAndImages(properties, callback);
  },
  upFile: function(component, currentRoomId, e, chat) {
    upFile(component, currentRoomId, e, chat);
  },
  getRoomById: function(roomId, callback) {
    getRoomById(roomId, callback);
  },
  createNewRoomFb: function(properties, callback) {
    createNewRoomFb(properties, callback);
  },
  userGetRoom: function(properties, callback) {
    userGetRoom(properties, callback);
  }
}
