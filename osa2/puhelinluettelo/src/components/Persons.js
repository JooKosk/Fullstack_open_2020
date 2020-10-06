import React from 'react'
import Person from './Person'

const Persons = ({personsToShow, handleClick}) => {

    return (
    <div>
        {personsToShow.map(person => 
        <p key ={person.name}>
          <Person key ={person.name} name = {person.name} number = {person.number} /> 
          <button onClick={() => handleClick(person)}>delete</button>
        </p>)}
      </div>
    )
}

export default Persons
   