var express = require('express');
var https = require('https');
var app = express()
var fs = require('fs')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

app.get('/', function(req, res, next) {
	console.log(req);
	res.status(200).send("Hello world!\n").end()
})

https
	.createServer({
	    key: fs.readFileSync('cors.key'),
	    cert: fs.readFileSync('cors.crt')
	}, app)
	.listen(3000, function() {
    	console.log('Listening on 3000');
	});

// app.listen(3000, () => console.log('Listening on 3000'));
