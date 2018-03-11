const ObjectId = require('mongodb').ObjectId;

module.exports = (app, db) => {

//=============================  /start  ====================================
	app.get('/search/:input', (req, res) => {
		let input = req.params.input
		console.log(input)
		db.collection("polls").createIndex( { question: "text", creator: "text" } )
		db.collection("polls").find({ $text: { $search: input }}).toArray((err, result) => {
			if(err) {throw new Error}
			console.log(result)
			let polls = result;
			res.json(polls)
		})
	})

//=============================  /newpolls  ====================================
	app.post('/newpolls', (req, res) => {
		console.log("new poll incoming . . . ")
		let doc = req.body;
		doc.votes = [];
		doc.created = new Date().toISOString();
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

//=============================  /poll  ====================================
	app.get('/poll/:input', (req, res) => {
		console.log("New Request inc: " + req.params.input.toString())
		let doc ;		// eher id: 
		db.collection("polls").find( { _id: new ObjectId(req.params.input) } ).toArray((err, result) => {
			doc = result[0];
			res.json(doc);
		})
	});

	app.post('/vote', (req, res) => {
		console.log("updating votes . . . ")
		let doc = req.body;
		let sumVotes = doc.votes.reduce((pv, cv) => pv+cv, 0);
		console.log(doc._id)													//todo: update voters aswell
		db.collection("polls").update({ _id: new ObjectId(doc._id) }, {$set: {votes: doc.votes, answers: doc.answers, sumVotes: sumVotes}}, {upsert: true})
		res.redirect('/poll/' + doc._id)
	})

//=============================  /mypolls  ====================================
	app.get('/mypolls/:input',  (req, res) => {
		let fbId = req.params.input; //you have to go to /my loggedIn or fbId = null
		//let mypolls ;
		console.log(fbId)
		//let creator = activeUser
		db.collection("polls").find({fbId: fbId}).toArray((err, result) => {
			let mypolls = result;
	  		res.json(mypolls);
		})
	});

	app.post('/delete', (req, res) => {
		let pollId = req.body.pollId;
		console.log(pollId)
		db.collection("polls").remove({ _id: new ObjectId(pollId) })
		.then(res => console.log("poll removed successfully"))
		res.end()
	})

//=============================  /explore  ====================================
	app.get('/explore', (req, res) => {
		let arr = []
		db.collection("polls").find().sort({sumVotes:-1}).limit(5).toArray((err, result) => {
			arr[0] = result;
			db.collection("polls").find().sort({created:-1}).limit(5).toArray((err, result) => {
				arr[1] = result;
				res.json(arr)
			})
		})
	})

//=============================  /auth  ====================================	
	app.post('/facebookAuth', (req, res) => {
		//console.log(req.body)
		let doc = {
			name: req.body.userData.name,
			fbId: req.body.userData.id,
			email: "doc.email",
			createdAt: new Date().toString()
		}
		db.collection("users").update(	{ fbId: doc.fbId },
										{ name: doc.name,
										  fbId: doc.fbId,
										  email: "doc.email", 
										  createdAt: new Date().toString() }, 
									  	{ upsert: true } );
		//console.log(doc)
		res.end()
	})


}