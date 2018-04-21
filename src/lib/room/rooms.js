var firebase = require('firebase');
var constantLib = require('../constants');
var constantUI = require('../../components/constants');

var translate = require('counterpart');

let img_exts = ['png', 'jpg', 'jpeg', 'gif'];
let file_exts = ['pdf', 'txt', 'doc'];

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

function updateRoom(roomID, desc, status, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  let formData = new FormData();
  if (desc) {
    formData.append('rooms[description]', desc);
  }
  if (status) {
    formData.append('rooms[status]', status);
  }
  instance.patch(constantUI.API_ROOMS_URI + roomID , formData )
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

      if (ct_t_id == 2) {
        ct_t = 'file'
      }

      if(ct_t == 'image') {
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

module.exports = {
  createNewRoom: function(properties, callback) {
    createNewRoom(properties, callback);
  },
  updateRoom: function(roomID, desc, status, callback) {
    updateRoom(roomID, desc, status, callback);
  },
  getAllRooms: function(callback) {
    getAllRooms(callback);
  },
  getRoomFilesAndImages: function(properties, callback) {
    getRoomFilesAndImages(properties, callback);
  },
  upFile: function(component, currentRoomId, e, chat) {
    upFile(component, currentRoomId, e, chat);
  }
}
