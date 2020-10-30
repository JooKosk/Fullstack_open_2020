import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateLikes }) => {
  blog.PropTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
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

  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1
  }

  const removeBlog = async () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)
    await blogService.remove(blog.id, blog)
  }

  const showWhenAuthorized = { display: user.username === blog.user.username ? '' : 'none' }

  if (allInfoVisible) {
    return (
      <div style = {style} className ='blogAllInfo'>
        <div>
          <div>
            {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes} <button onClick = {() => updateLikes(blog,updatedBlog)}>like</button>
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
    <div style = {style} className = 'blog'>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
    </div>
  )}

export default Blog
