var constant = require('../../components/constants');
var axios_helper = require('../helper/axios_request_helper.js');

module.exports = {
    // addALL : function(roomId, activeUsersOnly = false, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_ROOMID, roomId);
    //     formData.append(constant.API_ARGUMENT_ACTIVE_USER_ONLY, activeUsersOnly);
        
    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_ADD_ALL,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config, function(response){
    //         return callback(response);
    //     });
    // },
    // addModerator: function(roomId, userId, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);
    //     formData.append(constant.API_ARGUMENT_ROOMID, roomId);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_ADD_MODERATOR,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // addOwner: function(roomId, userId, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);
    //     formData.append(constant.API_ARGUMENT_ROOMID, roomId);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_ADD_OWNER,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // archive: function(roomId,callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_ROOMID, roomId);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_ARCHIVE,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // cleanHistory: function(roomId, latest, oldest, inclusive = false, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_ROOMID, roomId);
    //     formData.append(constant.API_ARGUMENT_LATEST, latest);
    //     formData.append(constant.API_ARGUMENT_OLDEST, oldest);
    //     formData.append(constant.API_ARGUMENT_INCLUSIVE,inclusive);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_CLEAN_HISTORY,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // close: function(roomId,callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_ROOMID, roomId);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_CLOSE,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    create: function(name, members = [], callback){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_NAME, name);
        formData.append(constant.API_ARGUMENT_MEMBERS, members);

        var header = {
            'X-Auth-Token': JSON.parse(localStorage.rocket_chat_user).auth_token,
            'X-User-Id': JSON.parse(localStorage.rocket_chat_user).user_id,
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        var config = {
            method: 'POST',
            url: constant.API_BASE_URL + constant.API_CHANNELS_CREATE,
            headers: header,
            data: formData
        }
        axios_helper.request(config, function(response){
            return callback(response);
        });
    },
    // genIntegrations: function(roomId, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_ROOMID, roomId);

    //     var config = {
    //         method: 'GET',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_CLOSE,
    //         headers: constant.headers,
    //         params: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // history: function(roomId, latest,oldest, inclusive = false, count = 20,unreads = false, callback){
    history: function(roomId, latest, count = 15, callback){
            
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_ROOMID, roomId);
        formData.append(constant.API_ARGUMENT_LATEST, latest);
        // formData.append(constant.API_ARGUMENT_OLDEST, oldest);
        // formData.append(constant.API_ARGUMENT_INCLUSIVE, inclusive);
        formData.append(constant.API_ARGUMENT_COUNT, count);
        // formData.append(constant.API_ARGUMENT_UNREADS, unreads);

        var config = {
            method: 'GET',
            url: constant.API_BASE_URL + constant.API_CHANNELS_HISTORY,
            headers: constant.headers,
            params: formData
        }
        axios_helper.request(config, function(response){
            return callback(response);
        });
    },
    info: function(roomId, roomName, callback){
        var formData = new URLSearchParams();
        if(typeof roomId !== 'undefined' && roomId){
            formData.append(constant.API_ARGUMENT_ROOMID, roomId);            
        }
        if(typeof roomName !== 'undefined' && roomName){
            formData.append(constant.API_ARGUMENT_ROOM_NAME, roomName);        
        }

        var config = {
            method: 'GET',
            url: constant.API_BASE_URL + constant.API_CHANNELS_INFO,
            headers: constant.headers,
            params: formData
        }

        axios_helper.request(config, function(response){
            return callback(response);
        })
    },
    // invite: function(roomId, userId, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);
    //     formData.append(constant.API_ARGUMENT_ROOMID, roomId);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_INVITE,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // kick: function(roomId, userId, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);
    //     formData.append(constant.API_ARGUMENT_ROOMID, roomId);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_KICK,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // leave: function(userId, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_LEAVE,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // listJoined: function(callback){
    //     var config = {
    //         method: 'GET',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_LIST_JOINED,
    //         headers: constant.headers,
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     })
    // },
    // list: function(callback){
    //     var config = {
    //         method: 'GET',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_LIST,
    //         headers: constant.headers,
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     })
    // },
    open: function(roomId, callback){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_ROOMID, roomId);

        var config = {
            method: 'POST',
            url: constant.API_BASE_URL + constant.API_CHANNELS_OPEN,
            headers: constant.headers,
            data: formData
        }
        axios_helper.request(config,function(response){
            return callback(response);
        });
    },
    // removeModerator: function(roomId, userId, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);
    //     formData.append(constant.API_ARGUMENT_ROOMID, roomId);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_REMOVE_MODERATOR,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // removeOwner: function(roomId, userId, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);
    //     formData.append(constant.API_ARGUMENT_ROOMID, roomId);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_REMOVE_OWNER,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // rename: function(roomId, name, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);
    //     formData.append(constant.API_ARGUMENT_NAME, name);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_RENAME,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // setDescription: function(roomId, description, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);
    //     formData.append(constant.API_ARGUMENT_DESCRIPTION, description);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_SET_DESCRIPTION,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // setJoinCode: function(roomId, joinCode, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);
    //     formData.append(constant.API_ARGUMENT_JOIN_CODE, joinCode);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_SET_JOIN_CODE,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // setPurpose: function(roomId, purpose, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);
    //     formData.append(constant.API_ARGUMENT_PURPOSE, purpose);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_SET_JOIN_CODE,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // setReadOnly: function(roomId, readOnly = true, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);
    //     formData.append(constant.API_ARGUMENT_READ_ONLY, readonly);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_SET_READ_ONLY,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // setTopic: function(roomId, topic, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);
    //     formData.append(constant.API_ARGUMENT_TOPIC, topic);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_SET_TOPIC,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // setType: function(roomId, type, callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);
    //     formData.append(constant.API_ARGUMENT_TYPE, type);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_SET_TYPE,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
    // unarchive: function(roomId,  callback){
    //     var formData = new URLSearchParams();
    //     formData.append(constant.API_ARGUMENT_USERID, userId);

    //     var config = {
    //         method: 'POST',
    //         url: constant.API_BASE_URL + constant.API_CHANNELS_UNARCHIVE,
    //         headers: constant.headers,
    //         data: formData
    //     }
    //     axios_helper.request(config,function(response){
    //         return callback(response);
    //     });
    // },
}