const firebase = require('firebase');
var constant = require('../../../components/constants');

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
    imageRef = firebase.database().ref().child(`rooms/${properties.roomId}/room_images`);
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
    fileRef = firebase.database().ref().child(`rooms/${properties.roomId}/room_files`);
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
        var storeageRef = firebase.storage().ref(`${constant.ROOM_FILES}/${properties.roomId}/${component.currentUser.uid}/${file.name}`);
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
                    refUri = firebase.database().ref(`rooms/${properties.roomId}/room_images`);
                    var img = new Image();
                    var _URL = window.URL || window.webkitURL;
                    img.src = _URL.createObjectURL(file);                        
                    img.onload = function () {
                        let height = this.height;
                        let width = this.width;
                        refUri.push().set({
                            "contentType": metadata.contentType,
                            "height": height,
                            "width": width,
                            "name": name,
                            "downloadURL": downloadURL,
                            "size": size,
                            "ts": ts,
                            "sender_uid": component.currentUser.uid
                        });
                        return callback();    
                    };
                }else{
                    refUri = firebase.database().ref(`rooms/${properties.roomId}/room_files`);
                    refUri.push().set({
                        "contentType": metadata.contentType,
                        "name": name,
                        "downloadURL": downloadURL,
                        "size": size,
                        "ts": ts,
                        "sender_uid": component.currentUser.uid
                    });
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