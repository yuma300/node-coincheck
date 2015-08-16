var zaif = require('./index');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync('./config.json').then(JSON.parse).
then(function(config){
    var api = zaif.createPrivateApi(config.coincheck_apikey, config.coincheck_secretkey, 'user agent is node-coincheck');
    // call api
    //api.getBalance();
    api.activeOrders();
    //api.trade('btc_jpy', 'buy', 1, 1);
    //api.cancelOrder(5731006);
}).catch(console.log);

