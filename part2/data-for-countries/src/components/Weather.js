import { useState, useEffect } from "react"
import axios from "axios";

export default function Weather ({country}) {

    const [ weather, setWeather ] = useState(null);

    const api_key = process.env.REACT_APP_WEATHER_API_KEY;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`;

    useEffect(() => {
        axios
            .get(URL)
            .then(r => setWeather(r.data));
    }, []);

    return (
        <>
            <h3>Weather in {country.capital[0]}</h3>

            {weather &&
            <div>
                <p>Temperature: {weather.main.temp} °C</p>
                <p>Wind: {weather.wind.speed} m/s</p>
            </div>
            }
        </>
    )
}