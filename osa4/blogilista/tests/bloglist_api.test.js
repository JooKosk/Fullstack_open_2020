const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Blaa blaa',
    author: 'Sauli Niinistö',
    url: 'www.webbisivu.com',
    likes: 10,
  }
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test ('all blogs are returned', async() => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog id is defined', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0]).toBeDefined()
})

test ('http post adds valid blog', async () => {
  const newBlog = {
    title: 'I am a test blog',
    author: 'Makerman man',
    url: 'wwww.goooogol.com',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogContents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(blogContents).toContain('I am a test blog')
})

test('new blog likes are 0 if not defined', async () => {
  const newBlog = {
    title: 'I am a test blog 2',
    author: 'Makerman mans',
    url: 'wwww.goooogol.com',
    likes: '',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const addedBlog = response.body[response.body.length-1]

  console.log(addedBlog.likes)
  console.log(addedBlog)
  expect(addedBlog.likes).toBe(0)
})

test('blogs cant be added without url or title', async () => {
  const newBlog = {
    author: 'Makerman mans',
    likes: '',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})