import React from 'react'
import { useSelector } from 'react-redux'

const Notification =() => {
  const notification = useSelector(state => state.notification)

  if (notification) {
    return (
      <div style = {style}>
        {notification}
      </div>
    )
  }
  return null
}
/*
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
*/

const style = {
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

export default Notification