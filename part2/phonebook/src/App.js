import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

export default function App() {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  console.log(`Rendered ${persons.length} persons.`)

  const handleDeletion = (id) => {
    personService
      .deleteOne(id)
      .then(r => {
        personService
          .getAll()
          .then(persons => {
            setPersons(persons);
            setFilteredPersons(persons);
          })
        alert("deleted!")

      })
  }

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons);
        setFilteredPersons(persons);
    });
  }, []);

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
        handleDeletion={handleDeletion}
      />
    </div>
  );
}
