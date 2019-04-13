import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './phonebook.scss';

class PhoneBook extends Component {
  state = {};

  render() { 
    const { contacts } = this.props;

    return (
      <div className="phonebook">
        <header className="phonebook__header">
          <h2 className="phonebook__title">Contacts</h2>
        </header>
        
        <section className="phonebook__contacts">

          <div className="scroller" onScroll={this.handleScroll}>
          {contacts.map((contact, index) => (
            <div className="contact" key={index}>
              <p className="contact__name">
                <FontAwesomeIcon className="icon" icon="user"/><span>{contact.name}</span>
              </p>
              <p className="contact__phone">
                <FontAwesomeIcon className="icon" icon="phone"/><span>{contact.phone_number}</span>
              </p>
              <p className="contact__address">
                <FontAwesomeIcon className="icon" icon="home"/><span>{contact.address}</span>
              </p>
            </div>
          ))}   
          </div>
        
        </section>
      </div>
    );
  }
}
 
export default PhoneBook;