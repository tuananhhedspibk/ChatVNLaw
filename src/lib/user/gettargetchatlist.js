var firebase = require('firebase');
var constant = require('../constants');

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

module.exports = {
    getTargetChat: function(properties){
        getTargetChat(properties);
    }
}