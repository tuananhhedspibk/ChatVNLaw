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
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
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

function loadCurrentUserProfile(callback) {
  var instance = constantLib.ax_ins;
  if(localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.get(constantUI.API_USERS_URI + JSON.parse(localStorage.chat_vnlaw_user)['userName'])
    .then(response => {
      console.log(response)
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}


function createDepositRequests(amount,callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  let formData = new FormData();
  formData.append('deposits[amount]',amount)
  instance.post(constantUI.API_BASE_URL + constantUI.API_DEPOSITS_URI, formData)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}
function checkDeposit(properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.get(constantUI.API_BASE_URL + constantUI.API_CHECKDEPOSIT_URI, properties)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}
function getDepositHistories(userID, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.get(constantUI.API_BASE_URL + constantUI.API_USERS_URI + userID + '/deposit_histories')
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
  },
  createDepositRequests: function(amount,callback) {
    createDepositRequests(amount,callback);
  },
  checkDeposit: function(properties, callback) {
    checkDeposit(properties, callback);
  },
  loadCurrentUserProfile: function(callback) {
    loadCurrentUserProfile(callback);
  },
  getDepositHistories: function(userID, callback) {
    getDepositHistories(userID, callback);
  }
}