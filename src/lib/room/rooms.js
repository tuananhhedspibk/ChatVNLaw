var firebase = require('firebase');
var constant = require('../constants');

// reference :
    // currentUser.uid :
        // targetUser.uid : rid

function getRoomId(properties, callback){
    firebase.database().ref(`${constant.TABLE.reference}/${properties.currentUser.uid}/${properties.targetUser.uid}`).once('value').then(data =>{
        if(data.exists()){
            // get room Id
            return callback(true, data.val());
        }
        return callback(false, data.val());
    })
}
function getAllRoom(properties, callback){
    var ref = firebase.database().ref(`${constant.TABLE.reference}/${properties.currentUser.uid}`)
    ref.on('child_added', snapshot => {
        console.log(snapshot);
    })
    ref.on('child_changed', snapshot =>{
        console.log(snapshot);
    })
    ref.on('child_removed', snapshot =>{

    })
}
function createNewRoom(properties, callback){
  let ref = firebase.database().ref(`${constant.TABLE.rooms}`).push();
  let item = {}

  let members = {};
  members[constant.MEMBERS.lawyer] = properties.lawyerId;
  members[constant.MEMBERS.customer] = properties.customerId;

  let unread = {};
  unread[constant.UNREAD_MESSAGES.count] = -1;

  item[constant.ROOMS.members] = members;
  item[constant.ROOMS.messages] = [];
  item[constant.ROOMS.unReadMessage] = unread;
  
  ref.set(item).then(()=>{
      return callback(ref.key);
  })
}

module.exports = {
    getRoomId: function(properties, callback){
        getRoomId(properties, callback);
    },
    createNewRoom: function (properties, callback){
        createNewRoom(properties, callback);
    },
    getAllRoom: function (properties, callback){
        getAllRoom(properties, callback);
    }
}