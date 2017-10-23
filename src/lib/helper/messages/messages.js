var firebase = require('firebase');
var messageStreamRef;

function closeStreamRef(){
    try{
        messageStreamRef.off()
    } catch(ex){

    }
}
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
    if(item["sender_uid"] === properties.component.currentUser.uid){
        item["type"] = 0;
        item["image"] = properties.component.currentUser.photoURL;
      }else{
        item["type"] = 1;
        item["image"] = properties.component.targetUser.photoURL;
      }
    return item;
}

function notifyMessagesComming(properties, callback){
    messageStreamRef = firebase.database().ref(`rooms/${properties.roomId}/messages`).orderByChild('msg_ts').startAt(properties.ts);
    messageStreamRef.on('child_added', function(snapshot){
        if(snapshot.exists()){
            let item = exportItem(snapshot,properties);
            let arr = properties.component.state.messages;
            arr.push(item);
            properties.component.setState({messages: arr});
        }
    })
    messageStreamRef.on('child_changed', function(snapshot){
        if(snapshot.exists()){

        }
    })
}

function history(properties, callback){
    let ref = firebase.database().ref(`rooms/${properties.roomId}/messages`).orderByChild('msg_ts').endAt(properties.ts).limitToLast(properties.limit);
    ref.once('value').then(function(data){
        if(data.exists()){
            let count = -1;                    
            data.forEach(function(element){
                count ++;
                let item  = exportItem(element,properties);
                let arr = properties.component.state.messages;
                arr.splice(count, 0, item);
                properties.component.setState({messages: arr})
            });
        }
    })
}

function chat(properties){
    let component = properties.component;
    firebase.database().ref(`rooms/${component.currentRoomId}/messages`).push().set({
        "text": properties.content,
        "sender_uid": component.currentUser.uid,
        "msg_ts": ('' + (new Date()).getTime()),
        "photoURL": component.currentUser.photoURL
    })
}
module.exports = {
    streamingMessage: function(properties, callback){
        notifyMessagesComming(properties, callback);
    },
    history : function(properties, callback){
        history(properties, callback);
    },
    closeStreamRef: function(){
        closeStreamRef();
    },
    chat: function(properties){
        chat(properties);
    }
}