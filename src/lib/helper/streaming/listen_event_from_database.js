const firebase = require('firebase');
const openStream = require('./open_stream');
const playVideo = require('./play_video');
const closeMediaStream = require('./close_media_stream');
var _call, _called;
function ahihi(){
    console.log('123')
}
module.exports = {
    listenFromVideoCall: function(properties, callback){
        let ref = firebase.database().ref(`rooms/${properties.rid}`)
        ref.on('child_added', function(data){
            switch(data.key){
                case 'video_call':
                    let videoCallRef = ref.child('video_call');
                    switch(Object.keys(data.val())[0]){
                        case 'request':
                            var roomId = properties.rid;
                            var peerId = properties.peer.id;
                            if(Object.keys(data.val().request)[0] !== peerId){
                                if(window.confirm("video call from another user")){
                                    videoCallRef.child('request').remove();
                                    let streamRef = videoCallRef.child('stream').child(peerId)
                                    .push({
                                        "id": "123"
                                    })
                                    streamRef.remove();
                                }else{
                                    videoCallRef.child('request').remove();
                                    let cancelRequestRef = videoCallRef.child('cancel_request').child(properties.uid).push({
                                        "msg":"111"
                                    });
                                    cancelRequestRef.remove();
                                }
                            }
                            break;
                        case 'stream':
                            let peer = properties.peer;
                            let targetPeerId = Object.keys(data.val().stream)[0];
                            if(targetPeerId !== peer.id){
                                openStream(stream =>{
                                    let call = peer.call(targetPeerId,stream);
                                    call.on('stream',remoteStream =>{
                                        playVideo(remoteStream,'localStream');
                                    })
                                    call.on('close', function(){
                                        closeMediaStream(stream, properties.vid);
                                    })
                                    _call = call;                            
                                })
                            } else{
                                peer.on('call', function(called) {
                                    openStream(stream =>{
                                      called.answer(stream);
                                      called.on('stream',remoteStream =>{
                                        playVideo(remoteStream,'localStream');
                                      })
                                      called.on('close', function(){
                                        closeMediaStream(stream, '#localStream');          
                                      })
                                      _called = called;                              
                                    })
                                });
                            }
                            break;
                        case 'end':
                            try{
                                _call.close();
                                _called.close();
                            }catch(err){
                            }finally{
                                alert('end call');                                                
                            }
                            break;
                        case 'cancel':
                            if(Object.keys(data.val().cancel)[0] !== properties.uid){
                                alert('cancel request');
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 'room_images':
                    var jsonData = Object.values(data.val())[0];
                    var item = {};
                    item["_id"] = Object.keys(data.val())[0]
                    item["contentType"] = jsonData.contentType
                    item["downloadURL"] = jsonData.downloadURL
                    item["height"] = jsonData.height
                    item["name"]= jsonData.name
                    item["photoURL"] = jsonData.photoURL
                    item["sender_uid"] = jsonData.sender_uid
                    item["size"] = jsonData.size
                    item["ts"] = jsonData.ts
                    item["width"] = jsonData.width
                    
                    let imagesList = properties.imagesList;
                    imagesList.push(item);
                    properties.component.setState({images_list: imagesList})
                    break;
                case 'room_files':
                    var jsonData = Object.values(data.val())[0];
                    var item = {};
                    item["_id"] = Object.keys(data.val())[0]
                    item["contentType"] = jsonData.contentType
                    item["downloadURL"] = jsonData.downloadURL
                    item["name"]= jsonData.name
                    item["photoURL"] = jsonData.photoURL
                    item["sender_uid"] = jsonData.sender_uid
                    item["size"] = jsonData.size
                    item["ts"] = jsonData.ts
                    
                    let filesList = properties.filesList;
                    filesList.push(item);
                    properties.component.setState({files_list: filesList});
                    break;
                default: 
                    break;
            }
            console.log(data.key);
            // 
        })
        return callback(ref);
    }
}