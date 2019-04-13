import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faPhone, faHome } from '@fortawesome/free-solid-svg-icons'
import PhoneBook from './components/phonebook';

library.add(faUser, faPhone, faHome);

const CONTACTS_URL = 'http://www.mocky.io/v2/581335f71000004204abaf83';

class App extends Component {
  state = {
    contacts: [],
    loading: true,
    error: false
  }

  async componentDidMount() {
    try {
      let jsonData = await fetch(CONTACTS_URL);
      let data = await jsonData.json();
      this.setState({
        contacts: data.contacts,
        loading: false
      });
    }
    catch(err) {
      this.setState({
        error: err
      });
    }
  }

  render() {
    const { contacts, loading, error } = this.state;
    return (
      <main className="app">
      {error
      ? <div className="error">Woops! There's been an error.</div>
      : loading
      ? <div className="loading">Loading...</div>
      : <PhoneBook contacts={contacts}/>
      } 
      </main>
    );
  }
}

export default App;
