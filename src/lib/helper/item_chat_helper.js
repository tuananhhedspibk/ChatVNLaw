module.exports = {
    newItem : function(type, image, messageObject){
        return {
            "type": type,
            "image": image,
            "text": messageObject.msg,
            "ts" :messageObject.ts.valueOf(),
            "timeStamp": messageObject.ts.toString(),
            "_id": messageObject._id
          }
    }
}