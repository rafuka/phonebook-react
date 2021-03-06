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
    faIdCard,
    faPlus,
    faTimes,
    faUserSlash,
    faUserEdit,
} from '@fortawesome/free-solid-svg-icons';
import {
    PhoneBook,
    CredentialsForm
} from './components';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import formStyles from './components/CredentialsForm/CredentialsForm.module.scss';
import './global.scss';

const transitionClassNames = {
    enterActive: formStyles.enterActive,
    enter: formStyles.enter,
    exitActive: formStyles.exitActive,
    exit: formStyles.exit
};

library.add(
    faUser,
    faUserPlus,
    faPhone,
    faHome,
    faEnvelope,
    faKey,
    faLock,
    faIdCard,
    faPlus,
    faTimes,
    faUserSlash,
    faUserEdit
);

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
                const jsonData = await fetch(`${process.env.REACT_APP_API_URL}/contacts`, {
                    headers: {
                        "authorization": `Bearer ${authToken}`,
                    }
                });

                const data = await jsonData.json();

                if (data.error) {
                    this.setState({
                        isAuthenticated: false,
                        loading: false
                    });
                } else {
                    this.setState({
                        contacts: data.contacts,
                        loading: false
                    });
                }
            } catch (err) {
                console.error(err);
                this.setState({
                    error: err
                });
            }
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const {
            contacts,
            loading,
            isAuthenticated
        } = this.state;

        return (
            <main className="app">
                {loading
                    ? <div className="loading">Loading...</div>
                    : (
                        <Router>
                            <Route render={({ location, history }) => (
                                <TransitionGroup className={location.pathname === "/login" || location.pathname === "/signup" ? "form-wrapper" : "phonebook-wrapper"}>
                                    <CSSTransition
                                        key={location.key}
                                        timeout={1000}
                                        classNames={transitionClassNames}
                                    >
                                       
                                        <Switch location={location}>
                                            <Route exact path="/login" render={() =>
                                                isAuthenticated
                                                    ? <RedirectFix action={history.action} to="/" />
                                                    : <CredentialsForm onAuthenticate={this.onAuthentication} />
                                            } />
                                            <Route exact path="/signup" render={() =>
                                                isAuthenticated
                                                    ? <RedirectFix action={history.action} to="/" />
                                                    : <CredentialsForm signup onAuthenticate={this.onAuthentication} />
                                            } />
                                            <Route exact path="/" render={() =>
                                                isAuthenticated
                                                    ? <PhoneBook contacts={contacts} />
                                                    : <RedirectFix action={history.action} to="/login" />
                                            } />
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            )} />
                        </Router>
                    )
                }
            </main>
        );
    }
}

/*
* Code taken from https://github.com/reactjs/react-transition-group/issues/296
* to solve issue with redirection within CSSTransition component
*/
const RedirectFix = ({ action, to }) =>
    action === 'REPLACE' ? null : <Redirect to={to} />

export default App;
