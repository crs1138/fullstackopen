const Persons = ({ persons }) => {
    return persons.map((person) => {
        const { name, number } = person
        return <p key={name}>{`${name}: ${number}`}</p>
    })
}

export default Persons
