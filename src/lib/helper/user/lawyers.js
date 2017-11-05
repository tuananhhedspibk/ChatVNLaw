var firebase = require('firebase');

function getLawyerInfo(id, callback){
  var ref = firebase.database().ref().child(`lawyers/${id}`).once('value', data=>{
    return callback(data);
  })
}
function getLawyerList(properties, callback){
  var ref = firebase.database().ref().child('users')
    .orderByChild('role').equalTo('lawyer').limitToFirst(5);
  ref.once('value').then( snapshot => {
    if(!snapshot.exists()){
      return callback();
    }else{
      var arr = [];
      var key = Object.keys(snapshot.val());
      for(var i in snapshot.val()){
        let item = {
          photoURL: snapshot.val()[i].photoURL,
          displayName: snapshot.val()[i].displayName,
        }
        getLawyerInfo(i, (data)=>{
          for(var y in data.val()){
            item[y] = data.val()[y]
          }
          arr.push(item);
          if(key.indexOf(i) === key.length -1){
            properties.component.setState({lawyers: arr});
          }
        });
      }
    }
  })
}

module.exports = {
  getLawyerList(properties, callback){
    getLawyerList(properties,callback);
  }
}