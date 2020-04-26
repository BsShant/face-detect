import React, {Component} from 'react';
import './register.css';

class Register extends Component{
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			name:''
		}
	}
	onEmailChange=(event)=>{
		
		this.setState({email: event.target.value});

	}
	onPasswordChange=(event)=>{
		
		this.setState({password: event.target.value});

	}
	onNameChange=(event)=>{
		
		this.setState({name: event.target.value});

	}
	onSubmitLogin=()=>{
	
		fetch('https://nameless-earth-38463.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
				
			})

		}).then(response=> response.json()).then(user=>{
			
			
			if(user.id){
				this.props.loadUser(user);
				this.props.onSignUp();
			}
			/*this.props.loadUser(user);*/
			
		})
		
		
		
		
		
		

	}
render(){
	
	return(
		<article>
		<fieldset>
		<label for="name">Username:</label>
		<input onChange={this.onNameChange} type="text" name="username" id="name" placeholder="enter your username"/><br/>
		<label for="name">Password:</label>
		<input onChange={this.onPasswordChange} type="password" name="password" placeholder="enter your password"/><br />
		<label for="email">Email:</label>
		<input onChange={this.onEmailChange} type="email" name="email" placeholder="enter your email"/><br />
		<button onClick={this.onSubmitLogin}>SignUp</button>
		
		</fieldset>

		</article>
		);
}
}
export default Register;