import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
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
        setPersons(persons.concat(personObject))
        setNewName('') 
        setNewNumber('')  
    }
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