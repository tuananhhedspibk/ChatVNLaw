var firebase = require('firebase');

function getRoomId(properties, callback){
    checkExistRoomId(properties, roomId =>{
        return callback(roomId);
    })
}

function checkExistRoomId(properties, callback){
    firebase.database().ref(`reference/${properties.roomId}`).once('value').then(data =>{
        if(data.exists()){
            // get room Id
            data.forEach(element =>{
                return callback(element.val());
            })
        }else{
            // create new room chat
            createNewRoom(properties,roomId =>{
                return callback(roomId);
            })
        }
    })
}

function createNewRoom(properties, callback){
    let ref = firebase.database().ref('rooms').push();
    let count = 0;
    let component = properties.component;
    if(component.currentUser.uid === component.targetUser.uid){
        count  = -1;
    }
    ref.set({
        'members':[component.currentUser.uid, component.targetUser.uid],
        'messages':[],
        'unread': {
          'count' : count
        },
        'description':[],
        'status':0
    }).then(()=>{
        return callback(ref.key);
    })
}
module.exports = {
    getRoomId: function(properties, callback){
        getRoomId(properties, callback);
    }
}