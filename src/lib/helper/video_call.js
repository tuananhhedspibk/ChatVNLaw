var firebase = require('firebase');

module.exports = {
    checkRequest: function(properties,callback){
        let ref = firebase.database().ref().child('rooms').child(properties.rid).child('video_call');
        ref.orderByChild("request_id").once('value').then(function(data){
            if(data.exists()){
                console.log(data);
                return callback(true);
            }else{
                return callback(false);
            }
        }).catch(function(err){
            console.log(err);
        })

    },
    createRequest: function(properties, callback){
        let ref = firebase.database().ref().child('rooms').child(properties.rid).child('video_call').child('request').child(properties.uid);
        ref.set({
            request_id: "123"
        }).then(function(){
            return callback(true);
        })
        return callback(false);
    }
}