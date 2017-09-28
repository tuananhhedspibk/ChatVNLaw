var constant = require('../../components/constants');
var convert_fields_helper = require('../helper/convert_fields_helper');
var convert_query_helper = require('../helper/convert_query_helper');
var axios_helper = require('../helper/axios_request_helper.js');

module.exports = {
    create: function(){
        
    },
    createToken: function(){

    },
    delete: function(userId, callback){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_USERID, userId);

        var config = {
            method: 'POST',
            url: constant.API_BASE_URL + constant.API_USER_DELETE_URL,
            headers: constant.headers,
            params: formData
        }
        axios_helper.request(config, function(response){
            return callback(response);
        });
    },
    getAvatar: function(userId, callback){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_USERID, userId);
        
        var config ={
            method: 'GET',
            url: constant.API_BASE_URL+constant.API_USER_GET_AVATAR_URL,
            params: formData,
            followAllRedirects: false
        }
        console.log(config);
        axios_helper.request(config, function(response){
            return callback(response);
        });
    },
    getPresence: function(userId, callback){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_USERID, userId);

        var config = {
            method: 'GET',
            url: constant.API_BASE_URL + constant.API_USER_GET_PRESENCE_URL,
            params: formData,
            headers: constant.headers
        }

        axios_helper.request(config, function(response){
            return callback(response);
        });
    },
    info: function(userId, callback){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_USERID, userId);
        
        var config ={
            method: 'GET',
            url: constant.API_BASE_URL+constant.API_USER_INFORMATION_URL,
            headers: constant.headers,
            params: formData
        }
        axios_helper.request(config, function(response){
            return callback(response);
        })
    },
    infoByUserName: function(username, callback){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_USERNAME, username);
        
        var config ={
            method: 'GET',
            url: constant.API_BASE_URL+constant.API_USER_INFORMATION_URL,
            headers: constant.headers,
            params: formData
        }
        axios_helper.request(config, function(response){
            return callback(response);
        })
    },
    list: function(fields = constant.DEFAULT_FIELDS, query = constant.DEFAULT_QUERY, callback){
       var formData = new URLSearchParams();
       var sendingFields;
       var sendingQuery;
       convert_fields_helper.convert_fields(fields, function(result){
           sendingFields = result;
       });
       convert_query_helper.convert_query(query, function(result){
           sendingQuery = result;
       });
       console.log(sendingFields);
       console.log(sendingQuery);
       formData.append(constant.API_ARGUMENT_FIELDS, sendingFields); 
       formData.append(constant.API_ARGUMENT_QUERY, sendingQuery);

       var config= {
           method: 'GET',
           url: constant.API_BASE_URL + constant.API_USER_LIST,
           headers:constant.headers,
           params: formData
       }
       axios_helper.request(config, function(response){
           return callback(response);
       })
    },
    register: function(username, email, password, name, callback){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_USERNAME, username);
        formData.append(constant.API_ARGUMENT_PASS, password);
        formData.append(constant.API_ARGUMENT_EMAIL, email);
        formData.append(constant.API_ARGUMENT_NAME,name);

        // var header = constant.headers;
        // header["Content-type"] = "application/x-www-form-urlencoded";
        
        var config = {
            method: 'post',
            url: constant.API_BASE_URL + constant.API_USER_REGISTER_URL,
            headers: constant.headers,
            data:formData
        }
        axios_helper.request(config, function(response){
            return callback(response);
        });
    },
    resetAvatar: function(userId, callback){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_USERID, userId);
        var header = constant.headers;
        header["Content-type"] = "application/x-www-form-urlencoded";
        var config = {
            method: 'POST',
            url: constant.API_BASE_URL + constant.API_USER_RESET_AVATAR_URL,
            headers: header,
            data: formData
        }
        axios_helper.request(config, function(response){
            return callback(response);
        })
    },
    setAvatarWithFile: function(imageFile, callback){
        var formData = new FormData();
        formData.append(constant.API_ARGUMENT_IMAGE,imageFile); 
        var header = {
            'X-Auth-Token': JSON.parse(localStorage.rocket_chat_user).auth_token,
            'X-User-Id': JSON.parse(localStorage.rocket_chat_user).user_id
        };
        var config = {
            method: 'POST',
            url: constant.API_BASE_URL + constant.API_USER_SET_AVATAR_URL,
            headers: header,
            data: formData
        }
        console.log(config);
        axios_helper.request(config, function(response){
            return callback(response);
        })
    },
    setAvatarWithImageUrl: function(avatarUrl,callback){
        var formData = new URLSearchParams();
        formData.append("avatarUrl",avatarUrl);

        var header = {
            'X-Auth-Token': JSON.parse(localStorage.rocket_chat_user).auth_token,
            'X-User-Id': JSON.parse(localStorage.rocket_chat_user).user_id,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        var config = {
            method: 'POST',
            url: constant.API_BASE_URL + constant.API_USER_SET_AVATAR_URL,
            headers: header,
            data: formData
        }
        console.log(config);
        axios_helper.request(config, function(response){
            return callback(response);
        })
    }
};