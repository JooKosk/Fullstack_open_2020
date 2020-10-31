import React, { useState } from 'react'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'

const BlogForm = ({ createBlog }) => {
  const [blogInfo, setBlogInfo] = useState({
    title: '',
    author: '',
    url: '',
  })

  LoginForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }
  const handleChange = (event) => {
    setBlogInfo({
      ...blogInfo,
      [event.target.name]: event.target.value
    })
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogInfo.title,
      author: blogInfo.author,
      url: blogInfo.url,
      likes: 0
    }
    createBlog(blogObject)
  }

  return (
    <form onSubmit = {addBlog}>
      <div>
      title
        <input
          type="text"
          value={blogInfo.title}
          name="title"
          id="title"
          onChange={handleChange}
        />
      </div>
      <div>
      author
        <input
          type="text"
          value={blogInfo.author}
          name="author"
          id="author"
          onChange={handleChange}
        />
      </div>
      <div>
      url
        <input
          type="text"
          value={blogInfo.url}
          name="url"
          id="url"
          onChange={handleChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm