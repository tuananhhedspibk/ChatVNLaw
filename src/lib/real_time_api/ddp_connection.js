var ddp = require('ddp-client');
var ddpClient = new ddp({
    host : "localhost",
    port : 4000
});

module.exports = {
    connect : function(callback){
        ddpClient.connect(function(error, wasReconnect) {
            if (error) {
                console.log('DDP connection error!');
                return;
            }
                
            if (wasReconnect) {
                console.log('Reestablishment of a connection.');
            }
            console.log("connected");
            return callback();
        });
    },
    login: function (callback){
        const tokenParams = {
            resume: JSON.parse(localStorage.rocket_chat_user).auth_token
       }
       ddpClient.call('login', [tokenParams], function (err, result) { 
           if(err){
               console.log("error");
           }else{
               return callback();
           }
           
       });	
    }, 
    close: function(){
        ddpClient.close();
    },
    unsubscribe: function(id, callback){
        ddpClient.unsubscribe(id);
        return callback();
    },
    streamRoomMessages: function(roomId, callback){    
        var id = ddpClient.subscribe("stream-room-messages", [roomId, false], function() {
            
            ddpClient.on("message", function(msg) {
                // console.log(msg);
                return callback(id, msg);
            });            
        });
    },
    loadHistory: function(roomId, callback){
        ddpClient.call('loadHistory',[roomId], function(err, result){
            if(err){
                return callback(false, err);
            }else{
                return callback(true, result);
            }
        })
    },
    openRoom: function(roomId){
        ddpClient.call('openRoom',[roomId]);
    }
}