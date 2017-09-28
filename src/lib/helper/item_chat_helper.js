module.exports = {
    newItem : function(type, image, messageObject){
        return {
            "type": type,
            "image": image,
            "text": messageObject.msg,
            "ts" :messageObject.ts.valueOf(),
            "timeStamp": messageObject.ts.toString(),
            "ts_ISO": messageObject.ts.toISOString(),
            "_id": messageObject._id
          }
    },
    newItemWithRestApi: function( type, image, messageObject){
        var date = new Date(messageObject.ts);
        return {
            "type": type,
            "image": image,
            "text": messageObject.msg,
            "ts" :date.getTime(),
            "timeStamp": date.toString(),
            "ts_ISO": messageObject.ts,
            "_id": messageObject._id
        }
    }
}