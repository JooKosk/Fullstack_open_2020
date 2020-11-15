import React from 'react'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find((user) => user.id === id)
  if (!user) {
    return null
  }
  return (
    <div style={{ paddingTop: 20 }}>
      <h3>Blogs added by {user.name.split(' ')[0]}</h3>
      <ListGroup as="ul">
        {user.blogs.map((blog) => (
          <ListGroup.Item as="li" key={blog.id}>
            {blog.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
