import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js';
import './Poll.css';

class Poll extends Component {
  constructor() {
    super();
    this.state = {
      poll: {answers: ["yes", "Nos"]}
    };
    this.handleAddAnswer = this.handleAddAnswer.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let id = this.props.location.pathname.slice(6);   //window.location.href
    fetch('/poll/' + id)
      .then(res => res.json())
      .then(poll => this.setState({poll}, () => {
        console.log('Poll fetched...', poll);

//=============================Chartjs===========================
        let poll = this.state.poll;
        let data = {
          datasets: [{
              data: poll.votes,
              backgroundColor: [ 'rgba(255, 99, 132, 0.8)',
                                 'rgba(54, 162, 235, 0.8)',
                                 'rgba(255, 206, 86, 0.8)',
                                 'rgba(255, 159, 64, 0.8)',
                                 'rgba(153, 102, 255, 0.8)',
                                 'rgba(75, 192, 192, 0.8)' ]}],
          labels: poll.answers,
        };

        let options = {

        };

        var ctx = document.getElementById("myChart");

        var myPieChart = new Chart( ctx, {
            type: 'pie',
            data: data,
        })
//===============================================================
    }))
  }

  handleAddAnswer(event) {
    if(this.props.authData.isAuth) {
      let input = prompt("Enter new answer . . . ")
      console.log(this.state.poll.answers)
      let obj = this.state.poll;
      obj.answers.push(input)
      obj.votes.push(0)
      this.setState(obj)
      
    } else alert("You need to be logged in to perform this action!")
  }

  handleSubmit(event) {
    const poll = this.state.poll;
    
    for(let i=0;i<event.target.length;i++) {
      if(event.target[i].checked) {
        poll.votes[i] = poll.votes[i] + 1;
        //poll.voters.push(this.props.username)
        this.setState(this.state.poll.votes: poll.votes)

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
        
        <div className="chartContainer">
          <canvas id="myChart"></canvas>
        </div>

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
              <button className="" type="button" onClick={this.handleAddAnswer}>add option</button>
          </form>
        </div>
        
        
        <Link to="/new"><button type="button">New Poll</button></Link>
        
      </div>
    );
  }
}

export default Poll;
