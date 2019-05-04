import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './signup.scss';

class Signup extends Component {
  state = {
    name: {
      value: '',
      error: '',
      touched: false
    },
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
    passRepeat: {
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
        name: { value: name },
        email: { value: email },
        password: { value: password }
      } = this.state;

      console.log(name, email, password);
      console.log('submitting form...');
      let response = await fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      let jsonData = await response.json();
      if (!jsonData.error) {
        localStorage.setItem('authToken', jsonData.token);
        await this.props.onAuthenticate(true);
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
        <input
          id="name"
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.state.name.value}
        />
        <input
          id="email"
          type="email"
          name="email"
          onChange={this.handleChange}
          value={this.state.email.value}
        />
        <input
          id="password"
          type="password"
          name="password"
          onChange={this.handleChange}
          value={this.state.password.value}
        />
        <input
          id="password-repeat"
          type="password"
          name="passRepeat"
          onChange={this.handleChange}
          value={this.state.passRepeat.value}
        />
        <button onClick={this.submitForm} type="submit">Sign Up</button>
      </form>
    );
  }
}

export default withRouter(Signup);