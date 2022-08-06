import axios from 'axios'
import { useState, useEffect } from 'react'

const WeatherWidget = ({ location }) => {
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        const WEATHER_API = process.env.REACT_APP_WEATHER_API
        const exclude = `minutely,hourly,daily,alert`
        const weatherApiURI = `https://api.openweathermap.org/data/2.5/weather?q=${location}&exclude=${exclude}&appid=${WEATHER_API}&units=metric`

        axios.get(weatherApiURI).then((response) => {
            setWeatherData(response.data)
        })
    }, [location])

    const widgetOutput = !!weatherData ? (
        <>
            <h2>Current weather in {location}</h2>
            <div>Temperature: {weatherData?.main.temp} ºC</div>
            <img
                src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
                alt={weatherData?.weather[0].description}
            />
            <div>Wind: {weatherData?.wind.speed} km/h</div>
        </>
    ) : (
        <div>Loading weather info...</div>
    )
    return <div>{widgetOutput}</div>
}

export default WeatherWidget
