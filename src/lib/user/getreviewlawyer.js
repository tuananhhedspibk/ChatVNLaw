var firebase = require('firebase');

function getReviewLawyer(properties){
    let review = []
    for(let i in properties.listReview){
        firebase.database().ref(`users/${i}`).once('value', data => {
            if(data.exists()){
                review.push({
                    img: data.val().photoURL,
                    comment : properties.listReview[i].comment,
                    star: properties.listReview[i].star
                })
            }
        })
    }
    properties.component.setState({
        review: review
    })
}

module.exports = {
    getReviewLawyer:function(properties){
        getReviewLawyer(properties)
    }
}