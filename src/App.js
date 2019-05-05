import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faUserPlus,
  faPhone,
  faHome,
  faEnvelope,
  faKey,
  faLock,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';
import PhoneBook from './components/phonebook';
import CredentialsForm from './components/credentials-form';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './global.scss';

library.add(faUser, faUserPlus, faPhone, faHome, faEnvelope, faKey, faLock, faIdCard);

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
    const { contacts, loading, isAuthenticated } = this.state;
    return (
      <main className="app">
        <Router>
        {loading
        ? <div className="loading">Loading...</div>
        : <Route render={({ location }) => (
            <TransitionGroup className={location.pathname === "/login" || location.pathname === "/signup" ? "form-wrapper" : ""}>
              <CSSTransition
                key={location.key}
                timeout={1000}
                classNames="fade"
              >
                <Switch location={location}> 
                  <Route exact path="/login" render={() => 
                    isAuthenticated
                    ? <Redirect to="/"/>
                    : <CredentialsForm onAuthenticate={this.onAuthentication}/>
                  }/>
                  <Route exact path="/signup" render={() => 
                    isAuthenticated
                    ? <Redirect to="/"/>
                    : <CredentialsForm signup onAuthenticate={this.onAuthentication}/>
                  }/>
                  <Route exact path="/" render={() =>
                    isAuthenticated
                    ? <PhoneBook contacts={contacts}/>
                    : <Redirect to="/login" />
                  }/>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}/>
        } 
        </Router>
      </main>
    );
  }
}

export default App;
