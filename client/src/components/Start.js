import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Start.css';

class Start extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
        <div className="start">
          <div className="startBox">
            <h1>What do you want to do?</h1>
            <Link to="/new"><button type="button">New Poll</button></Link>
            <Link to="/my"><button>My Polls</button></Link>
          </div>
        </div>
    );
  }
}

export default Start;
