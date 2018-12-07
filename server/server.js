require('dotenv').config();
const express = require('express');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const routes = require('./routes.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  	res.header('Access-Control-Allow-Origin', '*');
 	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, refreshtoken, Access-Control-Allow-Credentials");
	res.header("Access-Control-Allow-Credentials", "true");
  	next();
});

var db;

mongodb.MongoClient.connect(process.env.DB_KEY, (err, client) => {
	if(err) { throw err; }
	else { console.log("Connection to database established!") };
	
	db = client.db("votinappdb");
})

app.use((req, res, next) => {
	req.db = db;
	next();
})

routes(app); 

app.listen(5000, () => {console.log("Listening on 5000 . . . ")});

