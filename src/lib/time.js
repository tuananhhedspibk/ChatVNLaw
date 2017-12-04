function convertDateToHour(date){
  date = new Date(parseInt(date))
  return date.getUTCHours() + ':' + date.getUTCMinutes();
}

function convertDateToDay(date){
  date = new Date(parseInt(date))
  return date.getUTCDate() + '/' +
    (date.getUTCMonth() + 1) + '/' + date.getUTCFullYear();
}

module.exports = {
  convertDateToDay: function(date){
    convertDateToDay(date);
  },
  convertDateToHour: function(date){
    convertDateToHour(date);
  }
}