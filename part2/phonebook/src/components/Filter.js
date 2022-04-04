export default function Filter({persons, setFilteredPersons}) {
    const handleFilterChange = (e) => {
        const enteredString = e.target.value.toLowerCase();
        const filteredPersons = persons.filter((person) => {
          return person
            .name
            .toLowerCase()
            .includes(enteredString)
        });
    
        setFilteredPersons(filteredPersons);
      };

    return (
        <p>
            filter shown with <input onChange={handleFilterChange} />
        </p>
    )
}