import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Start.css';

class Start extends Component {
  constructor() {
    super();
    this.state = {
      polls: [{
        question: "",
        votes: [],
        _id: "",
        creator: "",
      }],
    };

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(event) {
    event.preventDefault()
    let input = event.target[0].value
    //console.log(input)
    this.setState({searchTerm: input})
    fetch("/search/" + input)        
        .then(res => res.json())
        .then(polls => this.setState({polls}, () => {
          console.log('Polls fetched . . .', polls);
          document.getElementById("search-results-container").setAttribute("style", "display: block;")
        }));
  }

  render() {
    const polls = this.state.polls;
    const searchTerm = this.state.searchTerm;
    const SearchBarContainer = props => {
      return (
          <div className="search-bar-container">
            <form className="search-bar-form" onSubmit={this.handleSearch}>
              <input className="search-bar-input" type="text" placeholder="search for polls . . . "/>
              <button className="btn" type="submit">Search</button>
            </form>
            <Link to="/new" className="btn">New Poll</Link>
          </div>
        )
    }    
    const SearchResultsContainer = props => {
      return (
        <div className="search-results-container" id="search-results-container">
          <h2>{polls.length} Search results for <u>{searchTerm}</u>:</h2> 
            {polls.map(polls => 
              <Link to={"./poll/" + polls._id}>
              <div className="search-results-box">
                <div className="search-results-question">{polls.question} 
                  <div className="search-results-votes">{polls.votes.reduce((pv, cv) => pv+cv, 0)}</div>
                </div>
                <div className="search-results-creator">Asked by {polls.creator.split(" ")[0]}</div>
              </div>
              </Link>
            )}
          </div>
      )
    }
    
    return (
        <div className="container">
          
          <div className="startBox">
            <h1>What do you want to do?</h1>
          </div>
          
          <SearchBarContainer />

          <p>If you are not logged in you can still <strong>view</strong> and <strong>vote</strong> on polls from others.</p>

          <SearchResultsContainer />

        </div>
    );
  }
}

export default Start;
