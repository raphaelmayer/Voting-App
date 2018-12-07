const ps = require("./services/poll.service.js")

module.exports = app => {

//=============================  /polls  ====================================
	app.get('/search/:input', ps.searchPolls);
	app.post('/newpolls', ps.newPoll);
	app.get('/poll/:input', ps.getPoll);
	app.post('/vote', ps.voteOnPoll);
	app.get('/mypolls/:input', ps.getMyPolls);
	app.post('/delete', ps.deletePoll)
	app.get('/explore', ps.explorePolls)

//=============================  /auth  ====================================	
	app.post('/facebookAuth', (req, res) => {
		const db = req.db;
		//console.log(req.body)
		let doc = {
			name: req.body.userData.name,
			fbId: req.body.userData.id,
			email: "doc.email",
			//createdAt: new Date().toISOString()
		}
		db.collection("users").update(	{ fbId: doc.fbId },
										{ name: doc.name,
										  fbId: doc.fbId,
										  email: "doc.email", 
										  createdAt: new Date().toISOString() }, 
									  	{ upsert: true } );
		//console.log(doc)
		res.end()
	})


}