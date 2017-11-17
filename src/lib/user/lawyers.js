var firebase = require('firebase');
var $ = require('jquery');
var constant = require('../constants');

function getLawyerInfo(id, callback){
  var ref = firebase.database().ref().child(`${constant.TABLE.lawyers}/${id}`).once('value', data=>{
    return callback(data);
  })
}
function getLawyerList(properties, callback){
  var ref = firebase.database().ref().child(`${constant.TABLE.users}`)
    .orderByChild('role').equalTo('lawyer').limitToFirst(5);
  ref.once('value').then( snapshot => {
    if(!snapshot.exists()){
      return callback();
    }
    else{
      var arr = [];
      var key = Object.keys(snapshot.val());
      for(var i in snapshot.val()){
        let item = {
          uid: i,
          photoURL: snapshot.val()[i].photoURL,
          displayName: snapshot.val()[i].displayName,
          username: snapshot.val()[i].username
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
function findLawyersWithUserName(input, callback){
  var ref = firebase.database().ref(`${constant.TABLE.users}`).orderByChild(`${constant.USERS.username}`).equalTo(input).once('value', data =>{
    return callback(data);
  })
}
function findLawyersNameStartWithInput(input,properties,callback){
  var ref = firebase.database().ref(`${constant.TABLE.lawyers}`).orderByChild(`${constant.LAWYER_INFO.fullname}`).startAt(input).endAt(input+'\uf8ff').limitToFirst(5);
  ref.on('value', snapshot =>{
    return callback(snapshot.val());
  })
}
function findLawyersWithInput(input, properties ,callback){
  var ref = firebase.database().ref(`${constant.TABLE.lawyers}`).orderByChild(`${constant.LAWYER_INFO.fullname}`).equalTo(input).limitToFirst(5);
  ref.once('value', snapshot =>{
    return callback(snapshot.val());
  })
}
function findLawyersWithoutInput(properties,callback){
  var result = [];  
  var ref = firebase.database().ref(`${constant.TABLE.lawyers}`).limitToFirst(5);
  ref.once('value', snapshot =>{
    if(snapshot.exists()){
      var data = snapshot.val();
      var key = Object.keys(data);
      key.forEach(element =>{
        var item = {};
        item['uid'] = element;
        for(var i in data[element]){
          item[i] = data[element][i];
        }
        result.push(item);
      })
      properties.component.setState({isLoading: false, result: result})
    }
  })
}

function findLawyers(properties, callback){
  var input = properties.input;
  var component = properties.component;
  var result = [];
  findLawyersWithInput(input, properties, (data)=>{
    if(data){   
      var key = Object.keys(data);
      key.forEach(element =>{
        var item = {}
        item['uid'] = element;
        for(var i in data[element]){
          item[i] = data[element][i];
        }
        result.push(item);
      })
      component.setState({isLoading: false, result: result})
    }else{
      new Promise( (resolve)=>{
        if(!(input.indexOf(" ") > 0)){
          resolve();
        }
        while(input.indexOf(" ") > 0){
          var lastIndex = input.lastIndexOf(" ");
          input = input.substring(0, lastIndex);
          findLawyersNameStartWithInput(input, properties, data =>{            
            if(data){
              var key = Object.keys(data);
              key.forEach(element =>{
                var item = {}
                item['uid'] = element;
                for(var i in data[element]){
                  item[i] = data[element][i];
                }                
                result.push(item);
                if(!(input.indexOf(" ") > 0)){
                  
                  resolve();
                }
              })
            }else{
              if(!(input.indexOf(" ") > 0)){
                
                resolve();
              }
            }
          })
        }
      }).then(() => {
        if(result.length > 0){
          var tmp = result;
          result = []
          var valueArr = tmp.map(function(item){ return item.uid });
          valueArr.forEach(function(item, idx){ 
            if(!(valueArr.indexOf(item) != idx )){
              result.push(tmp[idx]);            
            }
          });
          valueArr = result.map(function(item){ return item.uid });
          
          new Promise ((resolve) =>{
            result.forEach((item,idx) =>{
              firebase.database().ref(`${constant.TABLE.users}/${item.uid}/${constant.USERS.photoURL}`).once('value', data =>{
                result[idx]['photoURL'] = data.val();
                if(idx === result.length -1){
                  resolve();
                }
              })
              
            })
          }).then(()=>{
            console.log(result);
            component.setState({isLoading: false,findOther:true,result: result}); 
          })
        }else{
          component.setState({isLoading: false,findOther:true,result: result});           
        }
      })
    }
  })
}
function isLawyer(uid, callback){
  firebase.database().ref().child(`${constant.TABLE.users}/${uid}/${constant.USERS.role}`).on('value',data =>{
    if(data){
      if(data.val() === 'lawyer'){
        return callback(true);
      }
      return callback(false);      
    }else{
      return callback(false);
    }
  })
}
module.exports = {
  getLawyerList: function(properties, callback){
    getLawyerList(properties,callback);
  },
  findLawyersNameStartWithInput: function(input,properties,callback){
    findLawyersNameStartWithInput(input,properties,callback);
  },
  findLawyersWithInput: function(input, properties ,callback){
    findLawyersWithInput(input, properties ,callback)
  },
  findLawyers: function(properties, callback){
    findLawyers(properties, callback);
  },
  findLawyersWithUserName: function(input, callback){
    findLawyersWithUserName(input, callback);
  },
  findLawyersWithoutInput: function(properties,callback){
    findLawyersWithoutInput(properties,callback);
  },
  isLawyer: function(uid, callback){
    isLawyer(uid, callback);
  }
}