export default function Persons({filteredPersons}){

    return (
        <>
            {filteredPersons.map((person) => {
                return <p key={person.name}>{person.name} {person.number}</p>
        })}
        </>
    )
}