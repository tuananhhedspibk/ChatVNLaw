const https = require("https");
const constant = require('./constants');

function getStunServerList(callback){
    var options = constant.STUN_SERVER_OPTIONS;
    var httpreq = https.request(options, function(httpres) {
        var str = "";
        httpres.on("data", function(data){ str += data; });
        httpres.on("error", function(e){ console.log("error: ",e); });
        httpres.on("end", function(){ 
            str = JSON.stringify(JSON.parse(str).v);
            localStorage.setItem(constant.STUN_SERVER_LIST, str);
            return callback();
        });
    });
    httpreq.end();
}

module.exports = getStunServerList;
