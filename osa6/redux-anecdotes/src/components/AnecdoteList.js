import React from 'react'
import { connect } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { newNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const anecdotesToShow =! props.filter
    ? props.anecdotes
    : props.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))

  const sortedAnecdotes = anecdotesToShow.sort((prev, curr) => curr.votes - prev.votes)

  const vote = (anecdote) => {
    props.increaseVote(anecdote)
    props.newNotification(`you voted '${anecdote.content}'`, 5)
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
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  increaseVote,
  newNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps,
  )(AnecdoteList)

export default ConnectedAnecdoteList