var firebase = require('firebase');
var constant = require('../../components/constants');

if(!firebase.apps.length){
    firebase.initializeApp(constant.APP_CONFIG);
}

module.exports = {
    upfile: function(properties,file,callback){
        if(properties.roomId){
            var storeageRef = firebase.storage().ref(constant.ROOM_FILES+'/'+properties.roomId+'/'+properties.uid+'/'+file.name);
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
                    // console.log(downloadURL);
                    let metadata = task.snapshot.metadata;
                    let name = metadata.name;
                    let size = metadata.size;
                    let ts = metadata.generation;

                    let refUri = "";

                    if(metadata.contentType.includes("image")){
                        refUri = firebase.database().ref().child('rooms').child(properties.roomId).child('room_images');
                        }else{
                        refUri = firebase.database().ref().child('rooms').child(properties.roomId).child('room_files');
                    }
                    refUri.push().set({
                        "name": name,
                        "contentType": metadata.contentType,
                        "downloadURL": downloadURL,
                        "size": size,
                        "ts": ts,
                        "sender_uid": properties.uid
                    });
                    return callback();
            })
        }
    },
    getFilesList: function(){
        
    }
}
