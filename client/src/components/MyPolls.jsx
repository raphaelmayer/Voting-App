import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/MyPolls.css';

import PollBox from "./PollBox";

class MyPolls extends Component {
  constructor() {
    super();
    this.state = {
      polls: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    if(this.props.authData.fbId) {
      fetch('https://youvote-api.glitch.me/mypolls/' + this.props.authData.fbId) //
        .then(res => res.json())
        .then(polls => this.setState({polls}, () => console.log('My polls fetched...', polls)));
    }  
  }

  componentWillReceiveProps(nextProps) {  //fixes not rendering polls on refresh
    if(this.props.authData !== nextProps.authData) {
      fetch('/mypolls/' + nextProps.authData.fbId) //
        .then(res => res.json())
        .then(polls => this.setState({polls}, () => console.log('My polls fetched...', polls)));
    }       
  }


  handleDelete(event) {
    event.preventDefault();
    const { polls } = this.state;
    const { authData } = this.props;

    if (window.confirm("Are you sure you want to delete this poll?")) {
      let pollId = event.target.parentElement.parentElement.attributes.href.nodeValue.slice(7)
  
      for(let i=0; i<polls.length; i++) {  //to remove poll from state
        if(polls[i]._id === pollId && this.props.authData.isAuth && this.props.authData.fbId === polls[i].fbId) {    //find poll in state
          let arr = polls
          arr.splice(i, 1)
          this.setState(arr)                          //set new state
  
          fetch('https://youvote-api.glitch.me/delete', {                          //remove poll from db
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({pollId: pollId})
          })        
        }// else alert("Error! You do not seem to be the creator of this poll!")
      }      
    } 
    
  }
    
  render() {
    const { polls } = this.state;

    {if(!this.props.authData.isAuth) {
      return (<h1 className="container">You need to be logged in to view this page!</h1>)
    }}

    return (
      <div className="container">
        <h1>My Polls</h1>

        <div className="polls">
          { polls.map((poll, i) => <PollBox poll={ poll } handleDelete={ this.handleDelete } key={i} />) }
        </div>
        
        <Link to="/new" className="btn">New Poll</Link>
      </div>
    );
  }
}

export default MyPolls;
