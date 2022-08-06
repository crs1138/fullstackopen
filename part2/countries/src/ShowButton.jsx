const ShowButton = ({ showCountry, countryCode }) => {
    return (
        <button type="button" onClick={showCountry} id={countryCode}>
            show
        </button>
    )
}

export default ShowButton
