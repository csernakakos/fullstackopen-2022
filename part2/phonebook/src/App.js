import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

export default function App() {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        persons={persons}
        setFilteredPersons={setFilteredPersons}
      />
     
      <h3>Add a new</h3>
      <PersonForm
            persons={persons}
            newName={newName}
            newNumber={newNumber}
            setPersons={setPersons}
            setFilteredPersons={setFilteredPersons}
            filteredPersons={filteredPersons}
            setNewName={setNewName}
            setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>

      <Persons
        filteredPersons={filteredPersons}
      />
    </div>
  );
}
