"use strict";
var crypto = require('crypto');
var querystring = require('querystring');
var constant = require('./constant');
var request = require('request');


var createSign = function(argo, key, qstring){
    return crypto.createHmac(argo, key).
        update(new Buffer(qstring)).
        digest('hex').toString();
};
var createHeader = function(url, api_key, secret_key, nonce, postdata){
    var message = nonce + url + querystring.stringify(postdata)
    return {
        'Content-Type': 'application/json',
        'ACCESS-NONCE': nonce,
        'ACCESS-SIGNATURE': createSign('sha256', secret_key, message),
        'ACCESS-KEY': api_key,
    };
}
var createPostParam = function(objarray){
    var postparams = {};
    objarray.forEach(function(obj){
        Object.keys(obj).forEach(function(key){ postparams[key] = obj[key]; });
    });
    return postparams;
}
var createPostOption = function(url, api_key, secret_key, user_agent, nonce, params){
    var post = createPostParam([params]);
    return {
        url: url,
        form: post,
        headers: createHeader(url, api_key, secret_key, nonce, post),
    };
}
var createPrivateApi = module.exports = function(api_key, secret_key, user_agent, nonce_func){
    var url = function(){ return constant.OPT_API_URL };
    var initnonce = new Date()/1000|0;
    nonce_func = nonce_func || function(){ return initnonce++; }
    var post_query = function(method, params, callback){
        request.post(createPostOption(url() + method, api_key, secret_key, user_agent, nonce_func(), params), function(error, response, body){
            if (!error && response.statusCode == 200) {
                callback(body);
            } else {
                console.log('error: '+ response.statusCode);
            }
        });
    };
    var delete_query = function(method, params, callback){
        request.del(createPostOption(url() + method, api_key, secret_key, user_agent, nonce_func(), params), function(error, response, body){
            if (!error && response.statusCode == 200) {
                callback(body);
            } else {
                console.log('error: '+ response.statusCode);
            }
        });
    };
    var get_query = function(method, params, callback){
        request.get(createPostOption(url() + method, api_key, secret_key, user_agent, nonce_func(), params), function(error, response, body){
            if (!error && response.statusCode == 200) {
                //console.log(body);
                callback(body)
            } else {
                console.log('error: '+ response.statusCode);
            }
        });
    };
    return {
        getBalance : function(callback){ return get_query('/accounts/balance', {}, callback) },
        activeOrders : function(callback){ return get_query('/exchange/orders/opens', {}, callback) },
        trade : function(currency_pair, action, price, amount, callback){
            return post_query('/exchange/orders', {
                pair : currency_pair,
                order_type : action,
                rate : price,
                amount : amount
            }, callback)
        },
        cancelOrder : function(order_id, callback){
            return delete_query('/exchange/orders/' +  order_id, {}, callback)
        },
    };
}

