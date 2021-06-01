import React, { Component } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import './PhoneBook.scss';

class PhoneBook extends Component {
  state = {
    contacts: this.props.contacts,
    addContactBlock: 'closed',
    contactName: '',
    contactPhone: '',
    contactAddress: '',
    isValid: true
  };

  toggleAddContact = e => {
    this.state.addContactBlock === 'closed'
    ? this.setState({ addContactBlock: 'open' })
    : this.setState({ addContactBlock: 'closed' });
  }

  addContact = async e => {
    e.preventDefault();

    if (this.state.isValid) {
      const {
        contactName,
        contactPhone,
        contactAddress
      } = this.state;

      const fetchUrl = `${process.env.REACT_APP_API_URL}/contacts/`;
      const reqData = JSON.stringify({
        name: contactName,
        phone: contactPhone,
        address: contactAddress
      });

      const token = localStorage.getItem("authToken");

      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: reqData
      });

      const jsonData = await response.json();
      console.log(jsonData.createdContact);
      this.setState({
        contacts: [...this.state.contacts, jsonData.createdContact],
        contactName: '',
        contactPhone: '',
        contactAddress: ''
      });
    }
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  render() { 
    const { contacts, contactName, contactPhone, contactAddress } = this.state;

    return (
      <div className="phonebook">
        <header className="phonebook__header">
          <h2 className="phonebook__title">User's Phonebook</h2>
          <button className="phonebook__add-contact-btn" onClick={this.toggleAddContact}><Icon className="icon" icon="user-plus" /></button>
        </header>
        <div className={`add-contact ${this.state.addContactBlock}`}>
          <div className="form-field add-contact__name">
            <Icon className="icon" icon="user" />
            <input
              onChange={this.handleChange}
              value={contactName}
              type="text"
              name="contactName"
              placeholder="Contact Name"
            />
          </div>
          <div className="form-field add-contact__number">
            <Icon className="icon" icon="phone" />
            <input
              onChange={this.handleChange}
              value={contactPhone}
              type="text"
              name="contactPhone"
              placeholder="Contact Number"
            />
          </div>
          <div className="form-field add-contact__address">
            <Icon className="icon" icon="home" />
            <input
              onChange={this.handleChange}
              value={contactAddress}
              type="text"
              name="contactAddress"
              placeholder="Contact Address"
            />
          </div>
          <div className="add-contact__options">
            <button onClick={this.toggleAddContact} className="cancel"><Icon className="icon" icon="times" />Cancel</button>
            <button onClick={this.addContact}><Icon className="icon" icon="plus" />Add Contact</button>
          </div>
        </div>
        
        <section className="phonebook__contacts">
          {contacts.length > 0
          ? contacts.map((contact, index) => (
            <div className="contact" key={index}>
              <p className="contact__name">
                <Icon className="icon" icon="user"/><span>{contact.name}</span>
              </p>
              <p className="contact__phone">
                <Icon className="icon" icon="phone"/><span>{contact.phone}</span>
              </p>
              <p className="contact__address">
                <Icon className="icon" icon="home"/><span>{contact.address}</span>
              </p>
              <div className="contact__options">
                <span className="contact__delete">
                  <Icon className="icon" icon="user-slash" />
                </span>
                <span className="contact__edit">
                  <Icon className="icon" icon="user-edit" />
                </span>
              </div>
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