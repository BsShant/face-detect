import React from 'react';
import './image.css';

const Image=({imageUrl, box}) =>{
	return(
		<div className="image">
		<div className="inner">
		<img alt="photo" id="image" src={imageUrl} width="300px" height="auto"/>
		<div className='box' style={{top: box.top, right: box.right, bottom: box.bottom, left:box.left}}>
		</div>
		</div>
		</div>
		);
}
export default Image; 