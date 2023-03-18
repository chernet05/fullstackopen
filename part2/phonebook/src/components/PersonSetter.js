
import axios from "axios";
import { useEffect } from "react";
const baseUrl = 'http://localhost:3001/api/persons';
export default function PersonSetter(e, props) {
  e.preventDefault();
  // if the name matches an existing name, it's added to duplicate list with its ID
  const { persons, newName, setPersons, setNewName, setNewNumber, newNumber, setMessage, setError, err, messages } = props
  let duplicate = persons.filter(x => x.name.trim() == newName.trim());
  //useEffect(() => setMessage(`${newName} got a message ${err}`), [err])
  console.log("duplicate")
  // if duplicates, 
  if (duplicate.length > 0) {
    //if the name is duplicate return a new state where the person name is the same but different number
    setPersons((prevState) => {
      let copy = [...prevState]
      // if the id matches, number in the database is changed and updated array is returned
      let ans = copy.map((existPerson) => {
        if (existPerson.id === duplicate[0].id) {
          axios.put(`baseUrl${existPerson.id}`, { 'number': newNumber })
            .then((response) => {
              if (response.status == 200) {
                existPerson.number = newNumber
                setMessage({ message: `${existPerson.name} phone number was changed`, code: 'green' })
                setError('')
              }
            })
            .catch(x => setMessage({ message: x.message, code: 'red' }))
        }

        return (existPerson)
      }
      )
      return (ans)
    })
  } else if (newName == false) {
    alert("You need a name")
  } else {
    // if name is new then add it to the database array
    axios.post('baseUrl', { 'name': newName, 'number': newNumber })
      .then(res => {
        setPersons(persons.concat(res.data));
        setMessage({ message: `${res.data.name} was added`, code: 'green' })
        setTimeout(() => setMessage(''), 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(x => setMessage({ message: x.message, code: 'red' }))

  }
}