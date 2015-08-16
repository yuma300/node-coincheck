## Private API



```
var coincheck = require('./index');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync('./config.json').then(JSON.parse).
then(function(config){
    var api = coincheck.createPrivateApi(config.coincheck_apikey, config.coincheck_secretkey, 'user agent is node-coincheck');
    // call api
    api.getBalance(function(body) {
            console.log(body);
        }
    );
    api.activeOrders(function(body) {
            console.log(body);
        }
    );
    api.trade('btc_jpy', 'buy', 1, 1, function(body) {
            console.log(body);
        }
    );
    api.cancelOrder(5910927, function(body) {
            console.log(body);
        }
    );
}).catch(console.log);
```
