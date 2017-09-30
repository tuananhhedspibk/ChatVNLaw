var firebase = require('firebase');
var constant = require('../../components/constants');
var itemConvert = require('./message');

module.exports = {
    notifyMessagesComming :function(properties,callback){
        if(properties.rid != ""){
            let ref = firebase.database().ref().child('rooms').child(properties.rid).child('messages').orderByChild('msg_ts').startAt(properties.ts);
            ref.on('child_added', function(snapshot){
                if(snapshot.exists()){
                    let item = itemConvert.exportItem(snapshot,properties);
                    return callback('child_added', item, ref);
                }
            })
            ref.on('child_changed', function(snapshot){
                if(snapshot.exists()){

                }
            })
        }
    },
    history: function(properties,limit, callback){
        if(properties.rid != ""){
            let ref = firebase.database().ref().child('rooms').child(properties.rid).child('messages').orderByChild('msg_ts').endAt(properties.ts).limitToLast(limit);
            ref.once('value').then(function(data){
                if(data.exists()){
                    var messArr = []
                    let count = -1;
                    
                    data.forEach(function(element){
                        count ++;
                        let item  = itemConvert.exportItem(element,properties);
                        return callback(item,count);
                    });
                }
            })
        }
    },
    chat: function(properties, callback){
        if(properties.rid != ""){
            let ref = firebase.database().ref().child('rooms').child(properties.rid).child('messages');
            ref.push().set({
                "text": properties.content,
                "sender_uid": properties.uid,
                "msg_ts": properties.ts
            })
            return callback();
        }
    }
}