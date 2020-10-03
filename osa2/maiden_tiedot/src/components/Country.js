import React from 'react'

const Country = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
            <p>capital {props.capital}</p>
            <p>population {props.population}</p>
            <h2>languages</h2>
        </div>
    )
}

export default Country


/*
 <ul>
                {props.languages.map(language =>
                    <li>{language.name}</li>)}
            </ul>
            */