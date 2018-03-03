import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NewPoll.css';


class NewPoll extends Component {
  constructor() {
    super();
    this.state = {
      question: "",
      answers: ["red", "blue", "yellow", "green"]
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
      answers: [...this.state.answers, " . . . "]
    })
  }
  handleDelete(event) {
    let i = event.target.name;
    let arr = this.state.answers.slice();
    arr.splice(i, 1);
    this.setState({answers: arr});
    console.log(arr)
    console.log(this.state.answers)
  }
  handleChange(event) {}

componentDidMount() {
  console.log(this.props.authData)
}
  handleSubmit(event) {
    event.preventDefault();
    if(!this.props.authData.fbId) {alert("You need to be logged in to submit new polls!")}
    else {
      let creator = { name: this.props.authData.username, fbId: this.props.authData.fbId } ;
      let arr = []
      var i = event.target.length -4
      console.log(event.target[0].value)
      for( let j = 1; j <= i; j++ ) {
        console.log((i-(i-j)));
        arr.push(event.target[(i-(i-j))].value)
        j++;
      }
      console.log(arr);

      fetch("/newpolls", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
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
    

    const answers = this.state.answers.map((x, i) =>  <div className="answerBox" key={i}>
                                                        <input className="answer"
                                                               type="text"
                                                               name={i}
                                                               placeholder={x}
                                                               onChange={this.handleChange}/>
                                                        <button className="delete" name={i} type="button" key={i} onClick={this.handleDelete}>X</button>
                                                      </div> );
    return (
      <div className="newPoll"><Link to="/"><button className="back" type="button">back</button></Link>
        <h1>Create a new Poll</h1>
        <form onSubmit={this.handleSubmit}>
          <input className="question" type="text" name="question" placeholder="What's your favorite color?"/>
          
          <div className="answers">
            {answers}
          </div>
          
          <button type="submit" value="Submit">Submit</button>
          <button type="button" onClick={this.handleAddAnswer}>add answer</button>
        </form>
      
      </div>
    );
  }
}


export default NewPoll;
