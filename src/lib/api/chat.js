var constant = require('../../components/constants');
var axios_helper = require('../helper/axios_request_helper.js');

module.exports = {
    delete: function(roomId, msgId, asUser = false, callback){
        var formParam = new URLSearchParams();
        formParam.append(constant.API_ARGUMENT_ROOMID, roomId);
        formParam.append(constant.API_ARGUMENT_MSGID, msgId);
        formParam.append(constant.API_ARGUMENT_AS_USER, asUser);

        var config = {
            method: 'POST',
            url: constant.API_BASE_URL + constant.API_CHAT_DELETE,
            headers: constant.headers,
            data: formParam
        }

        axios_helper.request(config, function(response){
            return callback(response);
        });
    },
    postMessage: function(roomId, channel="", text="", alias="", emoji="", avatar="", attachments = [], callback){
        var formParam = new URLSearchParams();

        formParam.append(constant.API_ARGUMENT_ROOMID, roomId);
        formParam.append(constant.API_ARGUMENT_CHANNEL, channel);
        formParam.append(constant.API_ARGUMENT_TEXT, text);
        formParam.append(constant.API_ARGUMENT_ALIAS, alias);
        formParam.append(constant.API_ARGUMENT_EMOJI,emoji);
        formParam.append(constant.API_ARGUMENT_AVATAR, avatar);
        formParam.append(constant.API_ARGUMENT_ATTACHMENTS, attachments);

        var config = {
            method: 'POST',
            url: constant.API_BASE_URL + constant.API_CHAT_POST_MESSAGE,
            headers: constant.headers,
            data: formParam
        }

        axios_helper.request(config, function(response){
            return callback(response);
        });
    }
}