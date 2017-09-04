/**
 * require auth: logout, me
 */

var axios = require('axios');
var constant = require('../../constants');

module.exports ={
  login: function(username, password){
    var formData = new URLSearchParams();
    formData.append(constant.API_ARGUMENT_USERNAME, username);
    formData.append(constant.API_ARGUMENT_PASSWORD, password);
    
    var config = {
        method: 'POST',
        url: constant.API_BASE_URL + constant.API_LOGIN_URL,
        data: formData
    }
    axios.request(config)
    .then(response => {
      let rocket_chat_user = {
        auth_token: response.data.data.authToken,
        user_id: response.data.data.userId
      };
      localStorage.setItem(constant.STORAGE_ITEM, JSON.stringify(rocket_chat_user));
      window.location = constant.BASE_URL;  
      return response;  
    })
    .catch(error => {
      alert(error); 
      return error;
    });
  },

  logout: function(){
    var config = {
        method: 'POST',
        url: constant.API_BASE_URL + constant.API_LOGOUT_URL,
        headers: constant.headers
    }
    axios.request(config)
    .then((response) => {
      localStorage.removeItem(constant.STORAGE_ITEM);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  },
    
  me: function(){
    var config = {
        method: 'GET',
        url: constant.API_BASE_URL + constant.API_ME_URL,
        headers: constant.headers
    }
    axios.request(config)
    .then((response)=>{
      return response;
    })
    .catch(function(error){
      console.log(error);
      return error;
    })
  }
};
