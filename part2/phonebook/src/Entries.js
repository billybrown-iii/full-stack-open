const Entries = ({ persons, deleteEntry }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          {`${person.name}: ${person.number}`}
          <button onClick={() => deleteEntry(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default Entries
