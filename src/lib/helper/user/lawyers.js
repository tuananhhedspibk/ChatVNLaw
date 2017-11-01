var firebase = require('firebase');

function getLawyerList(properties, callback){
  var ref = firebase.database().ref().child('users')
    .orderByChild('role').equalTo('lawyer').limitToFirst(5);
  ref.once('value').then( snapshot => {
    if(!snapshot.exists()){
      return callback();
    }else{
      var arr = [];
      for(var i in snapshot.val()){
        let item = {
          photoURL: snapshot.val()[i].photoURL,
          displayName: snapshot.val()[i].displayName,
        }
        arr.push(item);
      }
      properties.component.setState({lawyers: arr});
    }
  })
}

module.exports = {
  getLawyerList(properties, callback){
    getLawyerList(properties,callback);
  }
}