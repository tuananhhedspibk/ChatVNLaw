var firebase = require('firebase');
var constant = require('../constants');
// var user = require('users');

function updatePhotoURL(link){
    try{
        var currentUser = firebase.auth().currentUser
        firebase.database().ref(`${constant.TABLE.users}/${currentUser.uid}`).update({photoURL: link})
        currentUser.updateProfile({
          photoURL: link
        })
    }catch( exception){

    }
}
function extractUser(data){
    var item = {
        username: data.val().username,
        displayName: data.val().displayName,
        uid : data.key,
        status: data.val().status,
        photoURL: data.val().photoURL,
    }
    return item;
}
function getUserRoleByUid( callback){
    // var ref =firebase.database().ref(`${constant.TABLE.users}/${input}/${constant.USERS.role}`)
    // ref.on('value', data =>{
    //     return callback(data);
    // })
    var userDetail = JSON.parse(localStorage.chat_vnlaw_user)
    return callback(userDetail['role'])
}
function getUserByUid(input, callback){
    var ref = firebase.database().ref(`${constant.TABLE.users}/${input}`)
    ref.once('value').then(data =>{
        return callback('value',data);
    })
    ref.on('child_changed', data =>{
        return callback('child_changed', data);
    })
}
function getTargetChat(properties){
    var ref = firebase.database().ref(`${constant.TABLE.users}`).orderByChild(`${constant.USERS.role}`).equalTo(properties.keyword);
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
// function getUser(uid, callback){
//     var ref = firebase.database().ref(`${constant.TABLE.users}/${uid}`)
//     ref.on('value', data =>{
//         console.log(data);
//     })
//     ref.on('')
// }
function getUserName(user, callback){
    firebase.database().ref(`${constant.TABLE.users}`).child(user.uid).child(`${constant.USERS.username}`).once('value').then(function(data){
        if(data.exists()){
            return callback(data.val());
        }
    })
}
function checkUserName(properties, callback){
    var component = properties.component;
    var ref = firebase.database().ref(`${constant.TABLE.users}`).orderByChild(`${constant.USERS.username}`).equalTo(properties.keyword)
    ref.once('value').then(function(snapshot){
        if(!snapshot.exists()){
            return callback();
        }
    })
    ref.once('child_added')
    .then(function(snapshot){
    })
}

function checkUserWithUserName(input, callback){
    var ref = firebase.database().ref(`${constant.TABLE.users}`).orderByChild(`${constant.USERS.username}`).equalTo(input)
    ref.on('value',data =>{
        return callback(data);
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
    },
    getUserByUid: function(input, callback){
        getUserByUid(input, callback);
    },
    extractUser: function(data){
        extractUser(data);
    },
    checkUserWithUserName: function(input, callback){
        checkUserWithUserName(input, callback)
    },
    updatePhotoURL: function(link){
        updatePhotoURL(link);
    },
    getUserRoleByUid(input, callback){
        getUserRoleByUid(input, callback);
    }
}