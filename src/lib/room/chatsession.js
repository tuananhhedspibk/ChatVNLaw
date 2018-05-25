var constant = require('../constants');
var constantUI = require('../../components/constants');
var firebase = require('firebase');

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

function updatePayment(component, element, callback){
  var ref = firebase.database().ref().child(`${constant.TABLE.rooms}/${component.state.currentRoomId}/${constant.ROOMS.chatSession}/${element.id}`);
  var instance = constant.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  var formData = new FormData();
  formData.append('money_account[ammount]', element.cart);
  formData.append('money_account[lawyer_id]', component.state.targetUser.id);
  console.log(component.state.targetUser.id);

  instance.patch(constantUI.API_MONEY_ACCOUNT_URI, formData)
    .then(response => {
      ref.update({payment: true});
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function getAccountBalance(callback){
  var instance = constant.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.get(constantUI.API_MONEY_ACCOUNT_URI)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

module.exports = {
  getChatSession: function(component, properties, callback){
    getChatSession(component, properties, callback);
  },
  updatePayment: function(component, element, callback){
    updatePayment(component, element, callback);
  },
  getAccountBalance: function(callback){
    getAccountBalance(callback);
  }
}
