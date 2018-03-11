import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import NewPoll from './components/NewPoll';
import Start from './components/Start';
import MyPolls from './components/MyPolls';
import Poll from './components/Poll';
import FacebookLoginButton from './components/FacebookLoginButton';
import About from './components/About';
import Explore from './components/Explore';


class App extends Component {
  state = {
    isAuth: false,
    username: null,
    fbId: null
  };

componentDidMount() {console.log(this.state)}

  onFacebookLogin = (loginStatus, resultObject) => {
    if (loginStatus === true) {
      console.log(resultObject)
      this.setState({
        isAuth: true,
        username: resultObject.user.name,
        fbId: resultObject.user.id
      });
      console.log(this.state)
    } else {
    //  alert('Facebook login error');
    }
  }

    /*facebookLogout = () => {    //meh
    window.FB.getLoginStatus(res => {
      if(res.status === 'connected') {
        window.FB.logout(function(response) {  
          // Person is now logged out
        });
        this.setState({
        isAuth: false,
        username: null,
        fbId: null
      });
      }
    })
  }*/

  render() {
    const { username, isAuth, fbId } = this.state;

    const NavBar = props => {
      return (
        <nav>
          <Link to="/"><div className="logo"><i className="fa fa-users faLogo"></i>YouVote</div></Link>
          <div className="right-side">

                <div>
                  <FacebookLoginButton onLogin={this.onFacebookLogin} isAuth={this.state.isAuth} username={this.state.username}>
                    <button className="login-button"><i className="fab fa-facebook-square"></i><div className="fb-button-text">Continue with Facebook</div></button>
                  </FacebookLoginButton>
                </div>

            <ul className="nav-ul"><Link to="/"><li className="nav-li">Home</li></Link><Link to="/explore"><li className="nav-li">Explore</li></Link><Link to="/my"><li className="nav-li">My Polls</li></Link><Link to="/about"><li className="nav-li">About</li></Link></ul>
          </div>
        </nav>
        )
    }
    const Footer = props => {
      return (
        <div className="footer">
          <div>2018 - YouVote - A voting app by Raphael Mayer</div>
          <br/>
          <a href="http://github.com/attiimaster/voting-app" target="_blank"><i className="fab fa-github"></i> YouVote on Github</a>
        </div>
        )
    }

    return (
      <Router>
        <div className="App">
          
          <NavBar />
      
          {/*<div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>*/}
      
          <div className="tbd">
            <div className="tbd-container">Log in 
              <i className="fas fa-arrow-circle-right"></i> Create your poll 
              <i className="fas fa-arrow-circle-right"></i> Share it with friends 
              <i className="fas fa-arrow-circle-right"></i> ???  
              <i className="fas fa-arrow-circle-right"></i> Profit! 
            </div>
          </div>
          
          <div className="main">        
            <Route exact path="/" component={Start} />
            <Route path="/new" render={props => <NewPoll authData={this.state} {...props} />} />
            <Route path="/my" render={props => <MyPolls authData={this.state} {...props} />} />
            <Route path="/poll/:input" render={props => <Poll authData={this.state} {...props} />} />
            <Route path="/about" component={About} />
            <Route path="/explore" component={Explore} />
          </div>

          <Footer />
  
        </div>
      </Router>
    );
  }
}


export default App;
