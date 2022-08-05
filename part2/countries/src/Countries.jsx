import ShowButton from './ShowButton'

const Countries = ({ countries, showCountry }) => {
    return countries.length > 10 ? (
        <div>Too many countries to display, please use the filter</div>
    ) : (
        countries.map((country) => (
            <div key={country.cca3}>
                {country.name.common}
                {` `}
                <ShowButton
                    showCountry={showCountry}
                    countryCode={country.cca3}
                />
            </div>
        ))
    )
}

export default Countries
