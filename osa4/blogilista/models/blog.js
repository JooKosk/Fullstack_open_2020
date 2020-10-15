const mongoose = require('mongoose')
const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  //const Blog = mongoose.model('Blog', blogSchema)

  module.exports = mongoose.model('Blog', blogSchema)
  
  
 
  