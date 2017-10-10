var $ = require('jquery');

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
module.exports = closeMediaStream;