const firebase = require('firebase');

module.exports = {
    resetUnreadMess: function(roomId,callback){
        var ref = firebase.database().ref(`rooms/${roomId}/unread`).update({
            count: 0
        })
        return callback();
    }
}