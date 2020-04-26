import React, {Component} from 'react';
import './login.css';

class LogIn extends Component{
	
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:''
		}
	}
	onEmailChange=(event)=>{
		this.setState({email: event.target.value});

	}
	onPasswordChange=(event)=>{
		this.setState({password: event.target.value});

	}
	onSubmitLogin=()=>{
		
		fetch('https://nameless-earth-38463.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})

		}).then(response=> response.json()).then(data=>{
			
			if(data.id){
				this.props.loadUser(data);
				this.props.onLogin();
			}
			
			
		})
		/*this.props.onLogin();*/
		
		
		

	}


	render(){
		const {onRegister}= this.props;
		return(
		<article>
		<fieldset>
		<label>Email:</label>
		<input onChange={this.onEmailChange} type="email" name="email" id="email" placeholder="enter your email"/><br/>
		<label for="name">Password:</label>
		<input onChange={this.onPasswordChange} type="password" name="password" placeholder="enter your password"/><br />
		<button onClick={this.onSubmitLogin}>LogIn</button>
		<br /><p onClick={onRegister}>Register</p>
		</fieldset>

		</article>
		);

	}
}

export default LogIn;