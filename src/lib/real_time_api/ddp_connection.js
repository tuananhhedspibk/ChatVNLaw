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
    loginWithUserParams: function(user_name, pass_word, callback){
        const params = {
            user : { username : user_name }, password : pass_word
        }
        ddpClient.call('login', [params], function (err, result) { 
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
        ddpClient.call('loadHistory',[roomId,null,15,null], function(err, result){
            if(err){
                return callback(false, err);
            }else{
                console.log(result);
                return callback(true, result);
            }
        })
    },
    openRoom: function(roomId){
        ddpClient.call('openRoom',[roomId]);
    },
    createPrivateGroup: function(channel_name, callback){
        ddpClient.call('createPrivateGroup',channel_name,function(err,result){
            if(err){
                return callback(false,err);
            }else{
                return callback(true,result);
            }
        })
    },
    userPresence: function(status, callback){
        ddpClient.call('UserPresence:setDefaultStatus', [status], function(err,result){
            if(err){
                return callback(false,err);
            } else{
                return callback(true,result);
            }
        });
    },
    userData: function(userId,callback){
        ddpClient.call('userData' , [userId],function(err,result){
            if(err){
                return callback(false,err);
            } else{
                return callback(true,result);
            }
        });
    }
}