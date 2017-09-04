var constant = require('../../components/constants');

module.exports = {
    convert_fields = function(fields = DEFAULT_FIELDS){
        var str = ""
        str += "{"	
        var key;
        for (key in fields){
            str+= "\""+key+"\":"+fields[key]+",";
        }
        str = str.slice(0, -1);
        str += "}"
        return str;
    }
};