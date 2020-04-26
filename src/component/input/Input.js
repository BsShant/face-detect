import React from 'react';
import './input.css';

const Input=({onInputChange, onButtonSubmit}) =>{
	return(
		<div className="input">
		<input type="text" onChange={onInputChange} />
		<button type="submit" onClick={onButtonSubmit} >Detect</button>
		</div>


		);
}
export default Input;