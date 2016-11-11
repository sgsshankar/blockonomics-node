var express = require('express');
var blockonomics = require('./blockonomics');

var app = express();
var port = 3000;

app.get('/', function(req, res) {
	res.send("Express app for blockonomics api ");
});

app.get('/api/balance/:address', function(req, res) {
	var response = blockonomics.getBalance(req.params.address).then(function(response) {
		res.send(response);
	});
});

app.get('/api/searchhistory/:address', function(req, res) {
	var response = blockonomics.getHistory(req.params.address).then(function(response) {
		res.send(response);
	});
});

app.get('/api/tx_detail', function(req, res) {
	var response = blockonomics.getTransactionDetail(req.query.txid).then(function(response) {
		res.send(response);
	});
});

app.get('/api/tx', function(req, res) {
	var response = blockonomics.getTransactionReceipt(req.query.txid, req.query.addr).then(function(response) {
		res.send(response);
	});
});

app.get('/api/address/:apikey', function(req, res) {
	var response = blockonomics.getBalance(req.params.apikey).then(function(response) {
		res.send(response);
	});

});

app.get('/api/new_address/:apikey', function(req, res) {
	var response = blockonomics.getNewAddress(req.params.apikey, req.query.reset, req.query.match_account).then(function(response) {
		res.send(response);
		console.log(response)
	});

});

var server = app.listen(port, function() {
	console.log("open browser to http://localhost:3000/");
});