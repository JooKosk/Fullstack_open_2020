import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('blog renders initially displaying title and author', () => {
  const blog = {
    title: 'The wonders of blogging',
    author: 'Wolter Miletyz',
    url: 'jabaduu.com/theWonders',
    likes: 0,
    user: {
      username: 'hessuhopo',
      name: 'Hessu Hopo'
    }
  }

  const user = { name : 'Hessu Hopo' }

  const component = render(
    <Blog blog = {blog} user = {user} />
  )

  const div = component.container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'The wonders of blogging'
  )

  expect(div).toHaveTextContent(
    'Wolter Miletyz'
  )
  expect(div).not.toHaveTextContent('jabaduu.com/theWonders')
  expect(div).not.toHaveTextContent('likes')
})

test('all blog info is rendered when view button has been pressed', async () => {
  const blog = {
    title: 'The wonders of blogging',
    author: 'Wolter Miletyz',
    url: 'jabaduu.com/theWonders',
    likes: 0,
    user: {
      username: 'hessuhopo',
      name: 'Hessu Hopo'
    }
  }

  const user = { name : 'Hessu Hopo' }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  component.debug()

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogAllInfo')
  expect(div).toHaveTextContent(
    'The wonders of blogging'
  )

  expect(div).toHaveTextContent(
    'Wolter Miletyz'
  )
  expect(div).toHaveTextContent('jabaduu.com/theWonders')
  expect(div).toHaveTextContent('likes')
})

test('if like button is pressed twice, event handler is called twice', async () => {
  const blog = {
    title: 'The wonders of blogging',
    author: 'Wolter Miletyz',
    url: 'jabaduu.com/theWonders',
    likes: 0,
    user: {
      username: 'hessuhopo',
      name: 'Hessu Hopo'
    }
  }

  const user = { name : 'Hessu Hopo' }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateLikes={mockHandler} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls.length).toBe(2)
})

test('BlogForm /> calls addBlog function with right contents', async () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog = {createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'It do be a blog' }
  })
  fireEvent.change(author, {
    target: { value: 'Gereon Rath' }
  })
  fireEvent.change(url, {
    target: { value: 'www.Realblog.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls[0][0].title).toBe( 'It do be a blog' )
  expect(createBlog.mock.calls[0][0].author).toBe( 'Gereon Rath' )
  expect(createBlog.mock.calls[0][0].url).toBe( 'www.Realblog.com' )
})