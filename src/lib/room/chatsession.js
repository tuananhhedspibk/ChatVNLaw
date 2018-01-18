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

function updatePayment(component,element){
  var ref = firebase.database().ref().child(`${constant.TABLE.rooms}/${component.state.currentRoomId}/${constant.ROOMS.chatSession}/${element.id}`);
  ref.update({isPending: true});
}

function getAccountBalance(component, callback){
  var ref = firebase.database().ref().child(`${constant.TABLE.balance}/${component.state.currentUser.uid}/${constant.BALANCE.amount}`)
  ref.once('value').then((data) =>{
    return callback(data);
  })
}
module.exports = {
  getChatSession: function(component, properties, callback){
    getChatSession(component, properties, callback);
  },
  updatePayment: function(component,element){
    updatePayment(component, element);
  },
  getAccountBalance: function(component, callback){
    getAccountBalance(component,callback);
  }
}