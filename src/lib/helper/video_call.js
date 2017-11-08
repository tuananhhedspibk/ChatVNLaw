var firebase = require('firebase');

function endCall(properties, callback){
    var ref = firebase.database().ref(`rooms/${properties.rid}/videoCall/end`).push()
    ref.set({
        end: true
    })
    ref.remove();
    firebase.database().ref(`rooms/${properties.rid}/videoCall`).remove();
}
function createRequest(properties, callback){
    let ref = firebase.database().ref(`rooms/${properties.rid}/videoCall/request`);
    ref.set(properties.uid).then(function(){
        return callback(true);
    }).catch(err =>{
        return callback(false);        
    })
}
function checkRequest (properties,callback){
    let ref = firebase.database().ref(`rooms/${properties.rid}/videoCall/request`).once('value').then(function(data){
        if(data.exists()){
            // console.log(data.val());
            // if(data.val() !== properties.uid){
            //     return callback(true);                    
            // }
            return callback(true);
        }else{
            return callback(false);
        }
    }).catch(function(err){
        console.log(err);
    })
}
module.exports = {
    checkRequest: function(properties,callback){
        checkRequest(properties,callback);
    },
    createRequest: function(properties, callback){
        createRequest(properties,callback);
    },
    endCall: function(properties, callback){
        endCall(properties,callback);
    }
}