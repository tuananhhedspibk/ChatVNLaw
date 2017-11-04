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
    if(item["sender_uid"] === properties.component.state.currentUser.uid){
        item["type"] = 0;
    }else{
        item["type"] = 1;
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
function notifyUnreadMessage(properties){
    var component = properties.component;
    var ref = firebase.database().ref('rooms').orderByChild('unread/lastMess/receiver_uid').equalTo(component.state.currentUser.uid);
    var unreadArr = []

    ref.on('child_added', snapshot=>{
        var unreadItem = {
            _id: snapshot.key,
            count: snapshot.val().unread.count || 0,
            lastMess: {
              msg_ts: snapshot.val().unread.lastMess.msg_ts || '',
              sender_uid: snapshot.val().unread.lastMess.sender_uid || '',
              text: snapshot.val().unread.lastMess.text || ''
            }
        }
        unreadArr.push(unreadItem);
        component.setState({unread: unreadArr})
    })
    ref.on('child_changed', snapshot=>{
        unreadArr.every(function(element, index){
            if(element._id === snapshot.key){
              unreadArr[index] ={
                _id: snapshot.key,
                count: snapshot.val().unread.count || 0,
                lastMess: {
                  msg_ts: snapshot.val().unread.lastMess.msg_ts || '',
                  sender_uid: snapshot.val().unread.lastMess.sender_uid || '',
                  text: snapshot.val().unread.lastMess.text || ''
                }
              }
              component.setState({unread: unreadArr})
              return false;
            }
            return true;
          })
    })
    ref.on('child_removed', snapshot=>{
        unreadArr.every(function(element, index){
            if(element._id === snapshot.key){
              unreadArr.splice(index,1);
              component.setState({unread: unreadArr})
              return false;
            }
            return true;
        })
    })
}
function notifyMessagesComming(properties, callback){
    closeStreamRef();
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
            return callback();
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
    firebase.database().ref(`rooms/${component.state.currentRoomId}/messages`).push().set({
        "text": properties.content,
        "sender_uid": component.state.currentUser.uid,
        "msg_ts": ('' + (new Date()).getTime())
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
    },
    notifyUnreadMessage: function(properties){
        notifyUnreadMessage(properties);
    }
}