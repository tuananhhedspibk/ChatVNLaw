var firebase = require('firebase');
var constant = require('../../components/constants');

if(!firebase.apps.length){
    firebase.initializeApp(constant.APP_CONFIG);
}

module.exports = {
    upfile: function(properties,file,callback){
        console.log(file.size);
        if(file.size >= 25000000){
            console.log('file too big');
            return;
        }
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
                    console.log(task.snapshot);
                    let downloadURL = task.snapshot.downloadURL;
                    // console.log(downloadURL);
                    let metadata = task.snapshot.metadata;
                    console.log(metadata);
                    let name = metadata.name;
                    let size = metadata.size;
                    let ts = metadata.generation;

                    let refUri = "";

                    if(metadata.contentType.includes("image")){
                        refUri = firebase.database().ref().child('rooms').child(properties.roomId).child('room_images');
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
                                "sender_uid": properties.uid,
                                "photoURL": properties.photoURL
                            });
                            return callback();    
                        };
                    }else{
                        refUri = firebase.database().ref().child('rooms').child(properties.roomId).child('room_files');
                        refUri.push().set({
                            "contentType": metadata.contentType,
                            "name": name,
                            "contentType": metadata.contentType,
                            "downloadURL": downloadURL,
                            "size": size,
                            "ts": ts,
                            "sender_uid": properties.uid,
                            "photoURL": properties.photoURL                            
                        });
                        return callback();
                    }
                    
            })
        }
    },
    getFilesList: function(){
        
    }
}
