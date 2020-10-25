const listHelper = require('../utils/list_helper')
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const emptyList = []

const listWithManyBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54456956956542',
    title: 'Blaa blaa',
    author: 'EBbaba',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d1018',
    title: 'Go Toththt',
    author: 'Esthtra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 25,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17b9',
    title: 'New blog',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test ('when list has only one blog equals the likes of that', () => {
    const result =  listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('empty list returns zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(45)
  })
})

describe('favorite blog', () => {
  test ('bigger list returns most liked blog', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual({
      title: 'Go Toththt',
      author: 'Esthtra',
      likes: 25,
    })
  })

  test('empty list returns info string', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toBe('array is empty')
  })

  test('list with one blog returns correspondingly', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })
})