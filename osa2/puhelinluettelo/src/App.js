import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personcontrol from './services/personcontrol'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorState, setErrorState] = useState('no')

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
     if (persons.find(person => person.name === newName )) {
       if(window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        const changedNumber = {...personToUpdate, number: newNumber}
 
        personcontrol
        .update(personToUpdate.id, changedNumber)
        .then(returnedPerson => {
           setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
           setNotificationMessage(`updated the number for ${newName}`)
           setTimeout(() => {
             setNotificationMessage(null)
           }, 5000)
          })
        .catch(error =>  {
          setNotificationMessage(`Information of ${newName} has already been removed from the server`)
          setErrorState('yes')
        }, 5000
        )}
      } else {
        personcontrol
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        setNewName('') 
        setNewNumber('') 
        setNotificationMessage(`added ${newName}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
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

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
    personcontrol
    .remove(person.id).then(returned=> {
      setPersons(persons.filter(existingPerson => existingPerson.id !== person.id))
    })} else {

    }
    setNotificationMessage(`deleted ${person.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={notificationMessage} errorState={errorState} />

      <Filter value = {filterText} handleFilter = {handleFilterChange} />

      <h2>add a new</h2>

      <PersonForm addPerson = {addPerson} handleNameChange = {handleNameChange}
      handleNumberChange = {handleNumberChange}
      newName = {newName} newNumber = {newNumber}
      />

      <h2>Numbers</h2>

      <Persons personsToShow = {personsToShow} handleClick = {deletePerson}/>
    </div>
  )
}

export default App