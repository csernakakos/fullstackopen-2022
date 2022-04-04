import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

export default function App() {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    axios
      .get("http://localhost:3002/persons")
      .then(r => {
          setPersons(r.data);
          setFilteredPersons(r.data);
      })
  }, []);

  console.log(`Rendered ${persons.length} persons.`)

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
