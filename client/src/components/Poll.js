import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Poll.css';

class Poll extends Component {
  constructor() {
    super();
    this.state = {
      poll: {answers: ["yes", "Nos"]}
    };
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let id = this.props.location.pathname.slice(6);   //window.location.href
    fetch('/poll/' + id)
      .then(res => res.json())
      .then(poll => this.setState({poll}, () => console.log('Poll fetched...', poll)));
  }

  handleClick(event) {
    console.log(this.state.poll.answers[0])
  }

  handleSubmit(event) {
    event.preventDefault();
    const arrVotes = this.state.poll.votes;
    
    for(let i=0;i<event.target.length;i++) {
      if(event.target[i].checked) {
        console.log(i)
        arrVotes[i] = arrVotes[i] + 1;
        console.log(arrVotes)
        this.setState(this.state.poll.votes: arrVotes)

        console.log(this.state.poll)
        fetch("/vote", {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify(this.state.poll),
        })
      }
    }
  }

  render() {
    return (
      <div className="poll"><Link to="/"><button className="back" type="button">back</button></Link>
        <h1>{this.state.poll.question}</h1><h4 className="creator">{this.state.poll.creator}' Poll</h4>
        <div className="choices">
          <form onSubmit={this.handleSubmit}>
              {this.state.poll.answers.map(x => {
                              return  <div className="choice">
                                        <label><input type="radio" name="choice"/>{x}</label>
                                      </div>
                            }
                )}
              <br/>  
              <button type="submit">Submit</button>
          </form>
        </div>
        
        <button tspe="button" onClick={this.handleClick}>test</button>
        <Link to="/new"><button type="button">New Poll</button></Link>
      </div>
    );
  }
}

export default Poll;
