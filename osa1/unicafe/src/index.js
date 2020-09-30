import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}> {props.text}</button>
)

const Statistics = (props) => {
  const weights = (props.good * 1 + props.neutral * 0 + props.bad * -1)
  if (props.sum <= 0) {
    return (
       <div>
         <p>No feedback given</p>
         </div>)
  } else { return (
  <div>
    <table>
    <tbody>
    <StatisticLine text="good" value = {props.good} />
    <StatisticLine text="neutral" value = {props.neutral} />
    <StatisticLine text="bad" value = {props.bad} />
    <StatisticLine text="all" value={props.sum} />
    <StatisticLine text="average" value={weights/props.sum} />
    <StatisticLine text="positive" value={(props.good * 1.0 /props.sum)* 100 + " %"} />
    </tbody>
    </table>
  </div>
  )}}

  const StatisticLine = (props) => (
    <tr><td>{props.text} </td><td> {props.value}</td></tr>

  )


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let sum = bad + good + neutral
  
  return (
    <div>
      <h1>Please provide feedback for us</h1>
      <Button handleClick={() => setGood(good+ 1)} text="good" />
      <Button handleClick= {() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} sum={sum}/>
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)