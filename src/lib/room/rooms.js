var firebase = require('firebase');

var constantLib = require('../constants');
var constantUI = require('../../components/constants');

// function extractUser(data, rid){
//     var item = {
//         username: data.val().username,
//         displayName: data.val().displayName,
//         uid : data.key,
//         status: data.val().status,
//         photoURL: data.val().photoURL,
//         rid: rid
//     }
//     return item;
// }

// // reference :
//     // currentUser.uid :
//         // targetUser.uid : rid

// function getRoomId(properties, callback){
//     firebase.database().ref(`${constant.TABLE.reference}/${properties.currentUser.uid}/${properties.targetUser.uid}`).once('value').then(data =>{
//         if(data.exists()){
//             // get room Id
//             return callback(true, data.val());
//         }
//         return callback(false, data.val());
//     })
// }
// function getAllRoom(properties, callback){
//     var userArr = []    
//     var ref = firebase.database().ref(`${constant.TABLE.reference}/${properties.currentUser.uid}`)
//     ref.on('child_added', snapshot => {
//         // snapshot.key : uid, snapshot.val() : rid
//         Users.getUserByUid(snapshot.key, (event,data) =>{
//             switch(event){
//                 case 'value':
//                     if(snapshot.key === properties.currentUser.uid){
//                         userArr.unshift(extractUser(data,snapshot.val()));
//                     }else{
//                         userArr.push(extractUser(data,snapshot.val()));  
//                     }
//                     return callback(userArr);
//                     break;
//                 case 'child_changed':
//                     userArr.every((element, index) =>{
//                         if(element.uid === snapshot.key){
//                             userArr[index][data.key] = data.val()
//                             return false; 
//                         }else{
//                             return true;
//                         }
//                     })
//                     return callback(userArr)
//                     break;
//                 // console.log(extractUser(data,snapshot.val()));
//             }         
//         })
//     })
//     ref.on('child_changed', snapshot =>{
//         console.log(snapshot);
//         console.log(snapshot.val());
//     })
//     ref.on('child_removed', snapshot =>{

//     })
// }

// // rooms:
// //     roomId:
// //         members:
// //             lawyer: uid
// //             customer: uid

// function createNewRoom(properties, callback){
//   let ref = firebase.database().ref(`${constant.TABLE.rooms}`).push();
//   let item = {}

//   let members = {};
//   members[constant.MEMBERS.lawyer] = properties.lawyerId;
//   members[constant.MEMBERS.customer] = properties.customerId;

//   let unread = {};
//   unread[constant.UNREAD_MESSAGES.count] = 0;

//   item[constant.ROOMS.members] = members;
//   item[constant.ROOMS.messages] = [];
//   item[constant.ROOMS.unReadMessage] = unread;
  
//   ref.set(item).then(()=>{
//       return callback(ref.key);
//   })
// }

// module.exports = {
//     getRoomId: function(properties, callback){
//         getRoomId(properties, callback);
//     },
//     createNewRoom: function (properties, callback){
//         createNewRoom(properties, callback);
//     },
//     getAllRoom: function (properties, callback){
//         getAllRoom(properties, callback);
//     }
// }

function getAllRooms(callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.get(constantUI.API_ROOMS_URI)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function createNewRoom(properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  var formData = new FormData();
  formData.append('rooms[user_id]', properties.user_id);
  formData.append('rooms[description]', properties.description);
  instance.post(constantUI.API_ROOMS_URI, formData)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function getRoomFilesAndImages(properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.get(constantUI.API_ROOMS_URI + '/' + properties.roomId + constantUI.API_ROOM_FILES_URI)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
  })
}

function roomUpFiles(properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  var formData = new FormData();
  formData.append('room_files[room_id]', properties.room_id);
  formData.append('room_files[file]', properties.file.data, properties.file.name);
  formData.append('room_files[content_type_id]', properties.content_type_id);

  instance.post('/api' + constantUI.API_ROOM_FILES_URI, formData)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    });
}

module.exports = {
  createNewRoom: function(properties, callback) {
    createNewRoom(properties, callback);
  },
  getAllRooms: function(callback) {
    getAllRooms(callback);
  },
  getRoomFilesAndImages: function(properties, callback) {
    getRoomFilesAndImages(properties, callback);
  },
  roomUpFiles: function(properties, callback) {
    roomUpFiles(properties, callback);
  }
}
