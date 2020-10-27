import React from 'react'

const BlogForm = ({addBlog, handleChange, blogInfo}) => {
  return (
    <form onSubmit = {addBlog}>
    <div>
      title
      <input
      type="text"
      value={blogInfo.title}
      name="title"
      onChange={handleChange}
    />
    </div>
    <div>
      author
      <input
      type="text"
      value={blogInfo.author}
      name="author"
      onChange={handleChange}
    />
    </div>
    <div>
      url
      <input
      type="text"
      value={blogInfo.url}
      name="url"
      onChange={handleChange}
    />
    </div>
    <button type="submit">create</button>
  </form>
  )
}

export default BlogForm