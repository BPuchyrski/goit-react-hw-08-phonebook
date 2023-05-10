// import {  useState } from "react"
import axios from 'axios';
import { useUser } from 'components/context/userContext';
import { useEffect, useState } from 'react';
import css from './Contacts.module.css';

// import { useEffect } from "react"

const Contacts = () => {
  const { user, logout, zalogowany } = useUser();

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const response = await axios.get(
      'https://connections-api.herokuapp.com/contacts'
    );
    console.log(response.data);
    setContacts(response.data);
  };

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addContact = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    console.log(name);
    const number = e.target.number.value;
    if (
      contacts.find(contact => contact.name === name) ||
      contacts.find(contact => contact.number === number)
    ) {
      alert(`already in contacts`);
      e.target.name.value = '';
      e.target.number.value = '';
      return;
    }
    const response = await axios.post(
      'https://connections-api.herokuapp.com/contacts',
      { name: name, number: number }
    );
    setContacts([...contacts, response.data]);
    e.target.name.value = '';
    e.target.number.value = '';
    console.log(response.data);
  };

  const deleteContact = async id => {
    await axios.delete(`https://connections-api.herokuapp.com/contacts/${id}`);
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleFilter = e => {
    if (e.target.value === '') {
      getContacts();
      return;
    }
    const value = e.target.value;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );
    setContacts(filteredContacts);
  };

  return (
    <div className={css.layout}>
      {zalogowany ? (
        <div>
          <h1>hello {user.name}</h1>
          <button className={css.btn} onClick={logout}>
            Logout
          </button>
          <form onSubmit={addContact}>
            <input
              className={css.input}
              type="text"
              name="name"
              placeholder="name"
            />
            <input
              className={css.input}
              type="text"
              name="number"
              placeholder="number"
            />
            <button className={css.btn} type="submit">
              Add contact
            </button>
          </form>
          <h1>Contacts</h1>
          <input
            className={css.input}
            type="text"
            placeholder="search"
            onChange={handleFilter}
          />
          <ul className={css.list}>
            {contacts.map(contact => (
              <li className={css.item} key={contact.id}>
                {contact.name}: {contact.number}
                <button
                  className={css.btn}
                  onClick={() => deleteContact(contact.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>no Acces</p>
      )}
    </div>
  );
};

export default Contacts;
