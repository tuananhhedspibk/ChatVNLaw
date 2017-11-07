var firebase = require('firebase');
var $ = require('jquery');

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
function findLawyersNameStartWithInput(input,properties,callback){
  var ref = firebase.database().ref('lawyers').orderByChild('Fullname').startAt(input).endAt(input+'\uf8ff').limitToFirst(5);
  ref.on('value', snapshot =>{
    return callback(snapshot.val());
  })
}
function findLawyersWithInput(input, properties ,callback){
  var ref = firebase.database().ref('lawyers').orderByChild('Fullname').equalTo(input).limitToFirst(5);
  ref.once('value', snapshot =>{
    return callback(snapshot.val());
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
        item['_id'] = element;
        for(var i in data[element]){
          item[i] = data[element][i];
        }
        result.push(item);
      })
      component.setState({isLoading: false, result: result})
    }else{
      new Promise( (resolve)=>{
        while(input.indexOf(" ") > 0){
          var lastIndex = input.lastIndexOf(" ");
          input = input.substring(0, lastIndex);
          findLawyersNameStartWithInput(input, properties, data =>{            
            if(data){
              var key = Object.keys(data);
              key.forEach(element =>{
                var item = {}
                item['_id'] = element;
                for(var i in data[element]){
                  item[i] = data[element][i];
                }                
                result.push(item);
                if(!(input.indexOf(" ") > 0)){
                  
                  resolve();
                }
              })
            }
          })
        }
      }).then(() => {
        var tmp = result;
        result = []
        var valueArr = tmp.map(function(item){ return item._id });
        valueArr.forEach(function(item, idx){ 
          if(!(valueArr.indexOf(item) != idx )){
            result.push(tmp[idx]);            
          }
        });
        valueArr = result.map(function(item){ return item._id });
        
        new Promise ((resolve) =>{
          result.forEach((item,idx) =>{
            firebase.database().ref(`users/${item._id}/photoURL`).once('value', data =>{
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
      })
    }
  })
}
module.exports = {
  getLawyerList(properties, callback){
    getLawyerList(properties,callback);
  },
  findLawyersNameStartWithInput(input,properties,callback){
    findLawyersNameStartWithInput(input,properties,callback);
  },
  findLawyersWithInput(input, properties ,callback){
    findLawyersWithInput(input, properties ,callback)
  },
  findLawyers(properties, callback){
    findLawyers(properties, callback);
  }
}