import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyPolls.css';

class MyPolls extends Component {
  constructor() {
    super();
    this.state = {
      mypolls: []
    };

    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillMount() {
    if(this.props.authData.fbId) {
      fetch('/mypolls/' + this.props.authData.fbId) //
        .then(res => res.json())
        .then(mypolls => this.setState({mypolls}, () => console.log('My polls fetched...', mypolls)));
      }   
    }

  handleDelete(event) {
    let pollId = event.target.previousSibling.attributes.href.value.slice(27)

    for(let i=0;i<this.state.mypolls.length;i++) {  //to remove poll from state
      if(this.state.mypolls[i]._id === pollId && this.props.authData.isAuth && this.props.authData.fbId === this.state.mypolls[i].fbId) {    //find poll in state
        let arr = this.state.mypolls
        arr.splice(i, 1)
        this.setState(arr)                          //set new state

        fetch('/delete', {                          //remove poll from db
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({pollId: pollId})
        })        
      } else alert("Error! You do not seem to be the creator of this poll!")
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
          <div key={mypolls.id}>
            <a href={"http://localhost:3000/poll/" + mypolls._id} className="pollBox">
              <div className="myPollContent pollQuestion"> {mypolls.question} </div>
              {/*<div className="myPollContent"> {mypolls._id} </div>*/}
              <div className="myPollContent pollVotes"> {mypolls.votes.reduce((pv, cv) => pv+cv, 0)} </div>
              <div className="myPollContent creator"> {mypolls.creator} </div>
            </a>
            <button className="delete" onClick={this.handleDelete} key={mypolls.id}>X</button>
          </div>
        )}
        </div>

      <Link to="/new"><button type="button">New Poll</button></Link>
      </div>
    );
  }
}

export default MyPolls;
