import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personcontrol from './services/personcontrol'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    personcontrol
    .getAll()
    .then(persons=> {
      setPersons(persons)
    })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      key: newName,
      number: newNumber
    }
     if (persons.find(person => person.name === newName)) {
        alert(`${newName} is already in the phonebook`)
      } else {
        personcontrol
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        setNewName('') 
        setNewNumber('')  
    })}
  }

  const personsToShow =! filterText
  ? persons
  : persons.filter (person =>
    person.name.toLowerCase().includes(filterText.toLowerCase()))
  
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  

  const handleFilterChange = (e) => {
    setFilterText(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value = {filterText} handleFilter = {handleFilterChange} />

      <h2>add a new</h2>

      <PersonForm addPerson = {addPerson} handleNameChange = {handleNameChange}
      handleNumberChange = {handleNumberChange}
      newName = {newName} newNumber = {newNumber}
      />

      <h2>Numbers</h2>

      <Persons personsToShow = {personsToShow}/>
    </div>
  )
}

export default App