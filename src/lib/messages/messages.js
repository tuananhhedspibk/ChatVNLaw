var firebase = require('firebase');
var messageStreamRef;
var constant = require('../constants');

function closeStreamRef(){
    try{
        messageStreamRef.off()
    } catch(ex){

    }
}
function exportItem(data,properties){
    let item = {};
    item[constant.MESSAGES.messagesId] = data.key;
    item[constant.MESSAGES.content] = data.val()[constant.MESSAGES.content]||'';
    item[constant.MESSAGES.senderId] = data.val()[constant.MESSAGES.senderId];
    item[constant.MESSAGES.timeStamp] = data.val()[constant.MESSAGES.timeStamp];
    item[constant.SHARED_FILES.contentType] = data.val()[constant.SHARED_FILES.contentType] || '';
    item[constant.SHARED_FILES.height] = data.val()[constant.SHARED_FILES.height] || 0;
    item[constant.SHARED_FILES.width] = data.val()[constant.SHARED_FILES.width] || 0;
    item[constant.SHARED_FILES.name] = data.val()[constant.SHARED_FILES.name] || '';
    item[constant.SHARED_FILES.downloadURL] = data.val()[constant.SHARED_FILES.downloadURL] || '';
    item["type"] = item[constant.MESSAGES.senderId] === properties.component.state.currentUser.uid ? 0 : 1;
    item[constant.MESSAGES.tags] = []
    if(data.val()[constant.MESSAGES.tags]){
        var count = 0;
        for(var key in data.val()[constant.MESSAGES.tags]){
            let tagItem = { id: count, text: key};
            item[constant.MESSAGES.tags].push(tagItem);
            count++;
        }
    }
    return item;
}
function exportUnreadItem(snapshot){
    var unreadItem = {}
    var lastMess = {}
    lastMess[constant.UNREAD_MESSAGES.timeStamp] = snapshot.val()[constant.ROOMS.unReadMessage][constant.UNREAD_MESSAGES.lastMessage][constant.UNREAD_MESSAGES.timeStamp] || '';
    lastMess[constant.UNREAD_MESSAGES.senderId] = snapshot.val()[constant.ROOMS.unReadMessage][constant.UNREAD_MESSAGES.lastMessage][constant.UNREAD_MESSAGES.senderId] || '';
    lastMess[constant.UNREAD_MESSAGES.receiverId] = snapshot.val()[constant.ROOMS.unReadMessage][constant.UNREAD_MESSAGES.lastMessage][constant.UNREAD_MESSAGES.receiverId] || '';

    unreadItem[constant.MESSAGES.messagesId] = snapshot.key;
    unreadItem[constant.UNREAD_MESSAGES.count] = snapshot.val()[constant.ROOMS.unReadMessage][constant.UNREAD_MESSAGES.count] || 0;        
    unreadItem[constant.UNREAD_MESSAGES.lastMessage] = lastMess;

    return unreadItem
}
function resetUnreadMess(roomId,callback){
    var ref = firebase.database().ref(`${constant.TABLE.rooms}/${roomId}/${constant.ROOMS.unReadMessage}`).update({
        count: 0
    })
    return callback();
}

