function convertDateToUTCHour(date){
  date = new Date(parseInt(date))
  return date.getUTCHours() + ':' + date.getUTCMinutes();
}

function convertDateToUTCSecond(date){
  date = new Date(parseInt(date))
  return date.getUTCHours() + ':' + date.getUTCMinutes() +
    ':' + date.getUTCSeconds();
}

function convertDateToSecond(date) {
  date = new Date(parseInt(date))
  return date.getHours() + ':' + date.getMinutes() +
    ':' + date.getSeconds();
}
function convertDateToHour(date){
  date = new Date(parseInt(date))
  return date.getHours() + ':' + date.getMinutes();
}
function convertDateToDay(date){
  date = new Date(parseInt(date))
  return date.getUTCDate() + '/' +
    (date.getUTCMonth() + 1) + '/' + date.getUTCFullYear();
}

module.exports = {
  convertDateToDay: function(date){
    return convertDateToDay(date);
  },
  convertDateToHour: function(date){
    return convertDateToHour(date);
  },
  convertDateToSecond: function(date){
    return convertDateToSecond(date);
  },
  convertDateToUTCSecond: function(date){
    return convertDateToUTCSecond(date);
  },
  convertDateToUTCHour: function(date){
    return convertDateToUTCHour(date);
  }
}