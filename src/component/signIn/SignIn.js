import React from 'react';
import './signIn.css';

const SignIn=({onSignOut}) =>{
	return(
		<div className="signIn">
		<h2 onClick={onSignOut}>Sign out</h2>
		</div>

		);
}

export default SignIn;