function notifyUnreadMessage(properties){
    var component = properties.component;
    var ref = firebase.database().ref(`${constant.TABLE.rooms}`).orderByChild(`${constant.ROOMS.unReadMessage}/${constant.UNREAD_MESSAGES.lastMessage}/${constant.UNREAD_MESSAGES.receiverId}`).equalTo(component.state.currentUser.uid);
    var unreadArr = []

    ref.on('child_added', snapshot=>{
        unreadArr.push(exportUnreadItem(snapshot));
        component.setState({unread: unreadArr})
    })
    ref.on('child_changed', snapshot=>{
        unreadArr.every(function(element, index){
            if(element[constant.MESSAGES.messagesId] === snapshot.key){
                unreadArr[index] = exportUnreadItem(snapshot);

                component.setState({unread: unreadArr})
                return false;
            }
            return true;
          })
    })
    ref.on('child_removed', snapshot=>{
        unreadArr.every(function(element, index){
            if(element[constant.MESSAGES.messagesId] === snapshot.key){
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
    messageStreamRef = firebase.database().ref(`${constant.TABLE.rooms}/${properties.roomId}/${constant.ROOMS.messages}`).orderByChild(`${constant.MESSAGES.timeStamp}`).startAt(properties.ts);
    messageStreamRef.on('child_added', function(snapshot){
        if(snapshot.exists()){
            let item = exportItem(snapshot,properties);
            let arr = properties.component.state.messages;
            arr.push(item);
            properties.component.setState({messages: arr});
            if (item.contentType == 'image' || item.contentType == 'file') {
                properties.component.props.emitter.emit('fetch_files');
            }
            return callback();
        }
    })
    messageStreamRef.on('child_changed', function(snapshot){
        if(snapshot.exists()){
            
        }
    })
}

function history(properties, callback){
    let ref = firebase.database().ref(`${constant.TABLE.rooms}/${properties.roomId}/${constant.ROOMS.messages}`).orderByChild(`${constant.MESSAGES.timeStamp}`).endAt(properties.ts).limitToLast(properties.limit);
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
    let ref = firebase.database().ref(`${constant.TABLE.rooms}/${properties.roomId}/${constant.ROOMS.messages}`).orderByChild(`${constant.MESSAGES.timeStamp}`).endAt(properties.ts).limitToLast(properties.limit);
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
function chat(properties, callback){
    let component = properties.component;
    let item = {};
    if(!properties.contentType) {
        item[constant.MESSAGES.content] = properties.content;
        item[constant.MESSAGES.senderId] = component.state.currentUser.uid;
        item[constant.MESSAGES.timeStamp] = ('' + (new Date()).getTime());
    }
    else {
        if (properties.contentType == 'image') {
            item[constant.SHARED_FILES.senderId] = component.state.currentUser.uid;
            item[constant.SHARED_FILES.downloadURL] = properties.downloadURL;
            item[constant.SHARED_FILES.width] = properties.width;
            item[constant.SHARED_FILES.height] = properties.height;
            item[constant.SHARED_FILES.contentType] = properties.contentType;
            item[constant.SHARED_FILES.timeStamp] = properties.timeStamp;
        }
        else {
            item[constant.SHARED_FILES.contentType] = properties.contentType;
            item[constant.SHARED_FILES.name] = properties.name;
            item[constant.SHARED_FILES.downloadURL] = properties.downloadURL;
            item[constant.SHARED_FILES.timeStamp] = properties.timeStamp;
            item[constant.SHARED_FILES.senderId] = component.state.currentUser.uid;
        }
    }
    firebase.database().ref(`${constant.TABLE.rooms}/${component.state.currentRoomId}/${constant.ROOMS.messages}`).push().set(item);
    return callback();
}

function updateTag(properties){
    let component = properties.component;
    let mess = properties.mess;
    let tags = {};
    mess.tags.forEach(element => {
        tags[element.text] = element.text;
    })
    firebase.database().ref(`${constant.TABLE.rooms}/${component.state.currentRoomId}/${constant.ROOMS.messages}/${mess[constant.MESSAGES.messagesId]}`).update({
        tags
    })
}
function searchTag(properties,callback){
    let component = properties.component;
    firebase.database().ref(`${constant.TABLE.rooms}/${component.state.currentRoomId}/${constant.ROOMS.messages}`).orderByChild(`${constant.MESSAGES.tags}/${properties.keyword}`).equalTo(`${properties.keyword}`).once('value').then(snapshot =>{
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
    chat: function(properties, callback){
        chat(properties, callback);
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
    },
    resetUnreadMess: function(roomId,callback){
        resetUnreadMess(roomId,callback);
    }
}
