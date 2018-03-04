
require('dotenv').config();
const express = require('express');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongodb.MongoClient.connect(process.env.DB_KEY, (err, client) => {
	if(err) { throw err; }
	else { console.log("Connection to database established!") };
	
	var db = client.db("votinappdb");


	app.get('/poll/:input', (req, res) => {
		console.log("New Request inc: " + req.params.input.toString())
		let doc ;		// eher id: 
		db.collection("polls").find( { _id: new ObjectId(req.params.input) } ).toArray((err, result) => {
			doc = result[0];
			res.json(doc);
		})
	});

	app.get('/mypolls/:input',  (req, res) => {
		let fbId = req.params.input; //you have to go to /my loggedIn or fbId = null
		let mypolls ;
		console.log(fbId)
		//let creator = activeUser
		db.collection("polls").find({fbId: fbId}).toArray((err, result) => {
			mypolls = result;
	  		res.json(mypolls);
		})
	});

	app.post('/newpolls', (req, res) => {
		console.log("new poll incoming . . . ")
		let doc = req.body;
		doc.votes = [];
		doc.created = new Date().toString();
		doc.voters = [];

		let j = doc.answers.length;
		for(i=0;i<j;i++) {
			doc.votes.push(0)
		}
		
		let insertedDoc;
		db.collection("polls").insert(doc, (err, response) => {
			if(err) throw err;
			insertedDoc = response.ops[0]._id.toString();
			console.log("Inserted new document " + JSON.stringify(response.ops[0]._id));
			res.redirect('/poll/' + insertedDoc)
		});
	})

	app.get('/search', (req, res) => {
		db.collection("polls").find({})
	})

	app.post('/vote', (req, res) => {
		console.log("updating votes . . . ")
		let doc = req.body;
		console.log(doc._id)													//todo: update voters aswell
		db.collection("polls").update({ _id: new ObjectId(doc._id) }, {$set: {votes: doc.votes, answers: doc.answers}}, {upsert: true})
		res.redirect('/poll/' + doc._id)
	})
	
	app.post('/facebookAuth', (req, res) => {
		//console.log(req.body)
		let doc = {
			name: req.body.userData.name,
			fbId: req.body.userData.id,
			createdAt: new Date().toString()
		}
		db.collection("users").update(	{ fbId: doc.fbId },
										{ name: doc.name,
										  email: "doc.email", 
										  createdAt: new Date().toString() }, 
									  	{ upsert: true } );
		//console.log(doc)
		res.end()
	})

	app.post('/delete', (req, res) => {
		let pollId = req.body.pollId;
		console.log(pollId)
		db.collection("polls").remove({ _id: new ObjectId(pollId) })
		.then(res => console.log("poll removed successfully"))
		res.end()
	})


	app.listen(5000, () => {console.log("Listening on 5000 . . . ")});

})

