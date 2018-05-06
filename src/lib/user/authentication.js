var firebase = require('firebase');
var constantLib = require('../constants');
var constantUI = require('../../components/constants');

function onAuthStateChanged(callback){
  firebase.auth().onAuthStateChanged( user => {
    return callback(user);
  })
}

// sign in omniauth
function signInWithPopup(provider,callback){
  firebase.auth().signInWithPopup(provider).then(result =>{
    return callback(true,result);
  }).catch(function(error) {
    return callback(false, error); 
  })
}

function signInWithEmailAndPassword(email, password, callback){
  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(error =>{
    return callback(false, error);
  }).then( user =>{
    return callback(true, user);
  })    
}

// signup function
function createUserWithEmailAndPassword(email, password, callback){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch(error =>{
    return callback(false, error);
  }).then( user =>{
    return callback(true, user);
  })
}

function loginRails(email, password, callback) {
  var formData = new FormData();
  formData.append('login[email]', email);
  formData.append('login[password]', password);
  constantLib.ax_ins.post(constantUI.API_LOGIN_URI, formData)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function logoutRails(callback) {
  var instance = constantLib.ax_ins;
  instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
  instance.delete(constantUI.API_LOGOUT_URI)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

module.exports = {
  onAuthStateChanged: function(callback){
    onAuthStateChanged(callback);
  },
  signInWithPopup: function(provider, callback){
    signInWithPopup(provider,callback);
  },
  signInWithEmailAndPassword: function(email, password, callback){
    signInWithEmailAndPassword(email, password,callback);
  },
  createUserWithEmailAndPassword: function(email, password, callback){
    createUserWithEmailAndPassword(email, password, callback);
  },
  loginRails: function(email, password, callback) {
    loginRails(email, password, callback);
  },
  logoutRails: function(callback) {
    logoutRails(callback);
  }
}
