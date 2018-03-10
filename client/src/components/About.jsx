import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

class About extends Component {

	render() {
		return(
			<div className="container">
			<h1>about</h1>

		              <header className="header">
		              	<h4>HOW TO</h4>
                                	<div className="guide-container">
                                		<div className="guide-box"><div className="guide-title">1. Log in</div><div className="guide-text">Log in with one click via Facebook. We do not use cookies and do not save your personal data.</div></div>
                                		<div className="guide-box"><div className="guide-title">2. Create your Poll</div><div className="guide-text">Fill out the form. You can add & remove answers however you like. Click submit to continue.</div></div>
                                		<div className="guide-box"><div className="guide-title">3. Share Link</div><div className="guide-text">You will get a Link in return. This link will redirect to your poll. Share it with your friends!</div></div>
                                		<div className="guide-box"><div className="guide-title">4. Get results</div><div className="guide-text">Your results will be displayed with a chart, for easy evaluating.</div></div>
                                	</div>
                                </header>
                
                                <p>If you are not logged in you can still <strong>view</strong> and <strong>vote</strong> on polls from others.</p>
                
                <br/><br/><br/><br/><br/><br/><br/><br/>
                
                                <h4>Found some bugs? Contact me via Github or get in touch with me <a href="http://attiimaster.github.io/#contact" className="alt" target="_blank">here</a>.</h4>
                

		        </div>
		)
	}
}

export default About;