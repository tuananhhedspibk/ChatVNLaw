var axios = require('axios');
var constant = require('../../constants');
var convert_fields_helper = require('../helper/convert_fields_helper');

module.exports = {
    create: function(){
        
    },
    createToken: function(){

    },
    delete: function(){

    },
    getAvatar: function(userId){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_USERID, userId);
        
        var config ={
            method: 'GET',
            url: constant.API_BASE_URL+constant.API_User_GET_AVATAR_URL,
            params: formData
        }

        axios.request(config)
        .then((response) => {
            return response;
        })
        .catch(function (error) {
            return error;
        });
    },
    getPresence: function(){

    },
    info: function(){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_USERID, userId);
        
        var config ={
            method: 'GET',
            url: constant.API_BASE_URL+constant.API_USER_INFORMATION_URL,
            headers: constant.headers,
            params: formData
        }

        axios.request(config)
        .then((response) => {
            return response;
        })
        .catch(function (error) {
            return error;
        });
    },
    list: function(fields = constant.DEFAULT_FIELDS, query){
       var formData = new URLSearchParams();
       formData.append(constant.API_ARGUMENT_FIELDS,convert_fields_helper.convert_fields(fields)); 
       formData.append(constant.API_ARGUMENT_QUERY, query);
       
       var config= {
           method: 'GET',
           url: constant.API_BASE_URL + constant.API_USER_LIST,
           headers:constant.headers,
           data: formData
       }

       axios.request(config)
       .then((response) => {
           return response;
       })
       .catch(function (error) {
           return error;
       });
    },
    register: function(username, email, password, name){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_USERNAME, username);
        formData.append(constant.API_ARGUMENT_PASS, password);
        formData.append(constant.API_ARGUMENT_EMAIL, email);
        formData.append(constant.API_ARGUMENT_NAME,name);

        var config = {
            method: 'post',
            url: constant.API_BASE_URL + constant.API_USER_REGISTER_URL,
            headers:{
                "Content-type":"application/x-www-form-urlencoded"
            },
            data:formData
        }
        axios.request(config)
        .then((response) => {
            return response;
        })
        .catch(function (error) {
            return error;
        });
    }
};