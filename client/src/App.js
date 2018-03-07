import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NewPoll from './components/NewPoll';
import Start from './components/Start';
import MyPolls from './components/MyPolls';
import Poll from './components/Poll';
import FacebookLoginButton from './components/FacebookLoginButton';
import Explore from './components/Explore';




class App extends Component {
  state = {
    isAuth: false,
    username: null,
    fbId: null
  };

  onFacebookLogin = (loginStatus, resultObject) => {
    if (loginStatus === true) {
      console.log(resultObject)
      this.setState({
        isAuth: true,
        username: resultObject.user.name,
        fbId: resultObject.user.id
      });
    } else {
    //  alert('Facebook login error');
    }
  }

  render() {
    const { username, isAuth, fbId } = this.state;

    return (
      <Router>
      <div className="App">
        
        <nav>
          <Link to="/"><div className="logo"><i className="fa fa-users faLogo"></i>YouVote</div></Link>
          <ul className="nav-ul"><Link to="/"><li className="nav-li">Home</li></Link><Link to="/my"><li className="nav-li">My Polls</li></Link><Link to="/about"><li className="nav-li">About</li></Link></ul>
          { !username &&
              <div>
                <FacebookLoginButton onLogin={this.onFacebookLogin}>
                  <button className="login-button"><i className="fab fa-facebook-square"></i><div className="fb-button-text">Continue with Facebook</div></button>
                </FacebookLoginButton>
              </div>
          }{ username &&
              <p className="welcome">Welcome back, {username.split(" ")[0]}. <button type="button">Logout</button></p>
           }
{/*<div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>*/}
        </nav>
        
        <div className="tbd">Amazing! Nice! W. O. W. !.</div>
        
        <header className="header">
        <div className="guide-container">
          <div className="guide-box"><div className="guide-title">1. Log in</div><div className="guide-text">Log in with one click via Facebook. We do not use cookies and do not save your personal data.</div></div>
          <div className="guide-box"><div className="guide-title">2. Create your Poll</div><div className="guide-text">Fill out the form. You can add & remove answers however you like. Click submit to continue.</div></div>
          <div className="guide-box"><div className="guide-title">3. Share Link</div><div className="guide-text">You will get a Link in return. This link will redirect to your poll. Share it with your friends!</div></div>
          <div className="guide-box"><div className="guide-title">4. Get results</div><div className="guide-text">Your results will be displayed with a chart, for easy evaluating.</div></div>
        </div>
        </header>

        <Route exact path="/" component={Start} />
        <Route path="/new" render={props => <NewPoll authData={this.state} {...props} />} />
        <Route path="/my" render={props => <MyPolls authData={this.state} {...props} />} />
        <Route path="/poll/:input" render={props => <Poll authData={this.state} {...props} />} />

        <div className="footer">
          <div>2018 - YouVote - A Voting-App by Raphael Mayer</div>
          <br/>
          <a href="http://github.com/attiimaster/voting-app" target="_blank"><i className="fab fa-github"></i> YouVote on Github</a>
        </div>
      </div>
      </Router>
    );
  }
}


export default App;
