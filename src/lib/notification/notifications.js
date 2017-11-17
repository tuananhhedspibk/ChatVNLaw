var firebase = require('firebase');
var constant = require('../constants');

function createNewNotification(properties,callback){
  var ref = firebase.database().ref(`${constant.TABLE.notifications}/${properties.targetUser.uid}`).push()
  let item = {}
  item[constant.NOTIFICATIONS.senderId] = properties.currentUser.uid;
  item[constant.NOTIFICATIONS.type] = properties.type;
  item[constant.NOTIFICATIONS.info] = properties.info;
  ref.set(item);
}

function getAllNotification(properties, callback){

}

module.exports = {
  createNewNotification: function(properties,callback){
    createNewNotification(properties,callback)
  }
}