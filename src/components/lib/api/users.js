/**
 * require auth: create
 */
var axios = require('axios');
var constant = require('../../constants');

module.exports ={
    create: function(){
        
    },
    createToken: function(){

    },
    delete: function(){

    },
    getAvatar: function(){

    },
    getPresence: function(){

    },
    info: function(){

    },
    list: function(){

    },
    register: function(username, email, password, name){
        var formData = new URLSearchParams();
        formData.append(constant.API_ARGUMENT_USERNAME, username);
        formData.append(constant.API_ARGUMENT_PASS, password);
        formData.append(constant.API_ARGUMENT_EMAIL, email);
        formData.append(constant.API_ARGUMENT_NAME,name);

        config = {
            method: 'post',
            url: constant.API_BASE_URL + constant.API_USER_REGISTER_URL,
            headers:{
                "Content-type":"application/json"
            },
            data:formData
        }
        axios.request(config)
        .then((response) => {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
    }
};