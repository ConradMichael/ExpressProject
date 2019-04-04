import React, { Component } from 'react';
import './App.css';

class Login extends Component {
  render() {
    return (
      <div>        
		<header className="Nav-Header">
			<form className="Nav-Login">
				UserID: <input className="Nav-Login-Input"></input>
				Password: <input className="Nav-Login-Input"></input>
			</form>
				<button className="Main-Nav"> Test </button>
        </header>
      </div>
    );
  }
}

export default Login;
