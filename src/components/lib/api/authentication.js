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
    
        axios.post(constant.API_BASE_URL + constant.API_LOGIN_URL, formData)
        .then(response => {
        let rocket_chat_user = {
            auth_token: response.data.data.authToken,
            user_id: response.data.data.userId
        };
    
        localStorage.setItem(constant.STORAGE_ITEM, JSON.stringify(rocket_chat_user));
        window.location = constant.BASE_URL;
        
        })
        .catch(error => {
        alert(error);
       
        });
    },

    logout: function(){
        axios.get(constant.API_BASE_URL + constant.API_LOGOUT_URL,constant.headers)
        .then((response) => {
          localStorage.removeItem(constant.STORAGE_ITEM);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    
    me: function(){
        axios.get(constant.API_BASE_URL + constant.API_ME_URL, constant.headers)
        .then((response)=>{
            return response;
        })
        .catch(function(error){
            console.log(error);
        })
    }
};


