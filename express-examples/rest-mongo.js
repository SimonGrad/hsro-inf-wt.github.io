var express = require('express');
var mongo = require('mongodb');

const host = 'tesla.inf.fh-rosenheim.de';

var app = express()

app.use(express.static('static'));
app.use(express.json());

const url = `mongodb://${host}:27017/mydb`;
let db
mongo.MongoClient.connect(url)
	.then(function (conn) {
		return conn.collection('riko493');
	})
	.then((result) => {
		db = result
		console.log(result);
	})
	.catch((err) => {
		console.log(err);
	});

app.get('/students/', function (req, res) {
	db.find({}).toArray()
		.then((result) => {
			console.log(result)
			res.json(result).end()
		})
		.catch((err) => { 
			console.log(err)
			res.status(400).send(err).end()
		})
})

app.get('/students/:id', function (req, res) {
	db.findOne({'id': req.params.id})
		.then((result) => {
			console.log(result)
			res.json(result).end()
		})
		.catch((err) => {
			console.log(err)
			res.status(404).end()
		})
})

app.delete('/students/:id', function (req, res) {
	db.deleteOne({'id': req.params.id})
		.then((result) => {
			console.log(result)
			res.status(204).end()
		})
		.catch((err) => {
			console.log(err)
			res.status(404).end()
		})
})

app.post('/students/', (req, res) => {
	db.insertOne(req.body)
		.then((result) => {
			console.log(result)
			res.status(201).json(req.body).end()
		})
		.catch((err) => {
			console.log(err)
			res.status(400).send(err).end()
		})
});

app.listen(3000, () => console.log("Listening on 3000"));
