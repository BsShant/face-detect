import React, {Component} from 'react';
import Logo from './component/logo/Logo.js';
import SignIn from './component/signIn/SignIn.js';
import Input from './component/input/Input.js';
import Image from './component/image/Image.js';
import LogIn from './component/login/LogIn.js';
import Rank from './component/rank/Rank.js';
import Register from './component/register/Register.js';
import './App.css';



const initialState={
	input: '',
			imageUrl:'',
			form:'signup',
			box: {},
			user:{
				id: '',
				name: '',
				email: '',
				password: '',
				entries: 0,
				date: '',
			}
}
class App extends Component{
	constructor(){
		super();
		this.state= initialState;

	}
	
	loadUser=(data)=>{
		this.setState({user:{
				id: data.id,
				name: data.name,
				email: data.email,
				password: data.password,
				entries: data.entries,
				date: data.date
		}})
		
	}
	
	calculateImageBox=(output)=>{
		
		const data= output.outputs[0].data.regions[0].region_info.bounding_box;
	
		const image= document.getElementById("image");
		const height = Number(image.height);
		const width= Number(image.width);
		var box = new Object();
		box.left = data.left_col*width;
		box.right= width-(data.right_col*width);
		box.top= data.top_row* height;
		box.bottom= height-(data.bottom_row*height);

		return box;
		
	
}
		
	setImageBox=(box)=>{
		
		this.setState({box : box});

	}
	
	homePageDisplay=()=>{
		this.setState({form: 'home'});
	}
	signInDisplay=()=>{
		this.setState(initialState);	
	}
	registerDisplay=()=>{
		this.setState({form: 'register'});
	}
	
	onInputChange= (event) =>{
		
		this.setState({input:event.target.value});
	}
	onButtonSubmit= () =>{
		this.setState({imageUrl: this.state.input});
		fetch('https://nameless-earth-38463.herokuapp.com/imageApi', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						input: this.state.input
					})

				})
		.then(data=> data.json())
		.then(response=>{
			if(response) {
					fetch('https://nameless-earth-38463.herokuapp.com/image', {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
					})

				})
				.then(response=> response.json())
				.then(count=>{
					this.setState(Object.assign(this.state.user, {entries:count}))
					console.log(this.state.user.entries);
				})
			}


			this.setImageBox(
			this.calculateImageBox(response)
			)
		})
			.catch(err=>console.log(err));
		    
		  
	}
	
	render(){
  return (
  	 
    <div className="App">
    {this.state.form==='signup' ?
  	 <LogIn loadUser={this.loadUser} onLogin={this.homePageDisplay} onRegister={this.registerDisplay}/>:
  	 <div>
  	 {this.state.form==='register' ?
  	 <Register loadUser={this.loadUser} onSignUp={this.homePageDisplay}/>:
  	 <div>
    <div className="top">
    <Logo />
    <SignIn onSignOut={this.signInDisplay}/>
    </div>
    <Rank name={this.state.user.name} count={this.state.user.entries}/>
    <Input  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
    <Image box={this.state.box} imageUrl={this.state.imageUrl}/>
    </div>}
      </div>}
    </div>
  );
}
}

export default App;
