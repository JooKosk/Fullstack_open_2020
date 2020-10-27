import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user }) => {
  blog.PropTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }
  const [allInfoVisible, setAllInfoVisible] = useState(false)
  const toggleVisibility = () => {
    setAllInfoVisible(!allInfoVisible)
  }

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async () => {
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes +1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogService.update(blog.id, updatedBlog)
  }

  const removeBlog = async () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)
    await blogService.remove(blog.id, blog)
  }

  const showWhenAuthorized = { display: user.username === blog.user.username ? '' : 'none' }

  if (allInfoVisible) {
    return (
      <div style = {style}>
        <div>
          <div>
            {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes} <button onClick = {addLike}>like</button>
          </div>
          <div>
            {blog.author}
          </div>
          <div style = {showWhenAuthorized}>
            <button onClick={removeBlog} >remove</button>
          </div>
        </div>
      </div>
    )
  }
  return(
    <div style = {style}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
    </div>
  )}

export default Blog
