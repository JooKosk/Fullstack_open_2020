import React from 'react';
import Weather from './Weather'

const Country = ({country, languages}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {languages.map(language =>
                    <li key = {language.name}>{language.name}</li>)}
            </ul>
            <img alt = "country flag" style={{width: 100}} src={country.flag}></img>
            <Weather capital = {country.capital}></Weather>
        </div>
    )
}

export default Country



            