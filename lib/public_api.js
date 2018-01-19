"use strict";
var request = require('request');
var constant = require('./constant')


exports.ticker = function(callback){
    request.get({url: constant.OPT_API_URL + '/ticker'}, function(error, response, body){
        if (!error && response.statusCode == 200) {
            callback(JSON.parse(body))
        } else {
            console.log('error: '+ response.statusCode);
        }
    });
}

exports.trades = function(offset, callback){
    request.get({url: constant.OPT_API_URL + '/trades?offset=' + offset}, function(error, response, body){
        if (!error && response.statusCode == 200) {
            callback(JSON.parse(body));
        } else {
            console.log('error: '+ response.statusCode);
        }
    });
}

exports.depth = function(callback){
    request.get({url: constant.OPT_API_URL + '/order_books'}, function(error, response, body){
        if (!error && response.statusCode == 200) {
            callback(JSON.parse(body))
        } else {
            console.log('error: '+ response.statusCode);
        }
    });
}
