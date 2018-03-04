import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NewPoll from './components/NewPoll';
import Start from './components/Start';
import MyPolls from './components/MyPolls';
import Poll from './components/Poll';
import FacebookLoginButton from './components/FacebookLoginButton';



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
              <p className="welcome">Welcome back, {username}</p>
           }
{/*<div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>*/}
        </nav>
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express Starter</h1>
        </header>

        <Route exact path="/" component={Start} />
        <Route path="/new" render={props => <NewPoll authData={this.state} {...props} />} />
        <Route path="/my" render={props => <MyPolls authData={this.state} {...props} />} />
        <Route path="/poll/:input" render={props => <Poll authData={this.state} {...props} />} />
      </div>
      </Router>
    );
  }
}


export default App;
