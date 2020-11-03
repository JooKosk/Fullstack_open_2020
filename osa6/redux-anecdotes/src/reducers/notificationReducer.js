const notificationAtStart = ''

export const newNotification = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    notification: null,
  }
}

const notificationReducer = (state = notificationAtStart, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
  }
  switch (action.type) {
    case 'REMOVE_NOTIFICATION':
      return null
      default:
        return state
  }
}

export default notificationReducer