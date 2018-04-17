var firebase = require('firebase');
var constantLib = require('../constants');
var constantUI = require('../../components/constants');

function updateUserInfo(properties, callback){
  firebase.database().ref(`${constantLib.TABLE.users}/${properties.currentUser.uid}`).update({
    "displayName" : properties.displayName,
    "username": properties.username
  }).then(function() {
    return callback(true)
  }).catch(function(error){
    return callback(false,error);
  })
}

function signupRails(properties, password, callback) {
  let formData = new FormData();
  formData.append('signup[id]', properties.currentUser.uid);
  formData.append('signup[email]', properties.currentUser.email);
  formData.append('signup[password]', password);
  formData.append('signup[password_confirmation]', password);
  formData.append('signup[profile_attributes][displayName]', properties.currentUser.displayName);
  formData.append('signup[profile_attributes][userName]',  properties.userName);
  formData.append('signup[user_role_attributes][role_id]', 1);
  constantLib.ax_ins.post(constantUI.API_SIGNUP_URI, formData)
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
  instance.get(constantUI.API_USERS_URI + userName)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function updateUserInfoRails(userName, properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  let formData = new FormData();
  for(var i = 0; i < properties.keys.length; i++) {
    if(properties.keys[i] == 'avatar') {
      formData.append('users[profile_attributes][' + properties.keys[i] + ']',
        properties.values[i].file, properties.values[i].fileName);
    }
    else {
      formData.append('users[profile_attributes][' + properties.keys[i] + ']',
        properties.values[i]);
    }
  }
  instance.patch(constantUI.API_USERS_URI + userName, formData)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

module.exports ={
  updateUserInfo: function(properties, callback){
    updateUserInfo(properties, callback);
  },
  signupRails: function(properties, password, callback) {
    signupRails(properties, password, callback);
  },
  loadProfilePage: function(userName, callback) {
    loadProfilePage(userName, callback);
  },
  updateUserInfoRails: function(userName, properties, callback) {
    updateUserInfoRails(userName, properties, callback);
  }
}