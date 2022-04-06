import { useRef, useEffect} from "react";
import personService from "../services/persons";

export default function PersonForm({
    persons,
    newName,
    newNumber,
    setPersons,
    setFilteredPersons,
    setNewName,
    setNewNumber,
}) {

    const nameInput = useRef();
    const numberInput = useRef();
  
    useEffect(() => {
      nameInput.current.focus();
    }, [nameInput]);

    const handleNameChange = (e) => {
        const enteredString = e.target.value;
        setNewName(enteredString);
      }
    
      const handleNumberChange = (e) => {
        const enteredString = e.target.value;
        setNewNumber(enteredString);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Does the entered name already exist in the Phonebook?
        const existingPerson = persons.find(person => person.name === newName);
    
        // If name already exists, then:
        if (existingPerson) {
          // A: Don't allow new entry:
                // alert("This person already exists.");
                // nameInput.current.focus();

          // B: Overwrite the previous phone number:

          const updatedPerson = {...existingPerson, number: newNumber};

            personService
              .updateOne(existingPerson.id, updatedPerson)
              .then((existingPerson) => {
                const updatedPerson = {...existingPerson, number: newNumber};


                const updatedArray = persons.map((person) => {
                  if (person.id === updatedPerson.id) {
                    person = updatedPerson;
                    return person;
                  } else {
                    return person;
                  }
                });
                setPersons([...updatedArray]);
                setFilteredPersons([...updatedArray]);
              });

              // Reset the input fields and focus in on nameInput:
              nameInput.current.focus();
              setNewName("");
              setNewNumber("");

        } else {
        // If the entered name is unique, create a newPerson object, and update Persons and FilteredPersons with the updated persons array:
          const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
          };

          personService
            .createOne(newPerson)
            .then((newPerson) => {
              setPersons([...persons, newPerson]);
              setFilteredPersons([...persons, newPerson]);
          })

          // Reset the input fields and focus in on nameInput:
          nameInput.current.focus();
          setNewName("");
          setNewNumber("");
        }
      }


    return (
        <form onSubmit={handleSubmit}>
            <div>
            name: <input
                value={newName}
                onChange={handleNameChange}
                ref={nameInput}
            />
            </div>
            <div>
            number: <input
                value={newNumber}
                onChange={handleNumberChange}
                ref={numberInput}
            />
            </div>
            <div>
            <button type="submit">Add</button>
            </div>
        </form>
    )
}