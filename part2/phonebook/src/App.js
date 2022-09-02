// @ts-nocheck
import { useEffect, useState } from "react"
import Entries from "./Entries"
import Filter from "./Filter"
import Form from "./Form"
import numService from "./services/numService"
import Message from "./Message"

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    numService.getAll().then((data) => setPersons(data.data))
  }, [])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterName, setFilterName] = useState("")
  const [message, setMessage] = useState(null)

  const personsToShow =
    filterName === ""
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()))

  const handleSubmit = (e) => {
    e.preventDefault()
    const newEntry = { name: newName, number: newNumber }

    const match = persons.find((person) => person.name === newName)

    if (match) {
      if (window.confirm("do you wanna update their number?"))
        numService
          .updateEntry(newEntry, match)
          .then((response) => {
            setPersons(
              persons.map((person) => {
                return person.id === match.id ? response : person
              })
            )
            setMessage(`Updated ${response.name}!`)
            setTimeout(() => setMessage(null), 4000)
          })
          .catch(() => {
            setMessage(
              `Fatal error occurred!  Why!!!!!  ...${newName} could not be reached for comment.`
            )
            setTimeout(() => setMessage(null), 4000)
          })
    } else {
      numService.addNumber(newEntry).then((response) => {
        setPersons([...persons, response.data])
        setMessage(`Added ${newEntry.name}!`)
        setTimeout(() => setMessage(null), 4000)
      })
    }

    setNewName("")
    setNewNumber("")
  }

  const deleteEntry = (id) => {
    numService.deleteEntry(id).then(() => {
      setPersons(persons.filter((p) => p.id !== id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Message message={message} />

      <Filter filterName={filterName} setFilterName={setFilterName} />
      <Form
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Entries persons={personsToShow} deleteEntry={deleteEntry} />
    </div>
  )
}

export default App
