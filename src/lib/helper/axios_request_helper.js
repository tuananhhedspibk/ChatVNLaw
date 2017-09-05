var axios = require('axios');

module.exports = {
    request : function(config, callback){
        axios.request(config)
        .then((response)=>{
            console.log(response);
            return callback(response);
        })
        .catch(function(error){
            console.log(error);
            return callback(error);
        });
    }
}