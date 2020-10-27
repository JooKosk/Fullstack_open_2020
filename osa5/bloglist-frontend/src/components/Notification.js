import React from 'react'

const Notification =({ message,errorState }) => {
    if (message === null) {
      return null
    }

    if (errorState === '') {
      return (
        <div style = {style}>
          {message}
        </div>
      )
    } else if (errorState === 'err') {
      return (
        <div style = {errorStyle}>
          {message}
        </div>
      )
    }
}

const style = {
  background: 'lightgray',
  color: 'green',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const errorStyle = {
  background: 'lightgray',
  color: 'red',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

export default Notification