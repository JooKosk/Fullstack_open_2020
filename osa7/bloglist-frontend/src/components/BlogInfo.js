import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks/'

const BlogInfo = ({ blogs }) => {
  const ignoreReset = ({ reset, ...rest }) => rest
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  const commentField = ignoreReset(useField('text'))
  const dispatch = useDispatch()

  const increaseLikes = (blog) => {
    dispatch(likeBlog(blog))
  }

  const newComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog, commentField.value))
  }
  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}{' '}
      </h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes{' '}
        <button onClick={() => increaseLikes(blog)}>like</button>
      </p>
      <p>added by {blog.user.name} </p>
      <h3>comments</h3>
      <form onSubmit={newComment}>
        <input {...commentField}></input>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogInfo
