## install

```
npm install node-coincheck
```

## Public API
```
var coincheck = require('node-coincheck');
var api = coincheck.PublicApi;

api.ticker(function(body) {
        console.log(body);
    }
)

api.trades(offset, function(body) {
        console.log(body);
    }
)
```

## Private API

```
var coincheck = require('node-coincheck');
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

    // for leverage
    api.getLeverageBalance(function(body){
            console.log(body);
        }
    );

    api.exchangeToLeverage('JPY', 10000, function(body){
            console.log(body);
        }
    );

    api.exchangeFromLeverage('JPY', 10000, function(body){
            console.log(body);
        }
    );
}).catch(console.log);
```
