import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class loginSuccess extends Component {
  constructor() {
    super();
    this.state = {
      mypolls: []
    };
  }

  componentDidMount() {
    let code = this.props.location.search;
    console.log(code)
    fetch('/auth/github/callback' + code, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
      })
    }).then(res => console.log(res))
  }


  render() {
    return (
      <div className="myPolls"><Link to="/"><button className="back" type="button">back</button></Link>
        <h1>Login successful!</h1>
        <h4>You will be redirected shortly.</h4>
      </div>
    );
  }
}

export default loginSuccess;
