import { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

export default function App() {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // console.log(`Rendered ${persons.length} persons.`)

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

      {errorMessage && <p className="message error">{errorMessage}</p>}

      <Filter
        persons={persons}
        setFilteredPersons={setFilteredPersons}
      />
     
      <h3>Add a new</h3>
      <PersonForm
            persons={persons}
            newName={newName}
            newNumber={newNumber}
            message={message}
            setPersons={setPersons}
            setFilteredPersons={setFilteredPersons}
            filteredPersons={filteredPersons}
            setNewName={setNewName}
            setNewNumber={setNewNumber}
            setMessage={setMessage}
            setErrorMessage={setErrorMessage}
      />

      <h3>Numbers</h3>

      <Persons
        filteredPersons={filteredPersons}
        handleDeletion={handleDeletion}
      />
    </div>
  );
}
