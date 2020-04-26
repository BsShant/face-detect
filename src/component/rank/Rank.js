import React from 'react';
import './rank.css';

const Rank=({count,name})=>{
	return(
		<div>
		<h2>Hello {name}!!</h2>
		<p>Your Entry is {count}</p>
		</div>
		)
}

export default Rank;