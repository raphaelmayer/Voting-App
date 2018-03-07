import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js';
import './Poll.css';

class Poll extends Component {
  constructor() {
    super();
    this.state = {
      poll: {answers: [],
             votes: [],
             creator: "string",
             created: "string",}
    };
    this.handleAddAnswer = this.handleAddAnswer.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
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
          cutoutPercentage: 60,
          elements: {center: {
          text: this.state.poll.votes.reduce((pv, cv) => pv+cv, 0) + " votes"}},
        };

        Chart.pluginService.register({  //draw votes sum in center
          beforeDraw: function (chart) {
            if (chart.config.options.elements.center) {
              //Get ctx from string
              var ctx = chart.chart.ctx;
              
              //Get options from the center object in options
              var centerConfig = chart.config.options.elements.center;
              var fontStyle = centerConfig.fontStyle || 'Arial';
              var txt = centerConfig.text;
              var color = centerConfig.color || '#000';
              var sidePadding = centerConfig.sidePadding || 20;
              var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
              //Start with a base font of 30px
              ctx.font = "30px " + fontStyle;
              
              //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
              var stringWidth = ctx.measureText(txt).width;
              var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

              // Find out how much the font can grow in width.
              var widthRatio = elementWidth / stringWidth;
              var newFontSize = Math.floor(30 * widthRatio);
              var elementHeight = (chart.innerRadius * 2);

              // Pick a new font size so it will not be larger than the height of label.
              var fontSizeToUse = Math.min(newFontSize, elementHeight);

              //Set font settings to draw it correctly.
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
              var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
              ctx.font = fontSizeToUse+"px " + fontStyle;
              ctx.fillStyle = color;
              
              //Draw text in center
              ctx.fillText(txt, centerX, centerY);
            }
          }
        });

        var ctx = document.getElementById("myChart");
        var myPieChart = new Chart( ctx, {
            type: 'doughnut',
            data: data,
            options: options,
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
    const votesum = this.state.poll.votes.reduce((pv, cv) => pv+cv, 0)
    const name = this.state.poll.creator.split(" ")
    const date = this.state.poll.created.slice(0, 16)
    
    return (
      <div className="main">
        <h1>{this.state.poll.question}</h1><div>by {name[0]}</div>
        
        <div className="center-container">
          <div className="choices">
            <form onSubmit={this.handleSubmit}>
                {this.state.poll.answers.map(x => {
                                return  <div className="choice">
                                          <label><input type="radio" name="choice"/>{x}</label>
                                        </div>
                              }
                  )}
                <br/>  
                <button className="btn" type="submit">Submit</button>
                <button className="btn" type="button" onClick={this.handleAddAnswer}>add option</button>
            </form>
          </div>

          <div className="chartContainer">
            <canvas id="myChart"></canvas>
          </div>

        </div>

        <div className="desc">
          <strong>Link:</strong><div className="poll-link"> {"http://localhost:3000/poll/" + this.state.poll._id}</div> 
          <br/><strong>Asked by {name[0]}</strong> on {date}<br/>
        </div>
        <br/>
      </div>
    );
  }
}

export default Poll;
