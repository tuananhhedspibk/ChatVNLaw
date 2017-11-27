var firebase = require('firebase');
var $ = require('jquery');
var constant = require('../constants');

function storeLawyerData(properties, callback){
  var item = {}
  if(!! properties.fullname){
    item[constant.LAWYER_INFO.fullname] = properties.fullname
  }
  if (!! properties.birthday){
    item[constant.LAWYER_INFO.birthday] = properties.birthday;    
  }
  if( !!properties.cardNumber){
    item[constant.LAWYER_INFO.cardNumber] = properties.cardNumber
  }
  if (!! properties.certificate){
    item[constant.LAWYER_INFO.certificate] = properties.certificate
  }
  if(!!properties.category ){
    item[constant.LAWYER_INFO.category] = properties.category
  }
  if(!! properties.exp){
    item[constant.LAWYER_INFO.exp] = properties.exp
  }
  if(!! properties.intro){
    item[constant.LAWYER_INFO.intro] = properties.intro;
  }
  if(!! properties.achievements){
    item[constant.LAWYER_INFO.achievement] = properties.achievements;
  }
  if(!!properties.education){
    item[constant.LAWYER_INFO.education] = properties.education;
  }
  if(!! properties.workPlace){
    item[constant.LAWYER_INFO.workPlace] = properties.workPlace;
  }
  var ref = firebase.database().ref().child(`${constant.TABLE.lawyers}/${properties.curentUser.uid}`)
  ref.update(item).then(()=>{
    return callback(true);
  }).catch(error =>{
    return callback(false);
  })
}
function getLawyerInfo(id, callback){
  var ref = firebase.database().ref().child(`${constant.TABLE.lawyers}/${id}`).once('value', data=>{
    return callback(data);
  })
}
function getLawyerList(properties, callback){
  var ref = firebase.database().ref().child(`${constant.TABLE.users}`)
    .orderByChild(`${constant.USERS.role}`).equalTo('lawyer').limitToFirst(5);
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
            properties.component.setState({isloading: false,lawyers: arr});
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
      getLawyerPhotoURL(result, properties, (result) =>{
        properties.component.setState({isLoading: false,result: result});           
      }); 
      // properties.component.setState({isLoading: false, result: result})
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
      getLawyerPhotoURL(result, properties, (result) =>{
        component.setState({isLoading: false, result: result})
      });
    }else{
      if(!(input.indexOf(" ") > 0)){
        if(input.length > 0){
          findLawyersNameStartWithInput2(input,result ,properties)
        }else{
          getLawyerPhotoURL(result, properties, (result) =>{
            component.setState({isLoading: false,findOther:true,result: result});           
          }); 
        }         
      }
      while(input.indexOf(" ") > 0){
        var lastIndex = input.lastIndexOf(" ");
        input = input.substring(0, lastIndex);
        findLawyersNameStartWithInput2(input,result ,properties)
      }
    }
  })
}
function findLawyersNameStartWithInput2(input,result, properties){
  var component = properties.component;
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
          getLawyerPhotoURL(result, properties, (result) =>{
            component.setState({isLoading: false,findOther:true,result: result});           
          });                  
        }
      })
    }else{
      if(!(input.indexOf(" ") > 0)){
        getLawyerPhotoURL(result, properties, (result) =>{
          component.setState({isLoading: false,findOther:true,result: result});           
        });
      }
    }
  })
}
function getLawyerPhotoURL(result, properties, callback){
  var component = properties.component;
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
      return callback(result);
    })
  }else{
    return callback(result); 
  }
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
  },
  storeLawyerData: function(properties, callback){
    storeLawyerData(properties, callback)
  }
}