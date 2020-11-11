import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const BlogInfo = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  const dispatch = useDispatch()

  const increaseLikes = (blog) => {
    dispatch(likeBlog(blog))
  }

  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    console.log(comment)
    console.log(blog)
    event.target.comment.value = ''
    //dispatch(addComment(blog, comment))
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
      <form onSubmit={addComment}>
        <input name="comment"></input>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={blog.id}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogInfo
