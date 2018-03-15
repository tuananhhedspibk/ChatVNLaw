var firebase = require('firebase');

function getReviewLawyer(properties){
    let reviews = [];
    let ref = firebase.database().ref(`lawyers/${properties.lawyerId}/reviews`)
        .orderByChild('created_at').endAt(properties.ts).limitToLast(properties.limit);
    ref.once('value', data => {
        if(data.exists()){
            let reviews = properties.component.state.reviews;
            let tmp = []

            data.forEach(function(element) {
                let item = {};
                item['img'] = element.val().ava;
                item['content'] = element.val().content;
                item['star'] = element.val().star;
                item['created_at'] = element.val().created_at;
                tmp.push(item);
            });
            for(var idx = tmp.length - 1; idx >= 0; idx--) {
                reviews.push(tmp[idx]);
            }

            properties.component.setState({
                reviews: reviews
            });
        }
    })
}

module.exports = {
    getReviewLawyer:function(properties){
        getReviewLawyer(properties)
    }
}