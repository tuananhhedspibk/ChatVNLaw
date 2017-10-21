var firebase = require('firebase');
function exportItem(data,properties){
    let item = {};
    item["_id"] = data.key;
    item["text"] = data.val().text||'';
    item["sender_uid"] = data.val().sender_uid;
    item["msg_ts"] = data.val().msg_ts;
    item["contentType"] = data.val().contentType || '';
    item["height"] = data.val().height || 0;
    item["width"] = data.val().width || 0;
    item["name"] = data.val().name || '';
    item["downloadURL"] = data.val().downloadURL || '';
    return item;
  }

module.exports = {
    notifyMessagesComming :function(properties,callback){
        if(properties.rid){
            let ref = firebase.database().ref(`rooms/${properties.rid}/messages`).orderByChild('msg_ts').startAt(properties.ts);
            ref.on('child_added', function(snapshot){
                if(snapshot.exists()){
                    let item = exportItem(snapshot,properties);
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
        if(properties.rid){
            let ref = firebase.database().ref(`rooms/${properties.rid}/messages`).orderByChild('msg_ts').endAt(properties.ts).limitToLast(limit);
            ref.once('value').then(function(data){
                if(data.exists()){
                    let count = -1;                    
                    data.forEach(function(element){
                        count ++;
                        let item  = exportItem(element,properties);
                        return callback(item,count);
                    });
                }
            })
        }
    },
    chat: function(properties, callback){
        if(properties.rid){
            let ref = firebase.database().ref(`rooms/${properties.rid}/messages`);
            ref.push().set({
                "text": properties.content,
                "sender_uid": properties.uid,
                "msg_ts": properties.ts,
                "photoURL": properties.photoURL
            })
            return callback();
        }     
    }
}