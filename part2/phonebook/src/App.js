import React from 'react';
import { useState, useEffect } from 'react'
import PersonForm from './components/Personform';
import FilterNameForm from './components/FilterNameForm';
import RenderList from './components/renderlist';
import Message from './components/Message'
import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  //const [per, setPer] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filterList, setFilterList] = useState([])
  const [searched, setSearched] = useState('False')
  const [messages, setMessage] = useState({})
  const [err, setError] = useState('')
  // loads data from database to state
  function getter() {
    axios.get(baseUrl)
      .then((res) => {
        setPersons(res.data)
      })
  }
  // runs the getter function only on initial load    
  useEffect(getter, [])

  //controlled input for name
  function nameSetter(event) {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  //controlled input for phone
  function phoneSetter(event) {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  // changes the state of filtervalue whenever a value in added/deleted to filter input
  function filtValue(event) {
    setFilterValue(event.target.value)
    setSearched('False')
  }
  function remove(e, id, name) {
    axios.delete('baseUrl' + id,)
      .then(res => {
        if (res.status == '200') {
          setPersons((prevState) => {
            console.log(res, "status", res.data)
            setMessage({ message: `Person ${name} was removed`, code: 'red' })
            let returns = prevState.filter((x) => {

              return (x.id !== id)
            })
            return (returns)
          })
        }
      })
      .catch((err) => console.log(err))
  }
  // function gm() {
  //   setTimeout(() => {
  //     console.log(document.getElementById('mess').style.display)
  //     document.getElementById('mess').style.display = 'block';
  //     //setMessage(null)
  //   }, 0)
  //   setTimeout(() => {
  //     console.log(document.getElementById('mess').style.display)
  //     document.getElementById('mess').style.display = 'none';
  //     //setMessage(null)
  //   }, 30000)
  // }
  // useEffect(gm, [messages])
  // useEffect(gm, [messages])


  return (
    <div>
      <h2>Phonebook</h2>
      <Message messages={messages} />
      <h3> Filter with </h3><FilterNameForm filtValue={filtValue} filterValue={filterValue} setSearched={setSearched} setFilterList={setFilterList} persons={persons} />
      <h3> Add a new</h3><PersonForm messages={messages} setError={setError} setMessage={setMessage} persons={persons} newName={newName} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} newNumber={newNumber} nameSetter={nameSetter} phoneSetter={phoneSetter} remove={remove} err={err} />
      <h2>Numbers</h2>
      <div>
        <RenderList searched={searched} filterValue={filterValue} filterList={filterList} persons={persons} remove={remove} />
      </div>
    </div>
  )
}
export default App
