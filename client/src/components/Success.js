import React, { Component } from 'react';

class Success extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		//fetch("/search")
	}

	render() {
		return (
		<div className="success">
			<h1>Submit successful!</h1>
			<p>Copy the Link and share it with your friends!</p>
			<a href="#">customLink</a>
		</div>
	)}
}
export default Success;