const Strategy = require('passport-github2').Strategy;


module.exports = (passport) => {

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
		})
	);
}