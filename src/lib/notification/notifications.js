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
      return callback(constant.NOTIFICATION_TYPE.requestRoom,item);
    case constant.NOTIFICATION_TYPE.acceptRoomRequest:
      var item = {};
      item.title = data.val()[constant.NOTIFICATIONS.sender][constant.NOTIFICATIONS.senderDisplayName]+translate('app.notification.new_accept_room_request');
      item.content = translate('app.notification.click_here');
      return callback(constant.NOTIFICATION_TYPE.acceptRoomRequest,item);
    case constant.NOTIFICATION_TYPE.refuseRoomRequest:
      var item = {};
      item.title = data.val()[constant.NOTIFICATIONS.sender][constant.NOTIFICATIONS.senderDisplayName]+translate('app.notification.new_refuse_room_request');
      item.content = translate('app.notification.click_here');
      return callback(constant.NOTIFICATION_TYPE.refuseRoomRequest,item);
  }
}

function extractNotificationInfo(data, callback){
  var type = data.val().type;
  switch(type){
    case constant.NOTIFICATION_TYPE.requestRoom:
      var item = {};
      item.title = data.val()[constant.NOTIFICATIONS.sender][constant.NOTIFICATIONS.senderDisplayName]+translate('app.notification.new_request_from_other');
      item.content = translate('app.notification.click_here');
      return callback(item);
  }
}

function deleteNotification(properties){
  var ref = firebase.database().ref(`${constant.TABLE.notifications}/${properties.currentUser.uid}/${properties.nid}`)
  ref.remove();
}

function createNewNotification(properties,callback){
  var ref = firebase.database().ref(`${constant.TABLE.notifications}/${properties.targetUser.uid}`).push()
  let item = {}

  item[constant.NOTIFICATIONS.sender] = {};
  item[constant.NOTIFICATIONS.sender][constant.NOTIFICATIONS.senderDisplayName] = properties.currentUser.displayName;
  item[constant.NOTIFICATIONS.sender][constant.NOTIFICATIONS.senderId] = properties.currentUser.uid;
  if (properties.currentUser.userName) {
    item[constant.NOTIFICATIONS.sender][constant.NOTIFICATIONS.senderUserName] = properties.currentUser.userName;
  }

  item[constant.NOTIFICATIONS.type] = properties.type;
  item[constant.NOTIFICATIONS.info] = properties.info || '';
  item[constant.NOTIFICATIONS.timeStamp] = '' + (new Date()).getTime();
  ref.set(item);
}

function getAllNotification(properties, callback){
  var ref = firebase.database().ref(`${constant.TABLE.notifications}/${properties.currentUser.uid}`)
  ref.once('value').then( data =>{
    return callback('value',data);
  })
  ref.on('child_added', data =>{
    var item = data.val()
    item[constant.NOTIFICATIONS.id] = data.key;
    return callback('child_added', item);
  })
  ref.on('child_removed', data=>{
    var item = data.val()
    item[constant.NOTIFICATIONS.id] = data.key;
    return callback('child_removed', item);
  })
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
  noticeWhenNewNotiComing: function(properties, callback){
    noticeWhenNewNotiComing(properties,callback);
  },
  extractNotification(data,callback){
    extractNotification(data,callback);
  },
  getAllNotification: function(properties, callback){
    getAllNotification(properties, callback);
  },
  extractNotificationInfo:function(data, callback){
    extractNotificationInfo(data, callback)
  },
  deleteNotification: function(properties){
    deleteNotification(properties)
  }
}
