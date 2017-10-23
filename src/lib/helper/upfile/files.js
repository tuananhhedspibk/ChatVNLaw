const firebase = require('firebase');
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
    }
}