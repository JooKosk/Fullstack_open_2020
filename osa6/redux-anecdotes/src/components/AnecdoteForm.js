import React from 'react'
import { connect} from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.newAnecdote(anecdote)
    props.newNotification(`you created '${anecdote}'`, 10)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name ="anecdote" /></div>
        <button type="submit">create</button>
      </form>
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  newAnecdote,
  newNotification,
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps,
  )(AnecdoteForm)

export default ConnectedAnecdoteForm