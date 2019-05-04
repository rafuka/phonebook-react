import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './login.scss';

class Login extends Component {
  state = {
    email: {
      value: '',
      error: '',
      touched: false
    },
    password: {
      value: '',
      error: '',
      touched: false
    },
    isValid: true,
    error: ''
  }

  submitForm = async e => {
    e.preventDefault();

    if (this.state.isValid) {
      const {
        email: { value: email },
        password: { value: password }
      } = this.state;

      console.log(JSON.stringify({email, password}));
      console.log('submitting login form...');
      let response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      let jsonData = await response.json();
      console.log('data', jsonData);
      console.log(!jsonData.error);
      if (!jsonData.error) {
        localStorage.setItem('authToken', jsonData.token);
        await this.props.onAuthenticate(true)
        this.props.history.push("/");
      }
      else {
        this.setState({
          error: jsonData.error
        });
      }
    }
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: {
        value: value,
        error: '',
        touched: this.state[name].touched
      }
    });
  }

  render() { 
    return (
      <form>
        <input onChange={this.handleChange} name="email" type="email"/>
        <input onChange={this.handleChange} name="password" type="password"/>
        <button onClick={this.submitForm} type="submit">Log In</button>
      </form>
    );
  }
}
 
export default withRouter(Login);