var firebase = require('firebase');
module.exports = {
    getUserName: function(user, callback){
        firebase.database().ref('users').child(user.uid).child('username').once('value').then(function(data){
            if(data.exists()){
                return callback(data.val());
            }
        })
    }
}