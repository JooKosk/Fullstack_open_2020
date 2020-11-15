import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import BlogInfo from './components/BlogInfo'
import Users from './components/Users'
import User from './components/User'
import Togglable from './components/Togglable'
import Navibar from './components/Navbar'
import { login, setUser } from './reducers/loginReducer'
import { newNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, newBlog } from './reducers/blogReducer'
import blogService from './services/blogs'
import userService from './services/users'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const blogFormRef = useRef()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    const user = JSON.parse(loggedUserJSON)
    dispatch(setUser(user))
    if (loggedUserJSON) {
      blogService.setToken(user.token)
    }
    async function getUsers() {
      const users = await userService.getUsers()
      setUsers(users)
    }
    getUsers()
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    dispatch(setUser(user))
    setUsername('')
    setPassword('')
  }
  const handleLogout = async () => {
    dispatch(newNotification('You logged out.', 5))
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedBlogUser')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const blogInDb = dispatch(newBlog(blogObject))
    if (blogInDb) {
      dispatch(
        newNotification(
          `a new blog '${blogObject.title}' by ${blogObject.author} added`,
          5
        )
      )
    }
  }
  const sortedBlogs = blogs.sort((prev, curr) => curr.likes - prev.likes)

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password}
          username={username}
        />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Navibar user={user} handleLogout={handleLogout} />
        <h3 style={{ padding: 10 }}>Blog app 5000 </h3>
        <Notification />
        <Switch>
          <Route path="/users/:id">
            <User users={users} />
          </Route>
          <Route path="/blogs/:id">
            <BlogInfo blogs={blogs} />
          </Route>
          <Route path="/users">
            <Users users={users} />
          </Route>
          <Route path="/">
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
            <Blogs blogs={sortedBlogs} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
