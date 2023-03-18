import React from 'react'
import PersonSetter from './PersonSetter'
//on submit, 
export default function PersonForm(props) {
  const { newName, nameSetter, phoneSetter, newNumber } = props
  return (
    <form onSubmit={(e) => PersonSetter(e, props)}>
      <div>
        name: <input value={newName} onChange={(e) => nameSetter(e)} />
      </div>
      <div>
        Phone: <input value={newNumber} onChange={(e) => phoneSetter(e)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>)
}