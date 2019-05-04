import React, { Component } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import './phonebook.scss';

class PhoneBook extends Component {
  state = {};

  render() { 
    const { contacts } = this.props;

    return (
      <div className="phonebook">
        <header className="phonebook__header">
          <h2 className="phonebook__title">User's Phonebook</h2>
          <button className="phonebook__add-user"><Icon className="icon" icon="user-plus" /></button>
        </header>
        
        <section className="phonebook__contacts">
          {contacts.count > 0
          ? contacts.map((contact, index) => (
            <div className="contact" key={index}>
              <p className="contact__name">
                <Icon className="icon" icon="user"/><span>{contact.name}</span>
              </p>
              <p className="contact__phone">
                <Icon className="icon" icon="phone"/><span>{contact.phone_number}</span>
              </p>
              <p className="contact__address">
                <Icon className="icon" icon="home"/><span>{contact.address}</span>
              </p>
            </div>
          ))
          : <div className="no-contacts">
              <p>You have no contacts yet.</p>
            </div>
          }   
        </section>
      </div>
    );
  }
}
 
export default PhoneBook;