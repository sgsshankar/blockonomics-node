var unirest = require("unirest");
var querystring = require("querystring");
var config = require('./config');
var Promise = require('promise/domains');

module.exports = {

	getBalance: function(addr) {
		var url = config.config.balance;
		var result = sendRequest(url, 'POST', {
			"addr": addr
		});
		return result;
	},

	getHistory: function(addr) {
		var url = config.config.history;
		var result = sendRequest(url, 'POST', {
			"addr": addr
		});
		return result;
	},

	getTransactionDetail: function(txId) {
		var url = config.config.transactionDetail + "?txid=" + txId;
		var result = sendRequest(url, "GET", {});
		return result;
	},

	getTransactionReceipt: function(txId, addr) {
		var url = config.config.transactionReceipt + "?txid=" + txId + "&addr=" + addr;
		var result = sendRequest(url, "GET", {});
		return result;
	}
};

function sendRequest(fullpath, method, querystring) {

	var options = {
		url: config.config.hostUrl + fullpath,
		qs: querystring,
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'blockonomics',
			'Accept': 'application/json'
		}
	};

	return new Promise(function(resolve, reject) {
		if (method == "GET") {
			unirest.get(options.url)
				.headers(options.headers)
				.send(options.qs)
				.end(function(response) {
					resolve(response.body);
				});
		} else if (method == "POST") {
			unirest.post(options.url)
				.headers(options.headers)
				.send(options.qs)
				.end(function(response) {
					resolve(response.body);
				});

		}
	});

}