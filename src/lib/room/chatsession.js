var constant = require('../constants');
var firebase = require('firebase')

function getChatSession(component, properties, callback){
  var ref = firebase.database().ref().child(`${constant.TABLE.rooms}/${component.state.currentRoomId}/${constant.ROOMS.chatSession}/`)
  ref.on('child_added', data =>{
    return callback('child_added',data);
  })
  ref.on('child_changed', data =>{
    return callback('child_changed', data);
  })
  ref.on('child_removed', data =>{
    return callback('child_removed', data);
  })
}

module.exports = {
  getChatSession: function(component, properties, callback){
    getChatSession(component, properties, callback);
  }
}