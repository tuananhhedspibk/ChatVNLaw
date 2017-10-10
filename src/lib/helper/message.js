var constant = require('../../components/constants');
function exportItem(data,properties){
  let item = {};
  item["_id"] = data.key;
  item["text"] = data.val().text;
  item["sender_uid"] = data.val().sender_uid;
  item["msg_ts"] = data.val().msg_ts;

  if(item["sender_uid"] === properties.uid){
    item["type"] = 0;
    item["image"] = data.val().photoURL;
  }else{
    item["type"] = 1;
    item["image"] = data.val().photoURL;
  }
  return item;
}
module.exports = exportItem;