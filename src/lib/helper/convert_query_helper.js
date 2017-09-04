var constant = require('../../components/constants');

module.exports = {
    convert_query: function(query = constant.DEFAULT_QUERY){
        var str = ""
        str += "{"
        for(key in query){
            if(Object.keys(query[key]).length != 0){
                str += "\""+key+"\":{\"\$in\":[";
                for(key1 in query[key]){
                    str+="\""+query[key][key1]+"\",";
                }
                str = str.slice(0, -1);
                str += "]},"
            }
        }
        if (str.length > 1) {
            str = str.slice(0, -1);
        }
        str += "}";
        return str;
    }
}