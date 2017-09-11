/**
 * require auth: logout, me
 */

var constant = require('../../components/constants');
var axios_helper = require('../helper/axios_request_helper.js');

module.exports ={
  login: function(username, password, callback){
    var formData = new URLSearchParams();
    formData.append(constant.API_ARGUMENT_USERNAME, username);
    formData.append(constant.API_ARGUMENT_PASSWORD, password);
    
    var config = {
        method: 'POST',
        url: constant.API_BASE_URL + constant.API_LOGIN_URL,
        data: formData
    }
    axios_helper.request(config, function(response){
      if (response.status === 200) {
        let rocket_chat_user = {
          auth_token: response.data.data.authToken,
          user_id: response.data.data.userId,
          user_name: username
        };
        localStorage.setItem(constant.STORAGE_ITEM, JSON.stringify(rocket_chat_user));
        // window.location = constant.BASE_URL; 
      }
      return callback(response);
    });
  },

  logout: function(callback){
    var config = {
        method: 'POST',
        url: constant.API_BASE_URL + constant.API_LOGOUT_URL,
        headers: constant.headers
    }
    axios_helper.request(config, function(response){
      if(response.status === 200){
        localStorage.removeItem(constant.STORAGE_ITEM);
      }
      return callback(response);
    });
  },
    
  me: function(callback){
    var config = {
        method: 'GET',
        url: constant.API_BASE_URL + constant.API_ME_URL,
        headers: constant.headers
    }
    axios_helper.request(config, function(response){
      return callback(response);
    });
  }
};
