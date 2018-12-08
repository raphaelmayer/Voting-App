import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Start.css';

import PollBox from "./PollBox";

class Start extends Component {
  constructor() {
    super();
    this.state = {
      polls: []
    };

    this.handleSearch = this.handleSearch.bind(this)
  };

  handleSearch(e) {
    e.preventDefault();
    const input = e.target[0].value;

    fetch("https://youvote-api.glitch.me/search/" + input)        
      .then(res => res.json())
      .then(polls => {
        this.setState({ polls, searchTerm: input });
        console.log('Polls fetched . . .', polls);
        document.getElementById("search-results-container").setAttribute("style", "display: block;");
      })
  };

  render() {
    const { polls, searchTerm } = this.state;
    
    return (
        <div className="container">    
          <div className="startBox"><h1>What do you want to do?</h1></div>
          
          <SearchBarContainer handleSearch={ this.handleSearch } />

          <p>If you are not logged in you can still <strong>view</strong> and <strong>vote</strong> on polls from others.</p>

          <SearchResultsContainer polls={ polls } searchTerm={ searchTerm } />
        </div>
    );
  }
}

export default Start;


const SearchBarContainer = ({ handleSearch }) => {
  return (
    <div className="search-bar-container">
      <form className="search-bar-form" onSubmit={ handleSearch } >
        <input className="search-bar-input" type="text" placeholder="search for polls . . . "/>
        <button className="btn" type="submit">Search</button>
      </form>
      <Link to="/new" className="btn">New Poll</Link>
    </div>
  )
}

const SearchResultsContainer = ({ polls, searchTerm }) => {
  return (
    <div className="search-results-container" id="search-results-container">
      <h2>{ polls.length } Search results for <u>{ searchTerm }</u>:</h2> 
      { polls.map((poll, i) => <PollBox poll={ poll } key={i} />) }
    </div>
  )
}