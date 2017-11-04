var firebase = require('firebase');
function extractUser(data){
    var item = {
        username: data.val().username,
        displayName: data.val().displayName,
        uid : data.key,
        status: data.val().status,
        photoURL: data.val().photoURL
    }
    return item;
}

function getTargetChat(properties){
    var ref = firebase.database().ref('users').orderByChild('role').equalTo(properties.keyword);
    var userArr = []
    ref.on('child_added', data =>{
        let item ={
            username: data.val().username,
            displayName: data.val().displayName,
            uid : data.key,
            status: data.val().status,
            photoURL: data.val().photoURL
        }
        if(data.key === properties.currentUser.uid){
            userArr.unshift(item);
        }else{
            userArr.push(item);            
        }
        properties.component.setState({users : userArr})          
    });
    ref.on('child_changed', data =>{
        userArr.every((element, index) =>{
            if(element.uid === data.key){
                userArr[index] = {
                    username: data.val().username,
                    displayName: data.val().displayName,
                    uid : data.key,
                    status: data.val().status,
                    photoURL: data.val().photoURL
                };       
                properties.component.setState({users : userArr})
    
                return false; 
            }else{
                return true;
            }
        })
    });
    ref.on('child_removed', function(data) {
        if(data.key === properties.currentUser.uid){
          return;
        }
        userArr.every(function(element,index){           
            if(element.uid === data.key){
                userArr.splice(index,1);
                properties.component.setState({users : userArr})            
                return false;
            }else{
                return true;
            }
        })
    });
}
function getUserName(user, callback){
    firebase.database().ref('users').child(user.uid).child('username').once('value').then(function(data){
        if(data.exists()){
            return callback(data.val());
        }
    })
}
function checkUserName(properties, callback){
    var component = properties.component;
    var ref = firebase.database().ref('users').orderByChild('username').equalTo(properties.keyword)
    ref.once('value').then(function(snapshot){
        if(!snapshot.exists()){
            return callback();
        }
    })
    ref.once('child_added')
    .then(function(snapshot){
    })
}

module.exports = {
    getUserName: function(user, callback){
        getUserName(user,callback);
    },
    checkUserName: function(properties, callback){
        checkUserName(properties,callback);
    },
    getTargetChat: function(properties){
        getTargetChat(properties);
    }
}