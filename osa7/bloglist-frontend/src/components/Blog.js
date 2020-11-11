import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  blog.PropTypes = {
    user: PropTypes.object.isRequired,
  }
  /*
  const deleteBlog = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)
    dispatch(removeBlog(blog))
  }
*/
  /*
  const showWhenAuthorized = {
    display: user.username === blog.user.username ? '' : 'none',
  }

  if (allInfoVisible) {
    return (
      <div style={style} className="blogAllInfo">
        <div>
          <div>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>{' '}
            <button onClick={toggleVisibility}>hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={() => increaseLikes(blog)}>like</button>
          </div>
          <div>{blog.author}</div>
          <div style={showWhenAuthorized}>
            <button onClick={deleteBlog}>remove</button>
          </div>
        </div>
      </div>
    )
  }
*/
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={style} className="blog">
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>{' '}
      </div>
    </div>
  )
}

export default Blog
