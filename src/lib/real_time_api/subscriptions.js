var ddp = require('ddp-client');
var ddpClient = new ddp({
    host : "localhost",
    port : 4000
});
module.exports = {
    streamRoomMessages: function(roomId,callback){
        ddpClient.connect(function(error, wasReconnect) {
            // If autoReconnect is true, this callback will be invoked each time 
            // a server connection is re-established 
            if (error) {
              console.log('DDP connection error!');
              return;
            }
           
            if (wasReconnect) {
              console.log('Reestablishment of a connection.');
            }
            const tokenParams = {
                resume: JSON.parse(localStorage.rocket_chat_user).auth_token
            }
            ddpClient.call('login', [tokenParams], function (err, result) { 
                if(err){
                  console.log(err);
                }else{
                    ddpClient.subscribe("stream-room-messages", [roomId, false], function() {
                       
                        ddpClient.on("message", function(msg) {
                            return callback(msg);
                        });
                    });
                }
            });
        });
    },
    streamNotifyAll: function(event, callback){
        ddpClient.connect(function(error, wasReconnect) {
            // If autoReconnect is true, this callback will be invoked each time 
            // a server connection is re-established 
            if (error) {
              console.log('DDP connection error!');
              return;
            }
           
            if (wasReconnect) {
              console.log('Reestablishment of a connection.');
            }
            const tokenParams = {
                resume: JSON.parse(localStorage.rocket_chat_user).auth_token
            }
            ddpClient.call('login', [tokenParams], function (err, result) { 
                if(err){
                  console.log(err);
                }else{
                    ddpClient.subscribe("stream-notify-all",[event,false], function() {
                       
                        ddpClient.on("message", function(msg) {
                            return callback(msg);
                        });
                    });
                }
            });
        });
    }
}