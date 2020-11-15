import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification) {
    return (
      <Alert variant="primary" style={style}>
        {notification}
      </Alert>
    )
  }
  return null
}

const style = {
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

export default Notification
