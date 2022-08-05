import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'
import Country from './Country'

function App() {
    const [allCountries, setAllCountries] = useState([])
    const [filter, setFilter] = useState('')

    let sourceURI = 'https://restcountries.com/v3.1/all'
    // sourceURI = 'http://localhost:3001/countries'

    useEffect(() => {
        axios.get(sourceURI).then((response) => {
            setAllCountries(response.data)
        })
    }, [])

    const filterByCountryName = (event) => {
        setFilter(event.target.value.toLowerCase())
    }

    function getFilteredCountries(countries) {
        return countries.filter((country) => {
            const { common } = country.name
            return country.name.common.toLowerCase().includes(filter)
        })
    }

    const filteredCountries = getFilteredCountries(allCountries)

    function showResults(countriesCount) {
        if (countriesCount > 10) {
            return <div>Too many countries, update your filter</div>
        }
        if (countriesCount > 1) {
            return <Countries countries={filteredCountries} />
        }
        if (countriesCount === 1) {
            const [singleCountry] = filteredCountries
            return <Country country={singleCountry} />
        }
        return <div>There are no results for search.</div>
    }
    return (
        <div className="App">
            <Filter value={filter} onChange={filterByCountryName} />
            {showResults(filteredCountries.length)}
        </div>
    )
}

export default App
