const Persons = ({ persons }) => {
    return persons.map((person) => {
        const { name, number, id } = person
        return <p key={id}>{`${name}: ${number}`}</p>
    })
}

export default Persons
