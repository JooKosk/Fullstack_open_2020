import loginService from '../services/login'
import blogService from '../services/blogs'
import { newNotification } from '../reducers/notificationReducer'

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      console.log(user.token)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user,
      })
    } catch (exception) {
      dispatch(newNotification('wrong credentials', 5))
    }
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'SET_USER':
      return action.data
    default:
      return state
  }
}

export default loginReducer
