const Countries = ({ countries }) => {
    return countries.map((country) => (
        <div key={country.cca3}>{country.name.common}</div>
    ))
}

export default Countries
