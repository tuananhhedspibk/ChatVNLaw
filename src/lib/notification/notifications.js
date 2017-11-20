var firebase = require('firebase');
var constant = require('../constants');
var translate = require('counterpart');

function extractNotification(data, callback){
  var type = data.val().type;
  switch(type){
    case constant.NOTIFICATION_TYPE.requestRoom:
      var item = {};
      item.title = data.val()[constant.NOTIFICATIONS.sender][constant.NOTIFICATIONS.senderDisplayName]+translate('app.notification.new_request_from_other');
      item.content = translate('app.notification.click_here');
      return callback(item);
  }
}

function createNewNotification(properties,callback){
  var ref = firebase.database().ref(`${constant.TABLE.notifications}/${properties.targetUser.uid}`).push()
  let item = {}

  item[constant.NOTIFICATIONS.sender] = {};
  item[constant.NOTIFICATIONS.sender][constant.NOTIFICATIONS.senderDisplayName] = properties.currentUser.displayName;
  // item[constant.NOTIFICATIONS.sender][constant.NOTIFICATIONS.senderRole] = properties.currentUser.role;
  item[constant.NOTIFICATIONS.sender][constant.NOTIFICATIONS.senderId] = properties.currentUser.uid;
  
  
  item[constant.NOTIFICATIONS.type] = properties.type;
  item[constant.NOTIFICATIONS.info] = properties.info;
  item[constant.NOTIFICATIONS.timeStamp] = '' + (new Date()).getTime();
  ref.set(item);
}

function getAllNotification(properties, callback){

}

function noticeWhenNewNotiComing(properties, callback){
  var ref = firebase.database().ref(`${constant.TABLE.notifications}/${properties.currentUser.uid}`)
  ref.on('child_added', data =>{
    if(data.val().timeStamp > properties.timeStamp){
      console.log(data.val());
      return callback(data);
    }
  })
}
module.exports = {
  createNewNotification: function(properties,callback){
    createNewNotification(properties,callback)
  },
  noticeWhenNewNotiComing(properties, callback){
    noticeWhenNewNotiComing(properties,callback);
  },
  extractNotification(data,callback){
    extractNotification(data,callback);
  }
}