const firebase = require('firebase');

module.exports = {
    listenFromImageFolder : function(properties, callback){
        let imageRef = firebase.database().ref().child('rooms').child(properties.rid).child('room_images');
        imageRef.on('child_added',function(snapshot){
          if(snapshot.exists()){
            let item = {}
            snapshot.forEach(function(element){
                item[element.key] = element.val();
            })
            let imagesList = properties.imagesList;
            imagesList.push(item);
            properties.component.setState({images_list: imagesList});
            //   imagesList.push(item);
            //   component.setState({images_list: imagesList});
            }
          }
        );
        return callback(imageRef);
    },
    listenFromFilesFolder: function(properties, callback){
        let fileRef = firebase.database().ref().child('rooms').child(properties.rid).child('room_files');
        fileRef.on('child_added', function(snapshot){
          if(snapshot.exists()){
            let item = {}
                snapshot.forEach(function(element){
                    item[element.key] = element.val();
                })
                let filesList = properties.filesList;
                filesList.push(item);
                properties.component.setState({files_list: filesList});
            }
          }
        );
        return callback(fileRef);
    }
}