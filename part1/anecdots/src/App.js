import { useState, useEffect } from 'react'
//creates a random number between 0 and 6
const Randomizer = () => {
  return (Math.floor(Math.random() * 7))
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  //array of anecdotes voted for and count of vote
  const [anecdote, setAnecdote] = useState([])
  //Randomly selected anecdot and random number
  const [selected, setSelected] = useState({ 'anecdot': ' ', 'randomNumber': '' })
  //anecdote with the most votes 
  const [mostVotes, setMostVotes] = useState({ 'count': 0 })
  function scambler() {
    let randomNumber = Randomizer()
    let randomAnecdote = anecdotes[randomNumber]

    setSelected({ 'anecdot': randomAnecdote, 'randomNumber': randomNumber })
  }

  function nextHandler() {
    scambler()
  }
  function voteHandler(selected) {
    const { anecdot, randomNumber } = selected;

    //if previous state has a value for the randomnumber then 1 to the count otherwise add the value to the array
    setAnecdote(prevState => {
      let copy = [...prevState]

      copy[randomNumber] ? copy[randomNumber]['count'] += 1 : copy[randomNumber] = { 'anecdot': anecdot, 'count': 1 }
      return (copy)
    })

  }
  //whenever an anecdote is voted for this will run and see which one has the highest vote
  useEffect(() => {
    let ans;
    anecdote.forEach(x => {
      if (x) {
        if (x.count > mostVotes.count) {
          ans = { 'pick': x.anecdot, 'count': x.count }
          setMostVotes(ans)
        }
      }
    })
  }, [anecdote])

  // on load this will pick a random anecdot to display
  useEffect(() => scambler(), [])


  return (
    <div>
      <h1> Anecdote of the day</h1>
      {selected['anecdot']}<br />{`has ${anecdote[selected['randomNumber']] ? anecdote[selected['randomNumber']]['count'] : 0} votes`}
      <br />
      <button onClick={() => voteHandler(selected)}>Vote</button><button onClick={() => nextHandler()}>Next Anecdote</button>
      <br />
      <h1> Anecdote with the most votes</h1>
      <p>{mostVotes.pick ? mostVotes.pick : ""}<br />{mostVotes.pick ? (`has ${mostVotes.count} votes`) : ""}</p>
    </div>
  )
}

export default App