var server = "localhost";
var serverPort = "4000";
var constant = require('../../components/constants');

var DDP = require("ddp");
var login = require("ddp-login");
process.env.METEOR_TOKEN = constant.headers['X-Auth-Token'];

var ddpClient = new DDP({
  host: server,
  port: serverPort,
  maintainCollections: true
});
