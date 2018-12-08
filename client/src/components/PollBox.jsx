import React from "react";
import { Link } from "react-router-dom";
import "./css/PollBox.css";

const PollBox = ({ poll, handleDelete }) => {
	return (
		<Link to={ "./poll/" + poll._id }>
		  	<div className="search-results-box">
		  	  	<div className="search-results-question">{poll.question } 
		  	  	  	<div className="search-results-votes">{ poll.votes.reduce((pv, cv) => pv+cv, 0) }</div>
		  	  	</div>
		  	  	<div className="search-results-creator">Asked by { poll.creator.split(" ")[0] }</div>
		  	  	{ handleDelete && <button className="delete2" onClick={ handleDelete } key={ poll._id }>X</button> }
		  	</div>
		</Link>
	);
}

export default PollBox;