import React, { Component } from 'react';
import Chart from './Chart';
import './Poll.css';

class Poll extends Component {
  constructor() {
    super();
    this.state = {
      poll: {answers: [],
             votes: [],
             creator: " ",
             created: " ",}
    };
    this.handleAddAnswer = this.handleAddAnswer.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  };

  componentWillMount() {
    let id = this.props.location.pathname.slice(6);   //window.location.href
    fetch('https://youvote-api.glitch.me/poll/' + id)
      .then(res => res.json())
      .then(poll => this.setState({poll}, () => {
        console.log('Poll fetched...', poll);
    }))
  };

  handleAddAnswer(event) {
    if(this.props.authData.isAuth) {
      let input = prompt("Enter new answer . . . ")
      console.log(this.state.poll.answers)
      let obj = this.state.poll;
      obj.answers.push(input)
      obj.votes.push(0)
      this.setState(obj)
      
    } else alert("You need to be logged in to perform this action!")
  };

  handleSubmit(event) { // => votes dont update
    event.preventDefault();
    const poll = this.state.poll;
    
    for(let i=0;i<event.target.length;i++) {
      if(event.target[i].checked) {
        poll.votes[i] = poll.votes[i] + 1;
        //poll.voters.push(this.props.username)
        this.setState(this.state.poll.votes: poll.votes)

//console.log(this.state.poll)
        fetch("https://youvote-api.glitch.me/vote", {
          method: 'POST',
          body: JSON.stringify(this.state.poll),
          headers: {
            'Access-Control-Allow-Origin': 'https://youvote-api.glitch.me',
            'Access-Control-Allow-Methods': 'GET, POST',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
      }
    }
  };

  render() {
    const { poll } = this.state
    //const votesum = poll.votes.reduce((pv, cv) => pv+cv, 0)
    const name = poll.creator.split(" ")
    const date = poll.created.slice(0, 19).split("T")
    const Choices = poll.answers.map((x, i) => {
                                return  <div className="choice" key={i}>
                                          <label><input type="radio" name="choice"/>{x}</label>
                                        </div>
                              });

    const Description = () => {
      return (
        <div className="desc">
          <strong>Link:</strong><div className="poll-link"> {"http://localhost:3000/poll/" + poll._id}</div> 
          <br/>
          <strong>Asked by {name[0]}</strong> on {date[0]} -- {date[1]}
          <br/>
        </div>
      )};
    
    return (
      <div className="container">
        <h1>{poll.question}</h1><div>by {name[0]}</div>
        
        <div className="center-container">

          <div className="choices">
            <form onSubmit={this.handleSubmit}>
                {Choices}
                <br/>  
                <button className="btn" type="submit">Submit</button>
                <button className="btn" type="button" onClick={this.handleAddAnswer}>add option</button>
            </form>
          </div>

          <Chart poll={poll} />

        </div>
        <Description />
        <br/>
      </div>
    )
  }
};

export default Poll;
