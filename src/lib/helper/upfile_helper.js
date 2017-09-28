var firebase = require('firebase');

module.exports = {
    getItemList : function(type, roomId, callback){
        var commentsRef = firebase.database().ref().child(type).child(roomId);
        commentsRef.on('child_added', function(data) {
            console.log(data);
            let item = {}
    
            item[data.node_.children_.root_.key] = data.node_.children_.root_.value.value_;
            item[data.node_.children_.root_.left.key] = data.node_.children_.root_.left.value.value_;
            item[data.node_.children_.root_.right.key] = data.node_.children_.root_.right.value.value_;
            item["ts"] = data.key;
            return callback(1, item);

          // addCommentElement(postElement, data.key, data.val().text, data.val().author);
        });
        
        commentsRef.on('child_changed', function(data) {
          console.log('child_changed');
          // setCommentValues(postElement, data.key, data.val().text, data.val().author);
        });
        commentsRef.on('child_removed', function(data) {
            console.log('child_removed');
            // deleteComment(postElement, data.key);
        });
    }
}