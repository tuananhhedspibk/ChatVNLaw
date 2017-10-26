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
    item["tags"] = []
    if(item["sender_uid"] === properties.component.currentUser.uid){
        item["type"] = 0;
        item["image"] = properties.component.currentUser.photoURL;
    }else{
        item["type"] = 1;
        item["image"] = properties.component.targetUser.photoURL;
    }
    if(data.val().tags){
        var count = 0;
        for(var key in data.val().tags){
            let tagItem = { id: count, text: key};
            item["tags"].push(tagItem);
            count++;
        }
    // data.val().tags.map((element, index)=>{
    //     let tagItem = { id: index, text: element}
    //     item["tags"].push(tagItem);
    // })
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
            let arr = properties.component.state.messages;
            
            data.forEach(function(element){
                count ++;
                let item  = exportItem(element,properties);
                arr.splice(count, 0, item);
            });
            properties.component.setState({messages: arr})
            
        }
    })
}

function loadTagNextMessages(properties){
    let ref = firebase.database().ref(`rooms/${properties.roomId}/messages`).orderByChild('msg_ts').endAt(properties.ts).limitToLast(properties.limit);
    ref.once('value').then(function(data){
        if(data.exists()){
            let count = -1;   
            let arr = [];
            data.forEach(function(element){
                count ++;
                let item  = exportItem(element,properties);
                arr.splice(count, 0, item);
            });
            properties.component.setState({messages: arr})            
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

function updateTag(properties){
    let component = properties.component;
    let mess = properties.mess;
    let tags = {};
    mess.tags.forEach(element => {
        // tags.push(element.text);
        tags[element.text] = element.text;
    })
    firebase.database().ref(`rooms/${component.currentRoomId}/messages/${mess._id}`).update({
        tags
    })
}
function searchTag(properties,callback){
    let component = properties.component;
    firebase.database().ref(`rooms/${component.state.currentRoomId}/messages`).orderByChild(`tags/${properties.keyword}`).equalTo(`${properties.keyword}`).once('value').then(snapshot =>{
        component.setState({currentResultIndex: 0})
        component.setState({messages: []})
        
        if(snapshot.val()){
            let arr = [];            
            for(var id in snapshot.val()){
                let data = snapshot.val()[id]
                arr.push({id, data});
            }
            component.setState({tagResults : arr});
            return callback()
        }else{
            component.setState({tagResults : []});
            
        }
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
    },
    updateTag: function(properties){
        updateTag(properties);
    },
    searchTag: function(properties,callback){
        searchTag(properties,callback);
    },
    loadTagNextMessages: function(properties){
        loadTagNextMessages(properties);
    }
}