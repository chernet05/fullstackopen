export default function FilterNameHandler(event, props) {
  const { filterValue, persons, setSearched, setFilterList } = props
  event.preventDefault()
  // converts the filter value to lower case and checks if it matches any of the person's name in the db
  let value = filterValue.toLowerCase()
  let matchingPerson = persons.filter(person => {
    let personLower = person.name.toLowerCase()
    return (personLower === value)
  })
  //searched state is changed to true and the matched people are sent to the 'setFilterList' state.
  setSearched('True')
  console.log(matchingPerson, matchingPerson)
  setFilterList(matchingPerson);
}
