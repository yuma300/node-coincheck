var zaif = require('./index');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync('./config.json').then(JSON.parse).
then(function(config){
    var api = zaif.createPrivateApi(config.apikey, config.secretkey, 'user agent is node-coincheck');
    // call api
    api.getBalance().then(console.log);
}).catch(console.log);

