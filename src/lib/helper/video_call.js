var firebase = require('firebase');

module.exports = {
    checkRequest: function(properties,callback){
        let ref = firebase.database().ref(`rooms/${properties.rid}/videoCall/request`).once('value').then(function(data){
            if(data.exists()){
                console.log(data.val());
                if(data.val() === properties.uid){
                    return callback(true);                    
                }
                return callback(false);
            }else{
                return callback(false);
            }
        }).catch(function(err){
            console.log(err);
        })

    },
    createRequest: function(properties, callback){
        let ref = firebase.database().ref(`rooms/${properties.rid}/videoCall/request`);
        ref.set(properties.uid).then(function(){
            return callback(true);
        })
        return callback(false);
    }
}