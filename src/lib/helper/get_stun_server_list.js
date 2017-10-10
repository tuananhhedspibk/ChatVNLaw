// Node Get ICE STUN and TURN list
const https = require("https");
const constant = require('../../components/constants');

function getStunServerList(){
    var options = {
        host: "global.xirsys.net",
        path: "/_turn/MyFirstApp",
        method: "PUT",
        headers: {
            "Authorization": "Basic " + new Buffer("lkbcteam:54beba0c-a6d2-11e7-ae16-600b82d3c98a").toString("base64")
        }
    };
    var httpreq = https.request(options, function(httpres) {
        var str = "";
        httpres.on("data", function(data){ str += data; });
        httpres.on("error", function(e){ console.log("error: ",e); });
        httpres.on("end", function(){ 
            str = JSON.stringify(JSON.parse(str).v);
            localStorage.setItem(constant.STUN_SERVER_LIST, str);
        });
    });
    httpreq.end();
}

module.exports = getStunServerList;