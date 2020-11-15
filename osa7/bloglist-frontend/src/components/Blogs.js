import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = ({ blogs }) => {
  return (
    <div style={{ paddingTop: 20 }} className="blog">
      <Table striped bordered hover size="sm">
        <thead>
          <tr style={{ background: 'lightblue' }}>
            <th>Blog name</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`} key={blog.id}>
                  {blog.title}
                </Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

/*
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
*/

export default Blogs
