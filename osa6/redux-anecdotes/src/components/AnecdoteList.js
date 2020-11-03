import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { newNotification, removeNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({filter, anecdotes}) => {
    return anecdotes =! filter
    ? anecdotes
    : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })

  const sortedAnecdotes = anecdotes.sort((prev, curr) => curr.votes - prev.votes)

  const vote = (id, anecdote) => {
    dispatch(increaseVote(id))
    dispatch(newNotification(`you voted '${anecdote}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
  } 
  return (
    <div>
    {sortedAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList