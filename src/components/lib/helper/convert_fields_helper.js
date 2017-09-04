var constant = require('../../constants');

module.exports = {
    convert_fields = function(fields = DEFAULT_FIELDS){
        var str = ""
        str += "{"	
        var key;
        for (key in DEFAULT_FIELDS){
            str+= "\""+key+"\":"+DEFAULT_FIELDS[key]+",";
        }
        str = str.slice(0, -1);
        str += "}"
        return str;
    }
};