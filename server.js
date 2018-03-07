require('dotenv').config();
const express = require('express');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const routes = require('./routes.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongodb.MongoClient.connect(process.env.DB_KEY, (err, client) => {
	if(err) { throw err; }
	else { console.log("Connection to database established!") };
	
	var db = client.db("votinappdb");


	routes(app, db);

	
	app.listen(5000, () => {console.log("Listening on 5000 . . . ")});

})

