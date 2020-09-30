import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick ={props.handleClick}> {props.text}</button> 
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const mostVotes = votes.reduce((a, b) => Math.max(a, b));
  const mostVotedIndex = votes.indexOf(mostVotes)

  const raiseVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 6))} text="next anecdote"/>
      <Button handleClick={raiseVote} text="vote" />
      <h2>Anecdote with most votes</h2>
      <MostVoted anecdotes = {props.anecdotes} index = {mostVotedIndex}/>
      <p>has {votes[mostVotedIndex]} votes</p>
    </div>
  )
}

const MostVoted = (props) => props.anecdotes[props.index]

  
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

