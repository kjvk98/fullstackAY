import { useState, useEffect } from 'react'
import axios from 'axios'
import {AddPerson, Filter, Persons} from './components/Person'
import personService from './services/persons'

import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    const index = persons.findIndex(person => person.name === newName)
    if(index !== -1) {
      changeNumber(index)
    }
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const changeNumber = (index) => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      const id = persons[index].id
      const person = persons.find(n => n.id === id)
      const changedPerson = {...person, number: newNumber}
      personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setMessage(
        `Changed number for ${person.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }).catch(error => {
        setErrorMessage(
          `Infromation of '${person.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    })
      setNewName('')
      setNewNumber('')

    }
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setFilter(event.target.value)
  }



  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
    personService
      .delPerson(id)
      .then(returnedPersons => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage(
          `Deleted ${name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    )
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Error message={errorMessage} />
      <Filter value={newFilter} handle={handleNewFilter} />
      <h2>Add a new</h2>

      <AddPerson addPerson={addPerson} newName={newName} handleInputChange={handleInputChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} deleteHandle={deletePerson}/>
    </div>
  )
}

export default App