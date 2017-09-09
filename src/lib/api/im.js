var constant = require('../../components/constants');
var axios_helper = require('../helper/axios_request_helper.js');

module.exports = {
    history: function(roomId,callback){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_ROOMID, roomId);

        var config = {
            method: 'GET',
            url: constant.API_BASE_URL + constant.API_IM_HISTORY,
            headers: constant.headers,
            params: formData
        }
        axios_helper.request(config,function(response){
            return callback(response);
        });
    }
}