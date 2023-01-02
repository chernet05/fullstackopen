import React, { useState } from 'react';
import './App.css'
const Statistics = (props) => {
  const { good, bad, neutral } = props.data
  return (
    <div>
      <table>

        <tbody>

          <StatisticLine text="good" value={good} />


          <StatisticLine text="bad" value={bad} />


          <StatisticLine text="neutral" value={neutral} />
          <tr><td>all</td><td> {good + neutral + bad}</td></tr>

          <tr><td>average</td><td>{(good + (bad * -1)) / (good + bad + neutral)}</td></tr>
          <tr><td>positive</td><td>{(good) / (good + bad + neutral) * 100}   %</td></tr>
        </tbody>
      </table>
    </div >
  )
}
const StatisticLine = ({ text, value }) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}
const Button = ({ value, stateVal, handler }) => {
  return (
    <button value={value} onClick={() => handler({ [value]: stateVal + 1 })}>{value}</button>

  )
}
function App() {

  const [states, change] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })
  function clickHandler(x) {
    change({ ...states, ...x })

  }
  const { good, neutral, bad } = states
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Give feedback
        </h1>
      </header>

      <div className="buttons">
        <Button value="good" stateVal={good} handler={clickHandler} />
        <Button value="neutral" stateVal={neutral} handler={clickHandler} />
        <Button value="bad" stateVal={bad} handler={clickHandler} />


      </div>
      <h1>
        Statistics
      </h1>
      {(good > 0 || neutral > 0 || bad > 0) ? (<Statistics data={states} />) : <p>No feedbacks given</p>
      }

    </div>
  );
}

export default App;
