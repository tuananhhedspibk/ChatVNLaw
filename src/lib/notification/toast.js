var constant = require('../../components/constants');
var translate = require('counterpart');

module.exports = {
  checkPermission(emitter,uri, callback){
    checkPermission(emitter,uri, callback);
  },
  checkAuthen(emitter,uri, callback){
    checkAuthen(emitter,uri, callback);
  },
  checkAlreadyLogin(emitter, callback){
    checkAlreadyLogin(emitter, callback);
  },
  cantCreatePeer(emitter, callback){
    cantCreatePeer(emitter, callback);
  }
}

function checkPermission(emitter,uri, callback){
  emitter.emit('AddNewErrorToast',translate('app.system_notice.permission_denied.title'),translate('app.system_notice.permission_denied.text'),5000, () => {
    window.location = uri;
  })
  setTimeout(() => {
    window.location = uri;
  },5000);
  return callback();
}

function checkAuthen(emitter, uri, callback){
  emitter.emit('AddNewErrorToast',translate('app.system_notice.unauthenticated.title'),
    translate('app.system_notice.unauthenticated.text'),5000, () => {
      window.location = uri;
  })
  setTimeout(() => {
    window.location = uri;
  },5000);
  return callback();
}

function checkAlreadyLogin(emitter, callback){
  emitter.emit('AddNewInfoToast', '', translate('app.system_notice.error.text.already_login'), 5000, ()=>{
    return callback();
  } )
  setTimeout(()=>{
    return callback();
  },3000);  
}

function cantCreatePeer(emitter, callback){
  emitter.emit('AddNewErrorToast', '', translate('app.system_notice.error.text.cant_create_peer'), 5000, ()=>{
    return callback();
  } )
  setTimeout(()=>{
    return callback();
  },3000);
}

