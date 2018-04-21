var firebase = require('firebase');

var constantLib = require('../constants');
var constantUI = require('../../components/constants');

function getReview(userName, callback) {
  constantLib.ax_ins.get(constantUI.API_BASE_URL + constantUI.API_LAWYERS_URI
    + userName + '/reviews')
      .then(response => {
        return callback(true, response);
      })
      .catch(error => {
        return callback(false, error);
      });
}

module.exports = {
  getReview: function(userName, callback){
    getReview(userName, callback)
  }
}
