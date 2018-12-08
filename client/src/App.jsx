import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import NewPoll from './components/NewPoll';
import Start from './components/Start';
import MyPolls from './components/MyPolls';
import Poll from './components/Poll';
import About from './components/About';
import Explore from './components/Explore';

import NavBar from './components/NavBar';
import Footer from './components/Footer';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuth: false,
      username: null,
      fbId: null,
      toggleNav: false,
    }; 
    this.handleNavButton = this.handleNavButton.bind(this)
  }

  onFacebookLogin(loginStatus, resultObject) {
    if (loginStatus === true) {
      //console.log(resultObject)
      this.setState({
        isAuth: true,
        username: resultObject.user.name,
        fbId: resultObject.user.id
      });
      //console.log(this.state)
    } else {
    //  alert('Facebook login error');
    }
  }

  handleNavButton(event) {
    event.preventDefault();
    if(this.state.toggleNav) {
      this.setState({toggleNav: false})
    } else {
      this.setState({toggleNav: true})
    }
  }

  render() {
    const { username, isAuth } = this.state;

    return (
      <Router>
        <div className="App">
          
          <NavBar isAuth={ isAuth } username={ username } onFacebookLogin={ this.onFacebookLogin } />
          
      
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