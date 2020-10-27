import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorState, setErrorState] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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
      setErrorState('err')
      setNotificationMessage('wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogUser')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const blogInDb = await blogService.create(blogObject)
    if (blogInDb) {
      setNotificationMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  const sortedBlogs = blogs.sort((prev, curr) => curr.likes - prev.likes)

  if (user === null) {
    return (
      <div>
        <Notification message ={notificationMessage} errorState = {errorState} />
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
      <Notification message = {notificationMessage} errorState = {errorState}
      />
      <p>{user.name} logged in <button onClick = {handleLogout}>logout</button> </p>
      <Togglable buttonLabel = 'new blog' ref = {blogFormRef}>
        <BlogForm createBlog = {addBlog}/>
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog user = {user} key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App