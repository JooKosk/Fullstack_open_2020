import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks/'
import { Table, Button, Form } from 'react-bootstrap'

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
      <Table striped>
        <thead>
          <tr>
            <th>
              {blog.title} by {blog.author}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Blog address: <a href={blog.url}>{blog.url}</a>
            </td>
          </tr>
          <tr>
            <td>
              {blog.likes} likes{' '}
              <Button variant="info" onClick={() => increaseLikes(blog)}>
                Like blog
              </Button>
            </td>
          </tr>
          <tr>
            <td>Added by {blog.user.name}</td>
          </tr>
        </tbody>
      </Table>
      <Form onSubmit={newComment}>
        <Form.Label>Comments</Form.Label>
        <Form.Control {...commentField}></Form.Control>
        <Button variant="info" type="submit">
          Add comment
        </Button>
      </Form>
      <ul style={{ paddingTop: 20 }}>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogInfo
