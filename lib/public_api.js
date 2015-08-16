"use strict";
var request = require('request');


exports.ticker = function(callback){
    request.get({url: 'https://coincheck.jp/api/ticker'}, function(error, response, body){
        if (!error && response.statusCode == 200) {
            //console.log(body);
            callback(body)
        } else {
            console.log('error: '+ response.statusCode);
        }
    });
}
