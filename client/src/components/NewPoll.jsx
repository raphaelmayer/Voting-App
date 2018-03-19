import React, { Component } from 'react';
import './NewPoll.css';


class NewPoll extends Component {
  constructor() {
    super();
    this.state = {
      question: "",
      placeH: [ "red", "blue", "yellow", "green" ],
      answers: [ "red", "blue", "yellow", "green" ],
      /*answer1: "red", 
      answer2: "blue", 
      answer3: "yellow",
      answer4: "green"*/
    }

    this.handleAddAnswer = this.handleAddAnswer.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
  };

  handleAddAnswer(event) {
    this.setState({
      placeH: [...this.state.placeH, " . . . "]
    })
  }
  handleDelete(event) {
    let i = event.target.name;
    console.log("I: " + i)
    let arr = this.state.placeH.slice();
    console.log(arr)
    arr.splice(i, 1);
    this.setState({placeH: arr});
    console.log(this.state.answers)
  }
  handleChange(event) { //not in use for now
    let i = event.target.attributes.name.value;
    console.log("i: " + i)
    let input = event.target.value;
    console.log("input: " + input)
    let arr = this.state.answers.slice();
    arr[i] = event.target.value;
    console.log(arr)
    this.setState({
      answers: arr
    })
  }

componentDidMount() {
  console.log(this.props.authData)
}
/*
  createAnswers(event, arr) {
    var i = event.target.length -4
    for( let j = 1; j <= i; j++ ) {
        console.log((i-(i-j)));
        arr.push(event.target[(i-(i-j))].value)
        j++;
      }
  }
*/
  handleSubmit(event) {
    event.preventDefault();
    if(!this.props.authData.fbId) {alert("You need to be logged in to submit new polls!")}
    else {
      let arr = []
      var i = event.target.length -4
      console.log(event.target[0].value)
      for( let j = 1; j <= i; j++ ) {
        console.log((i-(i-j)));
        arr.push(event.target[(i-(i-j))].value)
        j++;
      }
      console.log(arr);

      fetch("https://youvote-api.glitch.me/newpolls", {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': 'https://youvote-api.glitch.me',
          'Access-Control-Allow-Methods': 'GET, POST',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          creator: this.props.authData.username,
          fbId: this.props.authData.fbId,
          question: event.target[0].value,
          answers: arr,
        })
      }).then(this.handleSuccess)

    }
  } 

  handleSuccess(res) {
      console.log(res)
      if( res.status === 200) { 
        window.location.href = res.url }
      else { 
        alert("Error when posting poll to backend!")}
    }

  render() {
    

    const placeH = this.state.placeH.map((x, i) =>  <div className="answerBox" key={i}>
                                                        <input className="answer"
                                                               type="text"
                                                               name={i}
                                                               placeholder={x}
                                                               onChange={this.handleChange}/>
                                                        <button className="delete" name={i} type="button" key={i} onClick={this.handleDelete} tabIndex="-1">X</button>
                                                      </div> );
    return (
      <div className="container">
        <h1>Create a new Poll</h1>
        <form onSubmit={this.handleSubmit}>
          <input className="question" type="text" name="question" placeholder="What's your favorite color?"/>
          
          <div className="placeH">
            {placeH}
          </div>
          
          <button className="btn" type="submit" value="Submit">Submit</button>
          <button className="btn" type="button" onClick={this.handleAddAnswer}>add answer</button>
        </form>
      
      </div>
    );
  }
}


export default NewPoll;
