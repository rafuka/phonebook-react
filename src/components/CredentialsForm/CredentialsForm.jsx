import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './CredentialsForm.scss';

class CredentialsForm extends Component {
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

      const { signup } = this.props;

      const fetchUrl = `${process.env.REACT_APP_API_URL}/users/${signup ? "signup" : "login"}`;
      const reqData = signup
        ? JSON.stringify({name, email, password})
        : JSON.stringify({email, password});

      try {
        const response = await fetch(fetchUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: reqData
        });
  
        const jsonData = await response.json();
  
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
      } catch(err) {
        this.setState({
          error: err
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
    const { signup } = this.props;

    return (
      <form className="credentials-form">
        <header className="credentials-form__header">
          <Icon className="icon" icon={signup ? "user-plus" : "user"} />
          <h2>{signup ? "Create an account" : "Log In to your account"}</h2>
        </header>
        <div className="credentials-form__body">
          {signup && 
          <div className="form-field">
            <Icon className="icon" icon="id-card" />
            <p className="error-msg"></p>
            <input
              onChange={this.handleChange}
              name="name"
              type="text"
              placeholder="Name"
            />
          </div>
          }
          <div className="form-field">
            <Icon className="icon" icon="envelope" />
            <p className="error-msg"></p>
            <input
              onChange={this.handleChange}
              name="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="form-field">
            <Icon className="icon" icon="key" />
            <p className="error-msg"></p>
            <input
              onChange={this.handleChange}
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          {signup &&
          <div className="form-field">
            <Icon className="icon" icon="lock" />
            <p className="error-msg"></p>
            <input
              onChange={this.handleChange}
              name="password"
              type="password"
              placeholder="Repeat Password"
            />
          </div>
          }
          <button
            onClick={this.submitForm}
            type="submit"
          >
            {signup ? "Sign Up" : "Log In"}
          </button>
          {signup ? <Link to="/login">or Log In</Link> : <Link to="/signup">or Sign Up</Link>}
        </div>
      </form>
      
    );
  }
}
 
export default withRouter(CredentialsForm);