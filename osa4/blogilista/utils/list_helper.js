const _ = require('lodash')
const array = require('lodash/array')

const dummy = (blogs) =>  {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 'array is empty'
  } else {
    const mostLikedBlog = blogs.reduce(function(prevBlog,curBlog) {
      return (prevBlog.likes > curBlog.likes) ? prevBlog : curBlog
    })
    return {
      title: mostLikedBlog.title,
      author: mostLikedBlog.author,
      likes: mostLikedBlog.likes
    }
  }}
/*
const mostBlogs = (blogs) => {

  return {
    mostBlogsCount
  }
}
*/
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}