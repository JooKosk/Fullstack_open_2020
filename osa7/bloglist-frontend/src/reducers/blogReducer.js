import blogService from '../services/blogs'

export const newBlog = (blog) => {
  return async dispatch => {
    const addedBlog = await blogService.create(blog)
    dispatch({
      type:'NEW_BLOG',
      data: addedBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const likeBlog = (blog) => {
  const likedBlog = {
    ...blog,
    likes: blog.likes + 1
  }
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG': {
    const id = action.data.id
    const blogToLike = state.find(b => b.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    return state.map(blog =>
      blog.id !== id ? blog:likedBlog
    )}
  case 'REMOVE_BLOG':
    return [...state.filter(blog => blog.id !== action.data.id)]
  default:
    return state
  }
}

export default blogReducer