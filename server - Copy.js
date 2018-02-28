
require('dotenv').config();
const express = require('express');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const passport = require('passport');
const Strategy = require('passport-github2').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


mongodb.MongoClient.connect(process.env.DB_KEY, (err, client) => {
	if(err) { throw err; }
	else { console.log("Connection to database established!") };
	
	var db = client.db("votinappdb");

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


passport.use(new Strategy({
	clientID: process.env.GITHUB_KEY,
	clientSecret: process.env.GITHUB_SECRET,
	callbackURL: 'http://localhost:5000/auth/github/callback',
	passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, cb) {
		console.log("accessToken: " + accessToken)
		console.log(req)
		db.collection("users").update(	{ githubId: profile.id }, 
										{ githubId: profile.id, 
										  username: profile.username, 
										  name: profile.displayName,
										  accessToken: accessToken, 
										  createdAt: new Date().toString() }, 
									  	{ upsert: true }, (err, user) => {
			if(err) {throw err}
			return cb(null, profile);
		})
	}));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



	
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // function will not be called.
  });

app.get('/auth/github/callback', 		//console.log(req.query)(req.user)(req.session)(req.sessionID)
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {  	
  	let url = "https://github.com/login/oauth/access_token?client_id=" + process.env.GITHUB_KEY +
              "?client_secret=" + process.env.GITHUB_SECRET + 
              "?code=" + req.body.code;
//console.log(req.query)
console.log("xxxxxxxxxxxxx req.session xxxxxxxxxxxxxx")
console.log(req.session)
console.log("req.sessionID: " + req.sessionID)
console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    res.send(req.session.passport.user);
  });


	app.get('/poll/:input', (req, res) => {
		console.log("New Request inc: " + req.params.input.toString())
		let doc ;		// eher id: 
		db.collection("polls").find( { _id: new ObjectId(req.params.input) } ).toArray((err, result) => {
			doc = result[0];
			res.json(doc);
		})
	});

	app.get('/mypolls',  (req, res) => {
console.log("xxxxxxxxxxxxx req.session xxxxxxxxxxxxxx")
console.log(req.session)
		let mypolls ;
		//let creator = activeUser
		db.collection("polls").find({creator: 'Anonymous'}).toArray((err, result) => {
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
		
		console.log(doc)
		db.collection("polls").insert(doc, (err, response) => {
			if(err) throw err;
			console.log("Inserted new document " + JSON.stringify(response.ops[0]._id));
		});
		res.end("newDoc")	
	})

	app.get('/search', (req, res) => {
		db.collection("polls").find({})
	})

	app.post('/vote', (req, res) => {
		console.log("updating votes . . . ")
		let doc = req.body;
		console.log(doc._id)		
		db.collection("polls").update({ _id: new ObjectId(doc._id) }, {$set: {votes: doc.votes}}, {upsert: true})
		.then(res => console.log(res.result))
		res.end("nice")
	})
	

	app.listen(5000, () => {console.log("Listening on 5000 . . . ")});
})

