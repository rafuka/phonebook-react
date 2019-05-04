import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faUserPlus, faPhone, faHome, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'
import PhoneBook from './components/phonebook';
import Login from './components/login';
import Signup from './components/signup';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './global.scss';

library.add(faUser, faUserPlus, faPhone, faHome, faEnvelope, faKey);

class App extends Component {
  state = {
    contacts: [],
    loading: true,
    error: false,
    isAuthenticated: !!localStorage.getItem('authToken')
  }

  onAuthentication = isAuth => {
    this.setState({ isAuthenticated: isAuth });
  }

  async componentDidMount() {
    
    if (this.state.isAuthenticated) {
      const authToken = localStorage.getItem('authToken');

      try {
        let jsonData = await fetch(`${process.env.REACT_APP_API_URL}/contacts`, {
          headers: {
            "authorization": `Bearer ${authToken}`,
          }
        });

        let data = await jsonData.json();

        if (data.error) {
          this.setState({
            isAuthenticated: false,
            loading: false
          });
        }
        else {
          this.setState({
            contacts: data.contacts,
            loading: false
          });
        }
      }
      catch(err) {
        console.error(err);
        this.setState({
          error: err
        });
      }
    }
    else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const { contacts, loading, error } = this.state;
    return (
      <main className="app">
        <Router>
        {loading
        ? <div className="loading">Loading...</div>
        : <Switch>  
            <Route exact path="/login" render={() => 
              this.state.isAuthenticated ? <Redirect to="/"/> : <Login onAuthenticate={this.onAuthentication}/>
            }/>
            <Route exact path="/signup" render={() => 
              this.state.isAuthenticated ? <Redirect to="/"/> : <Signup onAuthenticate={this.onAuthentication}/>
            }/>
            <Route exact path="/" render={() =>
              this.state.isAuthenticated ? <PhoneBook contacts={contacts}/> : <Redirect to="/login" />
            }/>
          </Switch>
        } 
        </Router>
      </main>
    );
  }
}

export default App;
