import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = data => {
    const { name, number } = data;
    const { contacts } = this.state;

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const contactName = contacts.map(contact => contact.name.toLowerCase());

    if (contactName.includes(name.toLowerCase())) {
      return alert(`${data.name} is already in contacts.`);
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = evt => {
    this.setState({
      filter: evt.currentTarget.value,
    });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilterName = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterName)
    );
  };

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          items={visibleContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}
