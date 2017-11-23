---
title: Assignment 7
permalink: /07a-express-db/
---

# Building a Web Server with Express.js

In this assignment, we will -- step by step -- build a web server that
- serves static files
- answers basic requests
- processes sophisticated requests that include a database connection


# Express.js Basics

To get started, make sure you have node.js and the node package manager (npm) installed and functional in your terminal.
You can verify by trying the following commands:

```shell
$ node -v
v8.6.0
$ npm -v
5.3.0
```

Note that lines starting with `$` indicates the prompt (i.e. the `$ ` is not part of the command), whereas other lines are output from the programs.
In the example above, `node -v` ("version") results in `v8.6.0`, and `npm -v` results in `5.3.0`.

Install [express.js](https://expressjs.com/) and body-parser using the node package manager:

```shell
$ npm install express body-parser
```

Now, create your first basic web server application by creating and editing the file `app.js`:

```js
const express = require('express')  // load the node express module
const bp = require('body-parser')
const app = express()  // create a new express app

// let's treat incoming request bodies as text/plain
app.use(bp.text())

// this will catch any incoming request...
app.use((req, res) => {
	console.log(req)       // ...log it to stdout
	res.status(200).end()  // ...and send an empty but OK response
})

// start the webserver, listen on port 3000
app.listen(3000, 
	() => console.log('Example app.js listening on port 3000!'))
```

Note that since we're now using javascript as a _server-side_ interpreted language, we will use ES6 standard, where

- `let` is a block-scoped variable
- `const` is a block-scoped constant (in Java: `final`)
- `var` is valid in the _execution context_ (e.g. function), which is pre-ES6 default.

Also recall the shorter lambda syntax for anonymous functions:

```js
// function with a single instruction and return
var fun1_old = function (arg) {
	return arg * arg;
};

var fun1_new = (arg) => arg * arg;
```
```js
// function with multiple instructions and return
var fun2_old = function (arg) {
	console.log(arg);
	return arg;
};

var fun2_new = (arg) => {
	console.log(arg);
	return arg;
};
```

Since you will be writing _a lot_ of anonymous functions today, using lambda syntax is strongly advised.

You can start the server in your terminal, using

```shell
$ node app.js
Example app.js listening on port 3000!
```

The program will not terminate until you force-kill it, using CTRL-C.

In a second terminal (or using postman), send a request to `localhost:3000`; it should look similar to the following:

```
$ curl -v localhost:3000
* Rebuilt URL to: localhost:3000/
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 3000 (#0)
> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.54.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Date: Wed, 22 Nov 2017 16:28:51 GMT
< Connection: keep-alive
< Content-Length: 0
< 
* Connection #0 to host localhost left intact
```

Whereas on the server terminal, you will see something like this:

```
IncomingMessage {
  _readableState: 
   ReadableState {
     objectMode: false,
     highWaterMark: 16384,
     buffer: BufferList { head: null, tail: null, length: 0 },
     length: 0,
...
```

Clearly, there is way too much information displayed, so let's examine the request parameter `req` inside the `app.use` callback.
You can find its full specification in the [express.js documentation](http://expressjs.com/en/api.html#req).
For now, let's change the request callback to something more informative:

```js
app.use((req, res) => {
	console.log([req.method, req.hostname, req.ip, req.url, req.headers])
	console.log(req.query)
	console.log(req.body)
	res.status(200).end()  // sends 200 OK, no body, closes connection
})
```

Restart the app (first use CTRL-C to terminate, then `node app.js` to start), and send the same request; you should now see something a little more informative:

```
[ 'GET',
  'localhost',
  '::1',
  '/',
  { host: 'localhost:3000',
    'user-agent': 'curl/7.54.0',
    accept: '*/*' } ]
undefined
undefined
```

As you can see, the request originated from the hostname `localhost`, on the ip `::1` ([IPv6 loopback address](https://en.wikipedia.org/wiki/Localhost)), the requested path was `/`, there was a set of request headers, and there was no query args (undefined) or body (`undefined`).

Now try sending a few different requests to see how they affect your request object received by the server:
- send URL query parameters, e.g. `class` with value `wt2017` (curl: `curl -v localhost:3000/?arg=value`)
- send request headers, e.g. `x-wt-2017` with value `rocks`
- send a body with some text, e.g. `Hello` (curl: `-d 'Hello'`)


# Serving Static Files

Modify your request handler, so that it replies with the contents of `app.js`, if the query parameter `self` is present (or just 200 without body otherwise).

- use the `hasOwnProperty()` method to check if an object contains a certain attribute
- use `fs.readFile()` to read a file ([docs](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)); import the `fs` module by using `const fs = require('fs')`

> Note: The `readFile()` function expects a callback which will be executed once the file has loaded.
> Respond with a 400 (without body), if an error occurred when accessing the file.


# A Basic Webserver

In real life, our webserver needs to distinguish two things:
1. serve static files
2. performs custom actions at certain endpoints

Modify your `app.js` so that it 
- serves static files, if they are inside the `static` directory (relative to your working directory)
- creates a file, if it receives a POST at `/create`; save the body to a file with name specified in the request header `x-filename`.
	Return a 201 if successful, or a 400 if anything goes wrong.

Hints:
- instead of loading files by-hand, use `express.static()` ([docs](https://expressjs.com/en/starter/static-files.html)) for serving static files; remove the previous catch-all handler
- use the `req.get()` method to retrieve a _header field_
- use `app.post(path, callback)` to catch POST requests, and use `fs.writeFile(...)` ([docs](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)) to write the file into the `static` directory
- try POSTing to a wrong endpoint or retrieve a file that doesn't exist; what happens?


# Accessing Databases

In this last assignment, you will write a simple database connection that allows you to retrieve, create and delete "student" objects, e.g.

```json
{"id": "ds14", "name": "Max"}
```

in a database table (mysql) or collection (mongo).

For both kinds of databases, you will write endpoints:
- `GET /students/`. Returns 200 and all students that are in the table/collection.
- `GET /students/:id`. Returns 200 and the student, or 404 if it doesn't exist.
- `POST /students/ {"id": 123, "name": "myname"}`. Returns 201 with the object, and inserts the student into the table/collection; or 400 if something goes wrong.
- `DELETE /students/:id`. Returns 204 and removes the student from the table/collection, or 404 if it didn't exist.

Hints:
- URL-internal parameters designated with `:` (e.g. `/students/:id`) can be accessed using the `req.params` object
- it helps to use `curl -v` (or postman) to check the exact server response
- it helps to log incoming requests (or parts of it) on server side to the console
- use query string replacement (`?`) instead of manual string composition to avoid sql injections
- it is expected that when you run the app multiple times, the `CREATE TABLE` or collection creation will fail (since it already exists); you can safely ignore that.


For the remainder of this assignment, you will need to access a mysql and a MongoDB database server.
You can either use a basic installation available at `tesla.inf.fh-rosenheim.de` (only reachable via `fhintern` WiFi), or run your own instances.
The recommended (and simplest) way is to use [docker](https://www.docker.com) which is available for Windows, Mac and Linux.
To start the containers, use the following docker commands:

```sh
$ docker run --rm -d --name wt17-mongo -p 27017:27017 mongo
$ docker run --rm -d --name wt17-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=mydb -e MYSQL_USER=user -e MYSQL_PASSWORD=dbpassword mysql
```

Learn more about the [mongo](https://github.com/docker-library/docs/tree/master/mongo) and [mysql](https://github.com/docker-library/docs/tree/master/mysql) images.

You can later stop (and remove) the containers using 

```sh
$ docker stop wt17-mongo
$ docker stop wt17-mysql
```


## Changing the Body Parser

For the remainder of this assignment, we want to parse the body as JSON data and still serve static files.
Also, we will need the hostname of the database server, use either `localhost` if using docker, or `tesla.inf.fh-rosenheim.de` (must connect from `fhintern`).
Make sure to include the following with your app.

```js
// hostname of database server, or 'localhost'
const host = 'tesla.inf.fh-rosenheim.de'

// serve static files from folder 'static/'
app.use(express.static('static'))

// parse all body as JSON (before: text via bp.text())
app.use(express.json())
```

When sending request bodies, don't forget to set the `Content-Type: application/json` header!


## mongodb

Install the `mongo` node module by running `npm install mongdb`; in your app, include it using

```js
const mongo = require('mongodb')
```

First of all, we need to establish a database connection and create a collection.
Note that all calls to the `mongo` object will return promises that can be used with `.then(callback)` (success) and `.catch(callback)` (error).
When creating a collection on `tesla`, please name it after your student login!

```js
const url = `mongodb://${host}:27017/mydb`;
let db
mongo.MongoClient.connect(url)
	.then(function (connection) {
		db = connection
		return db.collection('riko493');
	})
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log(err);
	});
```

Implement the endpoints listed above.
You can find a the necessary CRUD commands in the [mongo documentation](https://docs.mongodb.com/manual/crud/):
- use `db.insertOne(obj)` to insert a single object
- use `db.find().toArray()` to get a promise to all entries
- use `db.findOne(query)` to find a single element matching the query object
- use `db.deleteOne(query)` to delete a single element matching the query object

**Important tip:** Use **alphanumeric** (string) ids for mongo, e.g. `asd123`, not numbers (these lead to weird issues of not finding the objects later).


## mysql

Install the `mysql2` node module by running `npm install mysql2`; in your app, include it using

```js
const mysql = require('mysql2/promise')
```
> Note: This is the "promise wrapper" for mysql that allows more convenient chaining of commands/queries.

First of all, we need to establish a database connection and create a table (use your student id as name) with attributes id (`int`, primary) and name (`varchar(20)`).

Note that all calls to the `mysql` object will return promises that can be used with `.then(callback)` (success) or `.catch(...)` (error).
When creating a database on `tesla`, please name it after your student login!

```js
let db  // will be set below!
mysql.createConnection({
		host: host,
		user: 'user',
		password: 'dbpassword',
		database: 'mydb'
	})
	.then((connection) => {
		db = connection  // remember the db-handle!
		return db.query('CREATE TABLE students (id varchar(10) not null, name varchar(20), primary key (id))')
	})
	.then((result) => {
		console.log(result)
		console.log('Database and table created.')
	})
	.catch((err) => console.log(err));  // log errors to console
```

Implement the endpoints listed above.
You can find a brief walk-through of the commands in this [w3school tutorial](https://www.w3schools.com/nodejs/nodejs_mysql.asp).
Basically, you will always use `db.query(...)` with a valid sql query.
