

const Person = ({person, deleteHandle}) => {
    return(
    <div>
      <p>{person.name} {person.number}</p>
      <button onClick={() => deleteHandle(person.id, person.name)}>
      delete 
    </button>
    </div>
    )
  }

  const Persons = ({persons, newFilter, deleteHandle}) => {
    return (
      <div>
        {persons.filter(person => 
          person.name.toUpperCase().includes(newFilter.toUpperCase())).map(person =>
            <Person key={person.id} person={person} deleteHandle={deleteHandle}/>
        )}
      </div> 
    )
  }
  
  const Filter = (props) => {
    return (
      <div>
      filter shown with <input
      value={props.value}
      onChange={props.handle}
      />
    </div>
    )
  }
  
  const Inputs = ({value, text, handle}) => {
    return (
      <div>
      {text} <input
      value={value}
      onChange={handle}
      />
      </div>
    )
  }
  
  const AddPerson = (props) => {
    return (
      <form onSubmit={props.addPerson}>
  
      <div>
        <Inputs value={props.newName} text='name:' handle={props.handleInputChange} />
        <Inputs value={props.newNumber} text='number:' handle={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }



  export {AddPerson, Filter, Persons };