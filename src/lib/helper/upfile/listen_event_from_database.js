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
module.exports = {
    closeRef: function(){
        try{
            fileRef.off();
            imageRef.off();
        }catch(err){

        }
    },
    listenFromImageFolder : function(properties, callback){
        imageRef = firebase.database().ref().child('rooms').child(properties.rid).child('room_images');
        imageRef.on('child_added',function(snapshot){
          if(snapshot.exists()){
              console.log(snapshot);
            let imagesList = addItem(snapshot,properties.imagesList);
            properties.component.setState({images_list: imagesList});
            }
          }
        );
        return callback(imageRef);
    },
    listenFromFilesFolder: function(properties, callback){
        fileRef = firebase.database().ref().child('rooms').child(properties.rid).child('room_files');
        fileRef.on('child_added', function(snapshot){
            if(snapshot.exists()){
                let filesList = addItem(snapshot, properties.filesList);
                properties.component.setState({files_list: filesList});
            }
          }
        );
        return callback(fileRef);
    }
}