const firebase = require('firebase');
var constant = require('../constants');

var fileRef, imageRef;

function addItem(snapshot, list){
    let item = {}
    snapshot.forEach(function(element){
        item[element.key] = element.val();
    })
    list.push(item);
    return list;
}

function closeRef(){
    try{
        fileRef.off();
        imageRef.off();
    }catch(err){

    }
}
function listenFromImagesFolder(properties){
    let component = properties.component;
    imageRef = firebase.database().ref().child(`${constant.TABLE.rooms}/${properties.roomId}/${constant.ROOMS.sharedImages}`);
    imageRef.on('child_added',function(snapshot){
      if(snapshot.exists()){
        let imagesList = addItem(snapshot,component.state.images);
        component.setState({images: imagesList});
        }
      }
    );
}
function listenFromFilesFolder(properties){
    let component = properties.component;
    fileRef = firebase.database().ref().child(`${constant.TABLE.rooms}/${properties.roomId}/${constant.ROOMS.sharedFiles}`);
    fileRef.on('child_added', function(snapshot){
        if(snapshot.exists()){
            let filesList = addItem(snapshot, component.state.files);
            properties.component.setState({files: filesList});
        }
      }
    );
}

function upfile(properties,file, callback){
    if(file.size >= 25000000){
        console.log('file too big');
        return;
    }
    var component = properties.component;
    if(properties.roomId){
        var storeageRef = firebase.storage().ref(`room_files/${properties.roomId}/${component.state.currentUser.uid}/${file.name}`);
        var task = storeageRef.put(file);

        task.on('state_changed',
            function(snapshot){
                return callback();
            },
            function(error){
                return callback();
            },
            function(){
                let downloadURL = task.snapshot.downloadURL;
                let metadata = task.snapshot.metadata;
                let name = metadata.name;
                let size = metadata.size;
                let ts = metadata.generation;

                let refUri = "";

                if(metadata.contentType.includes("image")){
                    refUri = firebase.database().ref(`${constant.TABLE.rooms}/${properties.roomId}/${constant.ROOMS.sharedImages}`);
                    var img = new Image();
                    var _URL = window.URL || window.webkitURL;
                    img.src = _URL.createObjectURL(file);                        
                    img.onload = function () {
                        let item = {}
                        item[constant.SHARED_FILES.contentType] = metadata.contentType;
                        item[constant.SHARED_FILES.height] = this.height;
                        item[constant.SHARED_FILES.width] = this.width;
                        item[constant.SHARED_FILES.name] = name;
                        item[constant.SHARED_FILES.downloadURL] = downloadURL;
                        item[constant.SHARED_FILES.size] = size;
                        item[constant.SHARED_FILES.timeStamp] = ts;
                        item[constant.SHARED_FILES.senderId] = component.state.currentUser.uid;
                        refUri.push().set(item);
                        return callback();    
                    };
                }else{
                    refUri = firebase.database().ref(`${constant.TABLE.rooms}/${properties.roomId}/${constant.ROOMS.sharedFiles}`);
                    let item = {};
                    item[constant.SHARED_FILES.contentType] = metadata.contentType;
                    item[constant.SHARED_FILES.name] = name;
                    item[constant.SHARED_FILES.downloadURL] = downloadURL;
                    item[constant.SHARED_FILES.size] = size;
                    item[constant.SHARED_FILES.timeStamp] = ts;
                    item[constant.SHARED_FILES.senderId] = component.state.currentUser.uid;

                    refUri.push().set(item);
                    return callback();
                }
                
        })
    }
}
module.exports = {
    closeRef: function(){
        closeRef();
    },
    showImagesAndFilesList(properties){
        listenFromFilesFolder(properties);
        listenFromImagesFolder(properties);
    },
    listenFromImagesFolder: function(properties){
        listenFromImagesFolder(properties);
    },
    listenFromFilesFolder: function(properties){
        listenFromFilesFolder(properties);
    },
    upfile: function(properties,file, callback){
        upfile(properties, file, callback);
    }
}