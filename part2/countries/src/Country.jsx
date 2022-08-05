const Country = ({ details }) => {
    const { name, capital, area, languages, flags } = details
    const languagesArr = Object.entries(languages)
    return (
        <div>
            <h1>{name.common}</h1>
            <p>capital: {capital}</p>
            <p>area: {area}</p>
            <h2>Languages:</h2>
            <ul>
                {languagesArr.map((languagePair) => {
                    const [langCode, languageHumanReadable] = languagePair
                    return <li key={langCode}>{languageHumanReadable}</li>
                })}
            </ul>
            <div>
                <img
                    src={flags.svg}
                    width="200"
                    alt={`Flag of ${name.common}`}
                />
            </div>
        </div>
    )
}

export default Country
