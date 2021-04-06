import React, { useState } from 'react';
import Person from './Person';

const Phonebook = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = e => {
    setFilterName(e.target.value);
  };

  const addNewPerson = e => {
    e.preventDefault();
    if (persons.find(person => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    const person = {
      name: newName,
      number: newNumber
    };
    setPersons(persons.concat(person));
    setNewName('');
    setNewNumber('');
  };

  const renderNumbers = () => {
    let filteredNames = persons.filter(person =>
      person.name.toLowerCase().includes(filterName.toLowerCase())
    );

    if (filterName) {
      return filteredNames.map(person => (
        <Person key={person.name} {...person} />
      ));
    } else {
      return persons.map(person => <Person key={person.name} {...person} />);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input value={filterName} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{renderNumbers()}</ul>
    </div>
  );
};

export default Phonebook;
