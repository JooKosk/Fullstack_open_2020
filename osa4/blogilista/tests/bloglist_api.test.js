const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const test_helper = require('./test_helper')
const logger = require('../utils/logger')

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

test ('new blog is added only with valid token', async () => {
  const newBlog = {
    title: 'I am a test blog',
    author: 'Makerman man',
    url: 'wwww.goooogol.com',
    likes: 10,
  }

  const user = {
    username: 'testi',
    password: 'salasana'
  }

  const response = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${response.body.token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const returnedBlogs = await test_helper.blogsInDb()

  const blogContents = returnedBlogs.map(r => r.title)

  expect(returnedBlogs).toHaveLength(initialBlogs.length + 1)
  expect(blogContents).toContain('I am a test blog')
})

test('new blog likes are 0 if not defined', async () => {
  const newBlog = {
    title: 'I am a test blog 2',
    author: 'Makerman mans',
    url: 'wwww.goooogol.com',
    likes: '',
  }

  const user = {
    username: 'testi',
    password: 'salasana'
  }

  const response = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${response.body.token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const returnedBlogs = await test_helper.blogsInDb()

  const addedBlog = returnedBlogs[returnedBlogs.length-1]

  logger.info(addedBlog.likes)
  logger.info(addedBlog)
  expect(addedBlog.likes).toBe(0)
})

test('blogs cant be added without url or title', async () => {
  const newBlog = {
    author: 'Makerman mans',
    likes: '',
  }

  const user = {
    username: 'testi',
    password: 'salasana'
  }

  const response = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${response.body.token}`)
    .send(newBlog)
    .expect(400)

  const returnedBlogs = await test_helper.blogsInDb()
  expect(returnedBlogs).toHaveLength(initialBlogs.length)
})

test('blogs cant be added without a valid token', async () => {
  const newBlog = {
    title: 'I am a test blog',
    author: 'Makerman man',
    url: 'wwww.goooogol.com',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer af33451k4')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const returnedBlogs = await test_helper.blogsInDb()
  expect(returnedBlogs).toHaveLength(initialBlogs.length)
})

describe ('when initial db size is one user, user tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'testi', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await test_helper.usersInDb()

    const newUser = {
      username: 'sachaCohen',
      name: 'Sacha Baron Cohen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await test_helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await test_helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await test_helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe ('when adding new users',  () => {
  test('creation fails with too short password', async () => {
    const usersAtStart = await test_helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password length must be at least 3 characters')

    const usersAtEnd = await test_helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with too short username', async () => {
    const usersAtStart = await test_helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'saaab'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username`')

    const usersAtEnd = await test_helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})