
var firebase = require('firebase');
var constant = require('../constants');
module.exports ={
  updateUserInfo(properties, callback){
    updateUserInfo(properties, callback);
  }
}
function updateUserInfo(properties, callback){
  firebase.database().ref(`${constant.TABLE.users}/${properties.currentUser.uid}`).update({
    "displayName" : properties.displayName,
    "username": properties.username
  }).then(function() {
    return callback(true)
  }).catch(function(error){
    return callback(false,error);
  })
}