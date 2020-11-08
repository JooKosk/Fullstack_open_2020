import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { newNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, likeBlog, newBlog } from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(newNotification('wrong credentials', 5))
    }
  }
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogUser')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const blogInDb = dispatch(newBlog(blogObject))
    if (blogInDb) {
      dispatch(newNotification(`a new blog '${blogObject.title}' by ${blogObject.author} added`, 5))
    }
  }
  const sortedBlogs = blogs.sort((prev, curr) => curr.likes - prev.likes)

  const handleClick = (blog) => {
    dispatch(likeBlog(blog))
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          handleLogin = {handleLogin}
          setUsername = {setUsername}
          setPassword = {setPassword}
          password = {password}
          username = {username}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in <button onClick = {handleLogout}>logout</button> </p>
      <Togglable buttonLabel = 'new blog' ref = {blogFormRef}>
        <BlogForm createBlog = {addBlog}/>
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog user = {user} key={blog.id} blog={blog} updateLikes = {handleClick} />
      )}
    </div>
  )
}

export default App