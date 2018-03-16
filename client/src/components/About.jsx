import React, { Component } from 'react';
import './About.css';

class About extends Component {

	render() {
		return(
			<div className="container">

				<h1>About</h1>
				<div className="guide-container">
					<div className="guide-box"><i className="guide-icon fas fa-user-circle"></i><div className="guide-title">1. Log in</div><div className="guide-text">Log in with one click via Facebook. We do not use cookies and do not save any credentials.</div></div>
					<div className="guide-box"><i className="guide-icon fas fa-question-circle"></i><div className="guide-title">2. Create your Poll</div><div className="guide-text">Fill out the form. You can add & remove answers however you like. Click submit to save your poll.</div></div>
					<div className="guide-box"><i className="guide-icon fas fa-share-alt"></i><div className="guide-title">3. Share Link</div><div className="guide-text">You will get a Link in return. This link will redirect to your poll. Share it with your friends!</div></div>
					<div className="guide-box"><i className="guide-icon fas fa-chart-pie"></i><div className="guide-title">4. Get results</div><div className="guide-text">Your results will be displayed with a chart, for easy evaluating.</div></div>
				</div>

				<p>If you are not logged in you can still <strong>view</strong> and <strong>vote</strong> on polls from others.</p>
				
				<br/><br/><br/>

				<h1>FAQ</h1>
				<div className="clarification">
					<p><strong>Login:</strong> You need a facebook account. Authentication via facebook is currently the only authentication method supported.</p>
					<p><strong>Searchbar:</strong> Currently only looks for a match in poll titles and author names.</p>
					<br/><br/>
					<h4>Found some bugs? Contact me via Github or get in touch with me <a href="http://attiimaster.github.io/#contact" className="alt" target="_blank" rel="noopener noreferrer">here</a>.</h4>
				</div>
			
			
			
			</div>
)
}
}

export default About;