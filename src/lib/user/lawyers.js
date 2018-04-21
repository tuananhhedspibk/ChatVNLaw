var firebase = require('firebase');
var $ = require('jquery');

var constantLib = require('../constants');
var constantUI = require('../../components/constants');

// function storeLawyerData(properties, callback){
//   var item = {}
//   if(!! properties.fullname){
//     item[constant.LAWYER_INFO.fullname] = properties.fullname
//   }
//   if (!! properties.birthday){
//     item[constant.LAWYER_INFO.birthday] = properties.birthday;    
//   }
//   if( !!properties.cardNumber){
//     item[constant.LAWYER_INFO.cardNumber] = properties.cardNumber
//   }
//   if (!! properties.certificate){
//     item[constant.LAWYER_INFO.certificate] = properties.certificate
//   }
//   if(!!properties.category ){
//     item[constant.LAWYER_INFO.category] = properties.category
//   }
//   if(!! properties.exp){
//     item[constant.LAWYER_INFO.exp] = properties.exp
//   }
//   if(!! properties.intro){
//     item[constant.LAWYER_INFO.intro] = properties.intro;
//   }
//   if(!! properties.achievements){
//     item[constant.LAWYER_INFO.achievement] = properties.achievements;
//   }
//   if(!!properties.education){
//     item[constant.LAWYER_INFO.education] = properties.education;
//   }
//   if(!! properties.workPlace){
//     item[constant.LAWYER_INFO.workPlace] = properties.workPlace;
//   }
//   var ref = firebase.database().ref().child(`${constant.TABLE.lawyers}/${properties.curentUser.uid}`)
//   ref.update(item).then(()=>{
//     return callback(true);
//   }).catch(error =>{
//     return callback(false);
//   })
// }
// function getLawyerInfo(id, callback){
//   var ref = firebase.database().ref().child(`${constant.TABLE.lawyers}/${id}`).once('value', data=>{
//     return callback(data);
//   })
// }
// function getLawyerList(properties, callback){
//   var ref = firebase.database().ref().child(`${constant.TABLE.users}`)
//     .orderByChild(`${constant.USERS.role}`).equalTo('lawyer');
//   ref.once('value').then( snapshot => {
//     if(!snapshot.exists()){
//       return callback();
//     }
//     else{
//       var arr = [];
//       var key = Object.keys(snapshot.val());
//       for(var i in snapshot.val()){
//         let item = {
//           uid: i,
//           photoURL: snapshot.val()[i].photoURL,
//           displayName: snapshot.val()[i].displayName,
//           username: snapshot.val()[i].username
//         }
//         getLawyerInfo(i, (data)=>{
//           for(var y in data.val()){
//             item[y] = data.val()[y]
//           }
//           arr.push(item);
//           if(key.indexOf(i) === key.length -1){
//             properties.component.setState({isloading: false,lawyers: arr});
//           }
//         });
//       }
//     }
//   })
// }
// function findLawyersWithUserName(input, callback){
//   var ref = firebase.database().ref(`${constant.TABLE.users}`).orderByChild(`${constant.USERS.username}`).equalTo(input).once('value', data =>{
//     return callback(data);
//   })
// }
// function findLawyersNameStartWithInput(input,properties,callback){
//   var ref = firebase.database().ref(`${constant.TABLE.lawyers}`).orderByChild(`${constant.LAWYER_INFO.fullname}`).startAt(input).endAt(input+'\uf8ff');
//   ref.on('value', snapshot =>{
//     return callback(snapshot.val());
//   })
// }
// function findLawyersWithInput(input, properties ,callback){
//   var ref = firebase.database().ref(`${constant.TABLE.lawyers}`).orderByChild(`${constant.LAWYER_INFO.fullname}`).equalTo(input);
//   ref.once('value', snapshot =>{
//     return callback(snapshot.val());
//   })
// }
// function findLawyersWithoutInput(properties,callback){
//   var result = [];  
//   var ref = firebase.database().ref(`${constant.TABLE.lawyers}`);
//   ref.once('value', snapshot =>{
//     if(snapshot.exists()){
//       var data = snapshot.val();
//       var key = Object.keys(data);
//       key.forEach(element =>{
//         var item = {};
//         item['uid'] = element;
//         for(var i in data[element]){
//           item[i] = data[element][i];
//         }
//         result.push(item);
//       })
//       getLawyerPhotoURL(result, properties, (result) =>{
//         properties.component.setState({isLoading: false,result: result});           
//       }); 
//       // properties.component.setState({isLoading: false, result: result})
//     }
//   })
// }

