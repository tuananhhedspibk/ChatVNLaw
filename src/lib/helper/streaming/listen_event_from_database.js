const firebase = require('firebase');
const openStream = require('./open_stream');
const playVideo = require('./play_video');
const closeMediaStream = require('./close_media_stream');
var _call, _called;
var streamRef;
module.exports = {
    closeStream: function(){
        try{
            _call.close();
            _called.close();
        }catch(err){
        }
    },
    closeRef: function(){
        try{
            streamRef.off();
        }catch(err){

        }
    },
    listenFromVideoCall: function(properties, callback){
        streamRef = firebase.database().ref(`rooms/${properties.rid}/video_call`)
        streamRef.on('child_added', function(data){
            switch(data.key){
                case 'request':
                    var peerId = properties.peer.id;
                    if(Object.keys(data.val())[0] !== properties.uid){
                        if(window.confirm("video call from another user")){
                            streamRef.child('request').remove();
                            let ref = streamRef.child(`stream/${peerId}`)
                            .push({
                                "id": "123"
                            })
                            ref.remove();
                        }else{
                            streamRef.child('request').remove();
                            let cancelRequestRef = streamRef.child(`cancel/${properties.uid}`).push({
                                "msg":"111"
                            });
                            cancelRequestRef.remove();
                        }
                    }
                    break;
                case 'stream':
                    let peer = properties.peer;
                    let targetPeerId = Object.keys(data.val())[0];
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
                        console.log('111');
                        console.log(peer);
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
                        properties.component.showAlert('end call');
                    }
                    break;
                case 'cancel':
                    if(Object.keys(data.val())[0] !== properties.uid){
                        properties.component.showAlert('cancel request');                                
                    }
                    break;
                default:
                    break;
            }
            
        })
        return callback(streamRef);
    }
}