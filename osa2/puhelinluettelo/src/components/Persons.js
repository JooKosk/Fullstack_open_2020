import React from 'react'
import Person from './Person'
import personcontrol from '../services/personcontrol'

const Persons = ({personsToShow}) => {

    return (
    <div>
        {personsToShow.map(person => 
        <p key ={person.name}>
          <Person key ={person.name} name = {person.name} number = {person.number} /> 
          <button onClick={() =>
           personcontrol.remove(person)
           .then(personToRemove =>
           personsToShow.filter(person => person !== personToRemove))}>delete</button>
        </p>)}
      </div>
    )
}

export default Persons
   