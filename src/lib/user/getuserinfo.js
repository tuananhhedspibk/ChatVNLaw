var firebase = require('firebase');
var constant = require('../constants');

function getUserRoleByUid(callback){
  var userDetail = JSON.parse(localStorage.chat_vnlaw_user)
  return callback(userDetail['role'])
}

module.exports = {
  getUserRoleByUid: function(input, callback){
    getUserRoleByUid(input, callback);
  }
}
