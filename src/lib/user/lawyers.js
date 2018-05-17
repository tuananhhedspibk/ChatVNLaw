var constantLib = require('../constants');
var constantUI = require('../../components/constants');

function getAllTasks(userID,callback){
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.get(constantUI.API_LAWYERS_URI+ userID +'/tasks'  )
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function getTasksByRoom(roomID, callback){
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  if (roomID) {
    instance.get(constantUI.API_ROOMS_URI+ roomID + '/tasks')
      .then(response => {
        return callback(true, response);
      })
      .catch(error => {
        return callback(false, error);
      });
  }
}

function createTask(roomID,content,callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  let formData = new FormData();
  formData.append('tasks[content]',content)
  instance.post(constantUI.API_ROOMS_URI+ roomID +'/tasks', formData )
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function updateTask(roomID,taskID,content, status,callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  let formData = new FormData();
  formData.append('tasks[content]',content);
  formData.append('tasks[status]',status);
  instance.patch(constantUI.API_ROOMS_URI + roomID +'/tasks/' + taskID, formData )
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function deleteTask(roomID,taskID,callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.delete(constantUI.API_ROOMS_URI+ roomID +'/tasks/' +taskID )
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}
function loadProfilePage(userName, callback) {
  var instance = constantLib.ax_ins;
  if(localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
  }
  instance.get(constantUI.API_LAWYERS_URI + userName)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function updateLawyerInfoRails(userName, properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  let formData = new FormData();
  for(var i = 0; i < properties.keys.length; i++) {
    formData.append('lawyers[' + properties.keys[i] + ']',
      properties.values[i]);
  }
  instance.patch(constantUI.API_LAWYERS_URI + userName, formData)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function createSpecialize(properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  let formData = new FormData();
  formData.append('lawyer_specializes[lawyer_id]', properties.lawyer_id);
  formData.append('lawyer_specializes[specialization_id]', properties.specialization_id);
  instance.post(constantUI.API_SPE_URI, formData)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function destroySpecialize(id, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.delete(constantUI.API_SPE_URI + '/' + id)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

module.exports = {
  getAllTasks: function(userID, callback) {
    getAllTasks(userID, callback);
  },
  getTasksByRoom: function(roomID,callback) {
    getTasksByRoom(roomID,callback);
  },
  createTask: function(roomID,content,callback) {
    createTask(roomID,content,callback);
  },
  deleteTask: function(roomID,taskID,callback) {
    deleteTask(roomID,taskID,callback);
  },
  updateTask: function(roomID,taskID,content, status,callback) {
    updateTask(roomID,taskID,content, status,callback);
  },
  loadProfilePage: function(userName, callback) {
    loadProfilePage(userName, callback);
  },
  updateLawyerInfoRails: function(userName, properties ,callback) {
    updateLawyerInfoRails(userName, properties, callback);
  },
  createSpecialize: function(properties, callback) {
    createSpecialize(properties, callback);
  },
  destroySpecialize: function(id, callback) {
    destroySpecialize(id, callback);
  }
}
