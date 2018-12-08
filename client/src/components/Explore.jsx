import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Explore.css';

import PollBox from "./PollBox";

class Explore extends Component {
	constructor() {
		super();
		this.state = {
			polls: [[], []],
		}
	}

  	componentDidMount() {
      	fetch('https://youvote-api.glitch.me/explore') // https://youvote-api.glitch.me
        	.then(res => res.json())
        	.catch(err => console.error(err))
        	.then(polls => {
        		this.setState({ polls });
        		console.log('Polls fetched...', polls);
        	});
  	}

	render() {
		const { polls } = this.state;
		return(
			<div className="container">
				<h1 className="">Explore</h1>
				
				<div className="polls">	
					<Container polls={ polls[0] } title={ "hot right now" } icon={ "fas fa-fire orange" } />
					<Container polls={ polls[1] } title={ "recently asked" } icon={ "far fa-clock" } />
				</div>

			</div>
		);
	}
}

export default Explore;


const Container = ({ icon, title, polls }) => {
	return (
		<div className="split">
			<h3 className=""><i className={ icon }></i> { title }</h3>
			{ polls.map((poll, i) => <PollBox poll={ poll } key={i} />) }
    	</div>
	)
}