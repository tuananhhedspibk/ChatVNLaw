var firebase = require('firebase');

function getRoomId(properties, callback){
    var 
}

function checkExistRoomId(properties, callback){
    firebase.database().ref(`reference/${properties.roomid}`).once('value').then(data =>{
        if(data.exists()){
            // get room Id
        }else{
            // create new room chat
        }
    })
}
module.exports = {
    getRoomId: function(properties, callback){
        getRoomId(properties, callback);
    }
}