import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NewPoll from './components/NewPoll';
import Start from './components/Start';
import MyPolls from './components/MyPolls';
import Success from './components/Success';
import loginSuccess from './components/loginSuccess';
import Poll from './components/Poll';
import Customers from './components/customers';



class App extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <Router>
      <div className="App">
        
        <nav>
          <a className="navBtn login" href="http://localhost:5000/auth/github" target="_blank">Log in</a>
          <div className="navBtn signup">Sign Up</div>
        </nav>
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express Starter</h1>
        </header>

        <Route exact path="/" component={Start} />
        <Route path="/new" component={NewPoll} />
        <Route path="/my" component={MyPolls} />
          <Route path="/my/success" component={Success} />
        <Route path="/poll/:input" component={Poll} />
        <Route path="/auth/github/callback" component={loginSuccess} />
        <Route path="/login" component={Customers} />
      </div>
      </Router>
    );
  }
}

export default App;
