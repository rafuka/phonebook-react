import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
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
      <form className="login-form">
        <header className="login-form__header">
          <Icon className="icon" icon="user" />
          <h2>Log In to your account</h2>
        </header>
        <div className="login-form__body">
        <div className="form-field">
          <Icon className="icon" icon="envelope"/>
          <p className="error-msg"></p>
          <input
            onChange={this.handleChange}
            name="email"
            type="email"
            placeholder="email"
          />
        </div>
        <div className="form-field">
          <Icon className="icon" icon="key"/>
          <p className="error-msg"></p>
          <input
            onChange={this.handleChange}
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        <button onClick={this.submitForm} type="submit">Log In</button>
        </div>
      </form>
    );
  }
}
 
export default withRouter(Login);