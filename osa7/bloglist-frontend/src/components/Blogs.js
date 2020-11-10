import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, user }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog user={user} key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
