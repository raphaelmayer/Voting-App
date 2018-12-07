const ObjectId = require('mongodb').ObjectId;

module.exports = {
	newPoll,
	voteOnPoll,
	deletePoll,
	explorePolls,
	searchPolls,
	getPoll,
	getMyPolls
}

function newPoll(req, res) {
	const db = req.db;
	console.log("new poll incoming . . . ")
	let doc = req.body;
	doc.votes = [];
	doc.created = new Date().toISOString();
	doc.voters = [];

	let j = doc.answers.length;
	for(let i=0;i<j;i++) {
		doc.votes.push(0)
	}
	
	let insertedDoc;
	db.collection("polls").insert(doc, (err, response) => {
		if(err) throw err;
		insertedDoc = response.ops[0]._id.toString();
		console.log("Inserted new document " + JSON.stringify(response.ops[0]._id));
		res.redirect('/poll/' + insertedDoc)
	});
}

function getPoll(req, res) {
	const db = req.db;
	db.collection("polls").find( { _id: new ObjectId(req.params.input) } ).toArray((err, result) => {
		res.json(result[0]);
	})
} 

function voteOnPoll(req, res) {
	const db = req.db;
	console.log("updating votes . . . ");
	let doc = req.body;
	let sumVotes = doc.votes.reduce((pv, cv) => pv+cv, 0);
	console.log(doc._id)													//todo: update voters aswell
	db.collection("polls").update({ _id: new ObjectId(doc._id) }, {$set: {votes: doc.votes, answers: doc.answers, sumVotes: sumVotes}}, {upsert: true})
	// res.redirect('/poll/' + doc._id)
}

function getMyPolls(req, res) {
	const db = req.db;
	let fbId = req.params.input; //you have to go to /my loggedIn or fbId = null
	//let mypolls ;
	console.log(fbId)
	//let creator = activeUser
	db.collection("polls").find({fbId: fbId}).toArray((err, result) => {
		let mypolls = result;
  		res.json(mypolls);
	})
}

function deletePoll(req, res) {
	const db = req.db;
	let pollId = req.body.pollId;
	console.log(pollId)
	db.collection("polls").remove({ _id: new ObjectId(pollId) })
	.then(res => console.log("poll removed successfully"))
	res.end()
}

function explorePolls(req, res) {
	const db = req.db;
    console.log("/explore");
	let arr = [];
	db.collection("polls").find().sort({sumVotes:-1}).limit(5).toArray((err, result) => {
		arr[0] = result;
		db.collection("polls").find().sort({created:-1}).limit(5).toArray((err, result) => {
			arr[1] = result;
			res.send(arr);
		})
	})
}

function searchPolls(req, res) {
	const db = req.db;
	let input = req.params.input
	//console.log(input)
	db.collection("polls").createIndex( { question: "text", creator: "text" } )
	db.collection("polls").find({ $text: { $search: input }}).toArray((err, result) => {
		if(err) {throw new Error}
		//console.log(result)
		let polls = result;
		res.json(polls)
	})
}