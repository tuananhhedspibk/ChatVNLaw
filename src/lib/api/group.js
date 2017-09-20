var constant = require('../../components/constants');
var axios_helper = require('../helper/axios_request_helper.js');

module.exports = {
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
            url: constant.API_BASE_URL + constant.API_GROUPS_CREATE,
            headers: header,
            data: formData
        }
        axios_helper.request(config, function(response){
            return callback(response);
        });
    },
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
            url: constant.API_BASE_URL + constant.API_GROUPS_HISTORY,
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
            url: constant.API_BASE_URL + constant.API_GROUPS_INFO,
            headers: constant.headers,
            params: formData
        }

        axios_helper.request(config, function(response){
            return callback(response);
        })
    }
}