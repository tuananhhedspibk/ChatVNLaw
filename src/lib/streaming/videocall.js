var firebase = require('firebase');
var $ = require('jquery');
var constant = require('../constants');
var _call, _called;
var streamRef;

function closeMediaStream(stream, videoId){
    stream.getVideoTracks().forEach(function (track) {
        track.stop();
    });
    stream.getAudioTracks().forEach(function (track) {
        track.stop();
    });
    let video = $(videoId);
    video.removeAttr("src");
}

function openStream(callback){
    navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then(stream =>{
        callback(stream);
    })
    .catch(err => console.log(err));
}

function playVideo(stream, idVideo){
    const video = document.getElementById(idVideo);
    video.srcObject = stream;
    video.onloadedmetadata = function(){
        video.play();
    }
}

function closeStream(){
    try{
        _call.close();
        _called.close();
    }catch(err){
    }
}
function closeRef (){
    try{
        streamRef.off();
    }catch(err){

    }
}
function endCall(properties, callback){
    var ref = firebase.database().ref(`${constant.TABLE.rooms}/${properties.rid}/${constant.ROOMS.videoCall}/${constant.VIDEO_CALL.end}`).push()
    ref.set({
        end: true
    })
    ref.remove();
    firebase.database().ref(`${constant.TABLE.rooms}/${properties.rid}/${constant.ROOMS.videoCall}`).remove();
}
function createRequest(properties, callback){
    let ref = firebase.database().ref(`${constant.TABLE.rooms}/${properties.rid}/${constant.ROOMS.videoCall}/${constant.VIDEO_CALL.request}`);
    ref.set(properties.uid).then(function(){
        return callback(true);
    }).catch(err =>{
        return callback(false);        
    })
}
function checkRequest (properties,callback){
    let ref = firebase.database().ref(`${constant.TABLE.rooms}/${properties.rid}/${constant.ROOMS.videoCall}/${constant.VIDEO_CALL.request}`)
    ref.once('value').then(function(data){
        if(data.exists()){
            // console.log(data.val());
            if(data.val() !== properties.uid){
                return callback(true);                    
            }
            return callback(false);
        }else{
            return callback(false);
        }
    }).catch(function(err){
        console.log(err);
    })
}
function listenFromVideoCall(properties, callback){
    var component = properties.component;
    streamRef = firebase.database().ref(`${constant.TABLE.rooms}/${properties.roomId}/${constant.ROOMS.videoCall}`)
    streamRef.on('child_added', function(data){
        switch(data.key){
            case `${constant.VIDEO_CALL.request}`:
                var peerId = properties.peer.id;
                console.log(data.val());
                if(data.val() !== properties.peer.id){
                    if(window.confirm("video call from another user")){
                        streamRef.child(`${constant.VIDEO_CALL.request}`).remove();
                        let ref = streamRef.child(`${constant.VIDEO_CALL.stream}`)
                        ref.set(peerId)
                        ref.remove();
                        component.renderVideo();
                    }else{
                        streamRef.child(`${constant.VIDEO_CALL.request}`).remove();
                        let cancelRequestRef = streamRef.child(`${constant.VIDEO_CALL.cancelRequest}`);
                        cancelRequestRef.set(component.state.currentUser.uid);
                        cancelRequestRef.remove();
                    }
                }
                break;
            case `${constant.VIDEO_CALL.stream}`:
                let peer = properties.peer;
                let targetPeerId = data.val();
                if(targetPeerId !== peer.id){
                    openStream(stream =>{
                        let call = peer.call(targetPeerId,stream);
                        call.on('stream',remoteStream =>{
                            playVideo(remoteStream,'localStream');
                        })
                        call.on('close', function(){
                            closeMediaStream(stream, '#localStream');
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
            case `${constant.VIDEO_CALL.end}`:
                try{
                    _call.close();
                    _called.close();
                }catch(err){
                }finally{
                    properties.component.showAlert('end call');
                }
                break;
            case `${constant.VIDEO_CALL.cancelRequest}`:
                if(data.val() !== properties.uid){
                    properties.component.showAlert('cancel request');                                
                }
                break;
            default:
                break;
        }
        
    })
    return callback(streamRef);
}
module.exports = {
    checkRequest: function(properties,callback){
        checkRequest(properties,callback);
    },
    createRequest: function(properties, callback){
        createRequest(properties,callback);
    },
    endCall: function(properties, callback){
        endCall(properties,callback);
    },
    closeStream: function(properties, callback){
        closeStream(properties,callback);
    },
    closeRef: function(properties,callback){
        closeRef(properties,callback);
    },
    listenFromVideoCall: function(properties, callback){
        listenFromVideoCall(properties,callback);
    }
}