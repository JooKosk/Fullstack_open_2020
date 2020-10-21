const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.likes = returnedObject.likes === null ? 0 : returnedObject.likes
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Blog', blogSchema)