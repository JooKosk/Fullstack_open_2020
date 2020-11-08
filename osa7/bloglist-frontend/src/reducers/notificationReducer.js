const initialNotification = ''

var displayTime

export const newNotification = (notification, timeout) => {
  return async dispatch => {
    if (displayTime) {
      clearTimeout(displayTime)
    }
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    displayTime = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    notification: null
  }
}

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'REMOVE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export default notificationReducer