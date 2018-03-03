import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyPolls.css';

class MyPolls extends Component {
  constructor() {
    super();
    this.state = {
      mypolls: []
    };
  }

  componentWillMount() {
    if(this.props.authData.fbId) {
      fetch('/mypolls/' + this.props.authData.fbId) //
        .then(res => res.json())
        .then(mypolls => this.setState({mypolls}, () => console.log('My polls fetched...', mypolls)));
      }   
    }
    
  render() {
    {if(!this.props.authData.isAuth) {
      return (
        <h1>You need to be logged in to view this page!</h1>
        )
    }}
    return (
      <div className="myPolls"><Link to="/"><button className="back" type="button">back</button></Link>
        <h1>My Polls</h1>
        <div className="polls">
        {this.state.mypolls.map(mypolls => 
          <a href={"http://localhost:3000/poll/" + mypolls._id} className="pollBox" key={mypolls.id}>
            <div className="myPollContent pollQuestion"> {mypolls.question} </div>
            {/*<div className="myPollContent"> {mypolls._id} </div>*/}
            <div className="myPollContent pollVotes"> {mypolls.votes.reduce((pv, cv) => pv+cv, 0)} </div>
            <div className="myPollContent creator"> {mypolls.creator} </div>
          </a>
        )}
        </div>
      <Link to="/new"><button type="button">New Poll</button></Link>
      </div>
    );
  }
}

export default MyPolls;
