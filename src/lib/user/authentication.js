var firebase = require('firebase');
var constant = require('../constants');

function onAuthStateChanged(callback){
  firebase.auth().onAuthStateChanged( user => {
    return callback(user);
  })
}

function signInWithPopup(provider,callback){
  firebase.auth().signInWithPopup(provider).then(result =>{
    return callback(true,result);
  }).catch(function(error) {
    return callback(false, error); 
  })
}

function signInWithEmailAndPassword(email, password,callback){
  firebase.auth().signInWithEmailAndPassword(email,password)
  .catch(error =>{
    return callback(false, error);
  }).then( user =>{
    return callback(true, user);
  })    
}

function createUserWithEmailAndPassword(email, password, callback){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch(error =>{
    return callback(false, error);
  }).then( user =>{
    return callback(true, user);
  })
}

module.exports = {
  onAuthStateChanged: function(callback){
    onAuthStateChanged(callback);
  },
  signInWithPopup: function(provider, callback){
    signInWithPopup(provider,callback);
  },
  signInWithEmailAndPassword: function(email,password,callback){
    signInWithEmailAndPassword(email, password,callback);
  },
  createUserWithEmailAndPassword(email,password,callback){
    createUserWithEmailAndPassword(email,password,callback);
  }
}