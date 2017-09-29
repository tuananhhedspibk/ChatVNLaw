var constant = require('../../components/constants');

module.exports = {
    exportItem : function(data,properties){
        let item = {};
        item["_id"] = data.key;
        item["text"] = data.val().text;
        item["sender_uid"] = data.val().sender_uid;
        item["msg_ts"] = data.val().msg_ts;

        if(item["sender_uid"] === properties.uid){
          item["type"] = 0;
          item["image"] = constant.avaUser;
        }else{
          item["type"] = 1;
          item["image"] = constant.avaLawyer;
        }
        return item;
    }
}