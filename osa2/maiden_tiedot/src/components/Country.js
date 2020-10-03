import React from 'react'

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
            <img style={{width: 100}} src={country.flag}></img>
        </div>
    )
}

export default Country



            