export default function Persons({filteredPersons, handleDeletion}){

    return (
        <>
            {filteredPersons.map((person) => {
                return <p key={person.name}>{person.name} {person.number}
                <button onClick={() => {handleDeletion(person.id)}}>DELETE</button>
                </p>
        })}
        </>
    )
}