// function findLawyers(properties, callback){
//   var input = properties.input;
//   var component = properties.component;
//   var result = [];
//   findLawyersWithInput(input, properties, (data)=>{
//     if(data){   
//       var key = Object.keys(data);
//       key.forEach(element =>{
//         var item = {}
//         item['uid'] = element;
//         for(var i in data[element]){
//           item[i] = data[element][i];
//         }
//         result.push(item);
//       })
//       getLawyerPhotoURL(result, properties, (result) =>{
//         component.setState({isLoading: false, result: result})
//       });
//     }else{
//       if(!(input.indexOf(" ") > 0)){
//         if(input.length > 0){
//           findLawyersNameStartWithInput2(input,result ,properties)
//         }else{
//           getLawyerPhotoURL(result, properties, (result) =>{
//             component.setState({isLoading: false,findOther:true,result: result});           
//           }); 
//         }         
//       }
//       while(input.indexOf(" ") > 0){
//         var lastIndex = input.lastIndexOf(" ");
//         input = input.substring(0, lastIndex);
//         findLawyersNameStartWithInput2(input,result ,properties)
//       }
//     }
//   })
// }
// function findLawyersNameStartWithInput2(input,result, properties){
//   var component = properties.component;
//   findLawyersNameStartWithInput(input, properties, data =>{            
//     if(data){
//       var key = Object.keys(data);
//       key.forEach(element =>{
//         var item = {}
//         item['uid'] = element;
//         for(var i in data[element]){
//           item[i] = data[element][i];
//         }                
//         result.push(item);
//         if(!(input.indexOf(" ") > 0)){
//           getLawyerPhotoURL(result, properties, (result) =>{
//             component.setState({isLoading: false,findOther:true,result: result});           
//           });                  
//         }
//       })
//     }else{
//       if(!(input.indexOf(" ") > 0)){
//         getLawyerPhotoURL(result, properties, (result) =>{
//           component.setState({isLoading: false,findOther:true,result: result});           
//         });
//       }
//     }
//   })
// }
// function getLawyerPhotoURL(result, properties, callback){
//   var component = properties.component;
//   if(result.length > 0){
//     var tmp = result;
//     result = []
//     var valueArr = tmp.map(function(item){ return item.uid });
//     valueArr.forEach(function(item, idx){ 
//       if(!(valueArr.indexOf(item) != idx )){
//         result.push(tmp[idx]);            
//       }
//     });
//     valueArr = result.map(function(item){ return item.uid });
    
//     new Promise ((resolve) =>{
//       result.forEach((item,idx) =>{
//         firebase.database().ref(`${constant.TABLE.users}/${item.uid}/${constant.USERS.photoURL}`).once('value', data =>{
//           result[idx]['photoURL'] = data.val();
//           if(idx === result.length -1){
//             resolve();
//           }
//         })
        
//       })
//     }).then(()=>{
//       return callback(result);
//     })
//   }else{
//     return callback(result); 
//   }
// }
// function isLawyer(uid, callback){
//   firebase.database().ref().child(`${constant.TABLE.users}/${uid}/${constant.USERS.role}`).on('value',data =>{
//     if(data){
//       if(data.val() === 'lawyer'){
//         return callback(true);
//       }
//       return callback(false);      
//     }else{
//       return callback(false);
//     }
//   })
// }

function getAllTasks(userID,callback){
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.get(constantUI.API_LAWYERS_URI+ userID +'/tasks'  )
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function getTasksByRoom(roomID,callback){
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.get(constantUI.API_ROOMS_URI+ roomID +'/tasks'  )
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function createTask(roomID,content,callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  let formData = new FormData();
  formData.append('tasks[content]',content)
  instance.post(constantUI.API_ROOMS_URI+ roomID +'/tasks', formData )
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function updateTask(roomID,taskID,content, status,callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  let formData = new FormData();
  formData.append('tasks[content]',content);
  formData.append('tasks[status]',status);
  instance.patch(constantUI.API_ROOMS_URI + roomID +'/tasks/' + taskID, formData )
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function deleteTask(roomID,taskID,callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.delete(constantUI.API_ROOMS_URI+ roomID +'/tasks/' +taskID )
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}
function loadProfilePage(userName, callback) {
  var instance = constantLib.ax_ins;
  if(localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
  }
  instance.get(constantUI.API_LAWYERS_URI + userName)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function updateLawyerInfoRails(userName, properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  let formData = new FormData();
  for(var i = 0; i < properties.keys.length; i++) {
    formData.append('lawyers[' + properties.keys[i] + ']',
      properties.values[i]);
  }
  instance.patch(constantUI.API_LAWYERS_URI + userName, formData)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function createSpecialize(properties, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  let formData = new FormData();
  formData.append('lawyer_specializes[lawyer_id]', properties.lawyer_id);
  formData.append('lawyer_specializes[specialization_id]', properties.specialization_id);
  instance.post(constantUI.API_SPE_URI, formData)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

function destroySpecialize(id, callback) {
  var instance = constantLib.ax_ins;
  if (localStorage.chat_vnlaw_user) {
    instance.defaults.headers['x-user-token'] = JSON.parse(localStorage.chat_vnlaw_user)['token'];
    instance.defaults.headers['x-user-email'] = JSON.parse(localStorage.chat_vnlaw_user)['email'];
  }
  instance.delete(constantUI.API_SPE_URI + '/' + id)
    .then(response => {
      return callback(true, response);
    })
    .catch(error => {
      return callback(false, error);
    })
}

module.exports = {
  getAllTasks: function(userID, callback) {
    getAllTasks(userID, callback);
  },
  getTasksByRoom: function(roomID,callback) {
    getTasksByRoom(roomID,callback);
  },
  createTask: function(roomID,content,callback) {
    createTask(roomID,content,callback);
  },
  deleteTask: function(roomID,taskID,callback) {
    deleteTask(roomID,taskID,callback);
  },
  updateTask: function(roomID,taskID,content, status,callback) {
    updateTask(roomID,taskID,content, status,callback);
  },
  loadProfilePage: function(userName, callback) {
    loadProfilePage(userName, callback);
  },
  updateLawyerInfoRails: function(userName, properties ,callback) {
    updateLawyerInfoRails(userName, properties, callback);
  },
  createSpecialize: function(properties, callback) {
    createSpecialize(properties, callback);
  },
  destroySpecialize: function(id, callback) {
    destroySpecialize(id, callback);
  }
}