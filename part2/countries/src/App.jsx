import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'
import Country from './Country'

function App() {
    const [allCountries, setAllCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([])
    const [singleCountry, setSingleCountry] = useState()

    useEffect(() => {
        let sourceURI = 'https://restcountries.com/v3.1/all'
        axios.get(sourceURI).then((response) => {
            setAllCountries(response.data)
        })
    }, [])

    useEffect(() => {
        const countries = allCountries.filter((country) => {
            const { common } = country.name
            return common.toLowerCase().includes(filter)
        })

        setFilteredCountries(countries)
    }, [allCountries, filter])

    useEffect(() => {
        if (filteredCountries.length === 1) {
            setSingleCountry(filteredCountries[0])
        } else {
            setSingleCountry()
        }
    }, [filteredCountries])

    function filterByCountryName(event) {
        setFilter(event.target.value.toLowerCase())
    }

    function showSingleCountry(event) {
        const countryCode = event.target.id
        const showCountry = filteredCountries.find(
            (country) => country.cca3 === countryCode
        )
        setSingleCountry(showCountry)
    }

    return (
        <div className="App">
            <Filter value={filter} onChange={filterByCountryName} />
            {!singleCountry && filteredCountries.length > 1 && (
                <Countries
                    countries={filteredCountries}
                    showCountry={showSingleCountry}
                />
            )}
            {!!singleCountry && <Country details={singleCountry} />}
            {allCountries.length > 0 && filteredCountries.length <= 0 && (
                <div>There are no results for your search.</div>
            )}
            {allCountries.length === 0 && <div>Loading countries...</div>}
        </div>
    )
}

export default App
