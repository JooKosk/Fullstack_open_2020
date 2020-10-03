import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Weather = ({capital}) => {
    const [weather, setWeather] = useState({location:{}, current:{}})
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then(response => {
          setWeather(response.data)
        })
      }, [api_key, capital])
      console.log(weather)

      if (weather) {

      }

    return (
        <div>
        <h2>Weather in {capital}</h2>
        <p>temperature: {weather.current.temperature} </p>
        <img src={weather.current.weather_icons}></img>
        <p>wind: {weather.current.wind_speed} direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather